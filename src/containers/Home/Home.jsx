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
                <Video/>

                {        setTimeout(() => {
            history.push("/datacontainer")
        }, 0)}
         
                </div>

        </div>
    );
}
export default Home;