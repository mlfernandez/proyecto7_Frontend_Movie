import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import './Home.scss';

// traer el video trailer Todo Moriran al home

const Home = () => {

    let history = useHistory();

    
    return (
        <div className="HomeDiv">

            <div>     
    
            <iframe src="https://player.vimeo.com/video/569479357?autoplay=1&amp;badge=0&amp;player_id=0&amp;app_id=58479" width="854" height="480" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Todos moriran trailer"></iframe>
            
            { setTimeout(() => {
                history.push("/datacontainer")
                }, 35000)}
         
                </div>

        </div>
    );
}
export default Home;