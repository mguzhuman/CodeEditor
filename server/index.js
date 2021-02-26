const SHA256 = require('crypto-js/sha256')
const bodyParser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser');
const express = require('express')
const app = express();
const mongoose = require("mongoose");
const request = require('request')

const fs = require('fs');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/codetalk.pro/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/codetalk.pro/cert.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};


const http = express();
http.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})
http.listen(8080);


const https = require('https').createServer(credentials,app);
const io = require('socket.io')(https);
const Language = require('./schemas/Language')
const Room = require('./schemas/Room')
const INITIALDATABASE = require('./initialData')
const cron = require('node-cron');
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(busboyBodyParser())
app.use(express.static('../client/build'));
app.use('/room/:id', express.static('../client/build'))
app.use('*', express.static('../client/public/404.html'))


io.on('connection', async (socket) => {
    socket.on('connect', async () => {
        const roomsDb = await Room.find()
        socket.emit('listRooms', roomsDb);
    });
    const roomsDb = await Room.find()
    socket.emit('listRooms', roomsDb);

    socket.on('create', async (room) => {
        socket.leave(socket.room);
        const roomId = SHA256('room' + room.date).toString();
        await createRoom(roomId, room.date, room.name, room.language);
        socket.join(roomId);
        const roomsDb = await Room.find()
        io.emit('listRooms', roomsDb);
        socket.emit('createSuccess', roomId)
    });

    socket.on('joinRoom', async (roomId) => {
        socket.join(roomId);
        const room = await Room.findOne({id: roomId})
        socket.emit('joinRoomAccept', room);
    });

    socket.on('sendToRunCode', async (data) => {
        socket.to(data.id).emit('disabledRunBtn', '')
        const language = await Language.findOne({label: data.language})
        const headerOpt = {
            'X-Access-Token': 'token',
            'Content-type': 'application/json'
        }
        let lang;
        switch (data.language) {
            case 'c':
            case 'cpp':
                lang = 'clang';
                break;
            case 'd':
                lang = 'dlang';
                break;
            case 'go':
                lang = 'golang';
                break;
            default:
                lang = data.language;
                break;
        }
        const options = {
            method: 'POST',
            headers: headerOpt,
            json: {
                "image": `glot/${lang}:latest`,
                "payload": {
                    "language": data.language,
                    "files": [{
                        "name": `main.${language.filenameExtensions}`,
                        "content": data.value
                    }]
                }
            }
        }

        request('http://localhost:8088/run', options, async (err, response, body) => {
            let responseValue;
            if (!err) {
                responseValue = body.stderr ? body.stderr : body.error ? body.message : body.stdout
            } else {
                responseValue = err.err;
            }
            await Room.findOneAndUpdate({id: data.id}, {response: responseValue});
            io.in(data.id).emit("returnResponseRunCode", responseValue);
        })
    })

    socket.on('clearResponse', async (id) => {
        await Room.findOneAndUpdate({id}, {response: ""})
        io.in(id).emit("returnResponseRunCode", "");
    })

    socket.on('changeLanguage', async (data) => {
        const language = await Language.findOne({label: data.language});

        await Room.findOneAndUpdate({id: data.roomId}, {
            language: data.language,
            value: language.value,
            response: ""
        })

        io.in(data.roomId).emit("returnChangeLanguage", {
            language: data.language,
            value: language.value,
            response: ""
        });
    })

    socket.on('changeCodeValue', async (data) => {
        await Room.findOneAndUpdate({id: data.roomId}, {value: data.value})
        socket.to(data.roomId).emit("changeCodeClientValue", data.value);
    })

    socket.on('removeRoom', async (id) => {
        await Room.findByIdAndDelete({id});
        const rooms = await Room.find();
        io.emit('listRooms', rooms);
    });
});

mongoose.connect(`mongodb://mongobase:27017/codeeditor`, {
    auth: {
        authSource: "admin"
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 20000,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD
}, function (err) {
    if (err) return console.log(err);
    https.listen(443, () => {
        console.log("Server start")
    });
});

let conn = mongoose.connection;

cron.schedule('0 5 * * *', () => {
    mongoose.connection.db.dropCollection('rooms', (err, results) => {
        console.log('Clear DB: ', results)
    })
}, {})

conn.on('open', () => {
    conn.db.listCollections({name: 'languages'})
        .next(function (err, collinfo) {
            if (!collinfo) {
                INITIALDATABASE.forEach(async (item) => {
                    await Language.create({
                        label: item.label,
                        value: item.value,
                        filenameExtensions: item.filenameExtensions
                    }, (err, doc) => {
                        if (err) return console.log(err);
                    });
                })
            }
        });
});

async function createRoom(id, date, name, languageName) {
    const language = await Language.findOne({label: languageName})
    if (id && date && language) {
        await Room.create({
            id, date, name: name ? name : "", language: language.label, value: language.value, response: ''
        })
    }
}
