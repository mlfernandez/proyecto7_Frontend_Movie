import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import Video from "../../components/VideoTrailer/VideoTrailer";
import './IntroTrailer.scss';



const IntroTrailer = () => {

    let history = useHistory();


    return (
        <div className="HomeDiv">

            <div>
                
                <Video/>
                
            </div>


        </div>
    );
}
export default IntroTrailer;