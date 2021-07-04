import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import Faq from "../../components/Faq/Faq";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import './About.scss';

// traer el video trailer Todo Moriran al home

const About = () => {

    let history = useHistory();

    
    return (
        <div className="AboutDiv">

            <div className ="AboutBox">        

<Faq/>
         
            </div>

        </div>
    );
}
export default About;