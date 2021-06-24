import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';


/* import CarouselSlider from '../../components/Carousel/Carousel'; */

/* import  Footer  from '../../components/Footer/Footer'; */


const Home = () => {

    let history = useHistory();


    return (
        <div className="HomeDiv">

            <div>SPINNER SMILE</div>

        setTimeout(() => {
            history.push("/datacontainer")
        }, 5000)




        </div>
    );
}
export default Home;