const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
db.auth(MONGO_USERNAME, MONGO_PASSWORD)

db = db.getSiblingDB('codeeditor')
db.createUser(
    {
        user: "test-user",
        pwd: MONGO_PASSWORD,
        roles:[
            {
                role: "root",
                db:   "codeeditor"
            }
        ]
    }
);
