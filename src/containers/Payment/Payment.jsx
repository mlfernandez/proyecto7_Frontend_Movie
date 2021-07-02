import "./Payment.scss";
import axios from 'axios';
import {useHistory} from "react-router";
import moment from 'moment';
import {connect} from 'react-redux';
import {notification} from 'antd';
import React, { useEffect, useState } from "react";



const Payment = (props) => {
    let history = useHistory();

    //Hooks
    const [datosUser, setDatosUser] = useState(
        {

            lastSuscriptionBegin: props.credentials.user.lastSuscriptionBegin,
            lastSuscriptionEnd: props.credentials.user.lastSuscriptionEnd,


    });      

    

    const Pay = async (info) => {
    
        try {

            let token = props.credentials.token;
            let idUser = props.credentials.user.id;
            let lastSuscriptionBegin = moment(Date.now()).format('DD/MM/YYYY');
            let lastSuscriptionEnd = moment(lastSuscriptionBegin).add(1, 'year').format('DD/MM/YYYY');

            console.log(idUser, "estoy en Pay")

            let body = {
                idUser : idUser,
                lastSuscriptionBegin :lastSuscriptionBegin,
                lastSuscriptionEnd :lastSuscriptionEnd
            }

            let res = await axios.post('http://localhost:3005/users/suscription',body,{headers:{'authorization':'Bearer ' + token}});
            console.log(res.data)

            notification.success({message:'Atencion.',description: "Pago confirmado, gracias por seguir soriendo con nosotros."}); 

            setTimeout(() => {
                history.push('/datacontainer');
              }, 1500)
             


        } catch {
            notification.warning({message:'Atencion.',description: "Tuvimos problemas con el pago, contacte con soporte."}); 
        }
   
    }    

    return (
        <div className= "boxForm">
            <div className= "boxFormPayment"> Pasarela de pago </div>
            
            <div id = "Botom"className="newUserBoton" onClick={()=>Pay()}>Confirmar suscripcion</div>


        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials,
  }))(Payment);