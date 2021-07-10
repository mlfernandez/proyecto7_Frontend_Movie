import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import Video from "../../components/HomeVideo/HomeVideo";
import './Home.scss';

// traer el video trailer Todo Moriran al home

const Home = () => {

    let history = useHistory();

    
    return (
        <div className="HomeDiv">

            <div>     
            <iframe src="https://player.vimeo.com/video/569479357?autoplay=1" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    
        
            
               {/*  <Video/> */}

            { setTimeout(() => {
                history.push("/datacontainer")
                }, 30000)}
         
                </div>

        </div>
    );
}
export default Home;