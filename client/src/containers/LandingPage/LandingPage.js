import React, {Fragment, useState} from 'react';
import axios from 'axios';
import './home.css'
import {LANGUAGE_ARRAY} from "../../constant";
import banner from './banner/hero-banner.webp'

export default ({}) => {
    const [btnDisabled, setBtnDisabled] = useState(false)

    const handleGetStarted = async () => {
        gtag('event', 'Get Started');
        const response = await axios.post('/createRoom')
        console.log(response)
        window.location.href=`/room/${response.data.roomId}`
        setBtnDisabled(true)
    }


    return (
        <Fragment>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                  crossOrigin="anonymous"/>
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container box_1620">
                            <a className="navbar-brand logo_h" href="https://codetalk.pro">CodeTalk</a>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="side-main">

                <section className="hero-banner mb-30px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="hero-banner__img">
                                    <img className="img-fluid" src={banner} alt=""/>
                                </div>
                            </div>
                            <div className="col-lg-5 pt-5">
                                <div className="hero-banner__content">
                                    <h1>Advanced code editor</h1>
                                    <p>We have <b>35</b> programming languages.
                                        They are compiling/interpreting <b>live</b>.
                                        Also you have an ability to cooperate with other people in one room.
                                        Use <b>voice, video or chat</b> to discuss in room.</p>
                                    <button className="button bg" disabled={btnDisabled} onClick={handleGetStarted}>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}
