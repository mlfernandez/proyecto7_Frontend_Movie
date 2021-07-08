import "./Payment.scss";
import axios from 'axios';
import {useHistory} from "react-router";
import moment from 'moment';
import {connect} from 'react-redux';
import {notification} from 'antd';
import React, { useEffect, useState, getState } from "react";
import {LOGIN, UPDATE} from '../../redux/types'




const Payment = (props) => {
    let history = useHistory();

    //Hooks
    const [profile, setProfile] = useState([]); 
    const [datosUser, setDatosUser] = useState(
        {
            lastSuscriptionBegin: props.credentials.user.lastSuscriptionBegin,
            lastSuscriptionEnd: props.credentials.user.lastSuscriptionEnd,

    });      

    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
     useEffect(() => {
       setProfile("vistaNoPay");
      }, []); 
    
      const Update = async (tipoVista) => {
    
        try {

            let token = props.credentials.token;
            let idUser = props.credentials.user.id;
            let lastSuscriptionBegin = moment(Date.now()).format('DD/MM/YYYY');
            let lastSuscriptionEnd = moment(lastSuscriptionBegin).add(1, 'year').format('DD/MM/YYYY');

            console.log(idUser, "estoy en Pay")

            var body = {
                idUser : idUser,
                lastSuscriptionBegin :lastSuscriptionBegin,
                lastSuscriptionEnd :lastSuscriptionEnd
            }

            let res = await axios.post('http://localhost:3005/users/suscription',body,{headers:{'authorization':'Bearer ' + token}});

            let data = {
                token: token,
                user : res.data,
                idUser: idUser,
            }

       
             props.dispatch({type:UPDATE,payload:data});
            


             
     
          setProfile(tipoVista); 
    

            notification.success({message:'Atencion.',description: "Confirma el pago."}); 

            


        } catch (err) {
            notification.warning({message:'Atencion.',description: "Contacte con soporte."}); 
        }
   
    }   

    const Pay = async (tipoVista) => {
    
        try {

            let token = props.credentials.token;
            let idUser = props.credentials.user.id;
            let lastSuscriptionBegin = moment(Date.now()).format('DD/MM/YYYY');
            let lastSuscriptionEnd = moment(lastSuscriptionBegin).add(1, 'year').format('DD/MM/YYYY');

            console.log(idUser, "estoy en Pay")

            var body = {
                idUser : idUser,
                lastSuscriptionBegin :lastSuscriptionBegin,
                lastSuscriptionEnd :lastSuscriptionEnd
            }

            let res = await axios.post('http://localhost:3005/users/suscription',body,{headers:{'authorization':'Bearer ' + token}});

            let data = {
                token: token,
                user : res.data,
                idUser: idUser,
            }

       
             props.dispatch({type:UPDATE,payload:data});
            
             
     
          setProfile(tipoVista); 
     
            notification.success({message:'Atencion.',description: "Pago confirmado, gracias por seguir disfrutando con nosotros."}); 

            setTimeout(() => {
                history.push('/datacontainer');
              }, 1500)
             



        } catch (err) {
            notification.warning({message:'Atencion.',description: "Tuvimos problemas con el pago, contacte con soporte."}); 
        }
   
    }    

    if (profile === "vistaNoPay") {
    return (
        <div className= "boxForm">
            <div className= "boxFormPayment"> Confirmar la suscripción </div>
            
            <div id = "Botom"className="newUserBoton" onClick={()=>Update("vistaConfirm")}>Click aqui para renovar la suscripción</div>


        </div>
    )
} else {
    return (
        <div className= "boxForm">
            <div className= "boxFormPayment"> Pasarela de pago </div>
            

            <div id = "Botom"className="newUserBoton" onClick={()=>Pay()}>Confirmar Pago</div>


        </div>
    )
    }


}

export default connect((state) => ({
    credentials: state.credentials,

  }))(Payment);