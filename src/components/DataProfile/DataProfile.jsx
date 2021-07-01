
import './DataProfile.scss';
import PhotoProfile from '../../images/profilelogo.png'
import moment from 'moment';
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {LOGIN, UPDATE} from '../../redux/types'
import {Input, notification} from 'antd';



const DataProfile = (props) => {
       
        //Hooks
        const [profile, setProfile] = useState([]); 
        const [datosUser, setDatosUser] = useState(
            {

                creditCardNumber: props.credentials.user.creditCardNumber,
                creditCardName: props.credentials.user.creditCardName,
                creditCardExpDate: props.credentials.user.creditCardExpDate,
                creditCardSecureCodeNumber: props.credentials.user.creditCardSecureCodeNumber,

        });        


    const [errors, setErrors] = useState({
        eName : '',
        eLast_name1: '',
        eLast_name2: '',
        eEmail: '',
        ePassword: '',
        eBirthday: '',
        eDni: '',
        eCreditCardNumber: '',
        eCreditCardName: '',
        eCreditCardExpDate: '',
        eCreditCardSecureCodeNumber: '',
        
    });


    useEffect(() => {
        setProfile(1);
       
      }, []);

    let user = props.credentials.user;   

    const changeState = (info) => {        
        setProfile(info);
    }



    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }


    const checkError = (arg) => {
        switch (arg){
            case 'name':

                
                if(datosUser.name.length < 1){
                    setErrors({...errors, eName: 'El campo nombre no puede estar vacío.'});
                }else if(datosUser.name.length < 2){
                    setErrors({...errors, eName: 'El nombre debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.name) ) {
                    setErrors({...errors, eName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'last_name1':   
                if(datosUser.last_name1.length < 1){
                    setErrors({...errors, eLast_name1: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.last_name1.length < 2){
                    setErrors({...errors, eLast_name1: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.last_name1) ) {
                    setErrors({...errors, eLast_name1: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLast_name1: ''});
                }  
            break;

            case 'last_name2':    
                if(datosUser.last_name2.length < 1){
                    setErrors({...errors, eLast_name2: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.last_name2.length < 2){
                    setErrors({...errors, eLast_name2: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.last_name2) ) {
                    setErrors({...errors, eLast_name2: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLast_name2: ''});
                }   
        break;

            case 'creditCardName':
                
                if(datosUser.creditCardName.length < 1){
                    setErrors({...errors, eCreditCardName: 'El campo nombre no puede estar vacío.'});
                }else if(datosUser.creditCardName.length < 2){
                    setErrors({...errors, eCreditCardName: 'El nombre debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.name) ) {
                    setErrors({...errors, eCreditCardName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eCreditCardName: ''});
                }
            break;

            case 'creditCardNumber':
                
                if(datosUser.creditCardNumber.length < 13){
                    setErrors({...errors, eCreditCardNumber: 'No es correcto.'});
                }else if(datosUser.creditCardNumber.length > 17 ){
                    setErrors({...errors, eCreditCardNumber: 'No es un numero de tarjeta valido'});
                }else if (! /^[0-9]+$/i.test(datosUser.creditCardNumber) ) {
                    setErrors({...errors, eCreditCardNumber: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eCreditCardNumber: ''});
                }
            break;

            case 'creditCardExpDate':

                let cce = moment(datosUser.creditCardExpDate).format('MM/YYYY')
                
                if (cce < Date.now()){
                    setErrors({...errors, eCreditCardExpDate: 'La tarjeta esta vencida'});
                }else {
                    setErrors({...errors, eCreditCardExpDate: ''});
                }

            break;

            case 'creditCardSecureCodeNumber':
                
                if(datosUser.creditCardSecureCodeNumber.length < 1){
                    setErrors({...errors, eCreditCardSecureCodeNumber: 'No es correcto.'});
                }else if(datosUser.creditCardSecureCodeNumber.length > 5){
                    setErrors({...errors, eCreditCardSecureCodeNumber: 'No es correcto'});
                }else if (! /^[0-9]+$/i.test(datosUser.creditCardSecureCodeNumber) ) {
                    setErrors({...errors, eCreditCardSecureCodeNumber: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eCreditCardSecureCodeNumber: ''});
                }
            break;

        }
    }


    const saveData = async (info) => {   
        try { 
      
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;
        let creditCardNumber = datosUser.creditCardNumber;
        let creditCardName = datosUser.creditCardName;
        let creditCardExpDate = datosUser.creditCardExpDate;
        let creditCardSecureCodeNumber = datosUser.creditCardSecureCodeNumber;


        console.log(idUser, "estoy en saveData")

        var body = {
            id: idUser,
            idUser : idUser,
            creditCardNumber: creditCardNumber,
            creditCardName: creditCardName,
            creditCardExpDate: creditCardExpDate,
            creditCardSecureCodeNumber: creditCardSecureCodeNumber,
            
        }

        let res = await axios.post('http://localhost:3005/users/update',body,{headers:{'authorization':'Bearer ' + token}});
        console.log(res.data)    



            let data = {
                token: token,
                user : res.data,
                idUser: idUser,
            }

                props.dispatch({type:UPDATE,payload:data});
   
           

                setProfile(info);

                notification.success({message:'Atencion.',description: "Datos actualizados correctamente."}); 
            
            } catch (err) {
  
            
            }
    }

    if (profile === 1) {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Perfil del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUserProfile"><img className="img" src={PhotoProfile} alt="Profile photo" /></div>
                        <p>Nombre: <input className="inputBaseUser"  readonly="readonly" type="text" name="name" value={user.name} size="34" lenght='30'></input></p>
                        <p>Primer apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName1"  value={user.last_name1} size="34" lenght='30' ></input></p>
                        <p>Segundo apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName2"  value={user.last_name2} size="34" lenght='30'></input></p>
                        <p>Email: <input className="inputBaseUser"  readonly="readonly" type="text" name="email"  value={user.email} size="34" lenght='30'></input></p>
                        <p>Password: <input className="inputBaseUser"  readonly="readonly" type="password" name="password"  value="************" size="34" lenght='8'></input></p>
                        <p>Fecha de nacimiento: <input className="inputBaseUser"  readonly="readonly" type="text" name="birthday" value={moment(user.birthday).format('L')} ></input></p>   
                    </div>


                    <div className="infoUser2">
                    
                        <div className="botonEdit"><div className="sendButtonEdit" onClick={(()=>changeState(2))}>Editar</div></div>
                        <p>Número de tarjeta: <input className="inputBaseUser"  readonly="readonly" type="text" name="creditCardNumber"  value={user.creditCardNumber} size="34" lenght='30'></input></p>
                        <p>Nombre del titular: <input className="inputBaseUser"  readonly="readonly" type="text" name="creditCardName"  value={user.creditCardName} size="34" lenght='30'></input></p>
                        <p>Fecha de expiración: <input className="inputBaseUser"  readonly="readonly" type="text" name="creditCardExpDate"  value={moment(user.creditCardExpDate).format('L')} size="34" lenght='30'></input></p>
                        <p>Código de seguridad: <input className="inputBaseUser"  readonly="readonly" type="password" name="creditCardSecureCodeNumber" value="************" size="34" lenght='30'></input></p>
                        <p>DNI: <input className="inputBaseUser"  readonly="readonly" type="text" name="dni"  value={user.dni} size="34" maxlenght='9' ></input></p>

                    </div>

                </div>

            </div>
        )
    }else {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Editar datos del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUserProfile"><img className="img" src={PhotoProfile} alt="Profile photo" /></div>
                        <p>Nombre: <input className="inputBaseUser"  readonly="readonly" type="text" name="name" value={user.name} size="34" lenght='30'></input></p>
                        <p>Primer apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName1"  value={user.last_name1} size="34" lenght='30' ></input></p>
                        <p>Segundo apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName2"  value={user.last_name2} size="34" lenght='30'></input></p>
                        <p>Email: <input className="inputBaseUser"  readonly="readonly" type="text" name="email"  value={user.email} size="34" lenght='30'></input></p>
                        <p>Password: <input className="inputBaseUser"  readonly="readonly" type="password" name="password"  value="************" size="34" lenght='8'></input></p>
                        <p>Fecha de nacimiento: <input className="inputBaseUser"  readonly="readonly" type="text" name="birthday" value={moment(user.birthday).format('L')} ></input></p>   
                    </div>
    

                    <div className="infoUser2">
                        <div className="botonEdit"><div className="sendButtonEdit"  onClick={(()=>saveData(1))}>Guardar</div></div>
                        <p>Número de tarjeta:  </p>
                        <input className="inputBaseUser"   type="text" name="creditCardNumber" onChange={updateFormulario} onBlur={()=>checkError("creditCardNumber")} placeholder={user.creditCardNumber} size="34" lenght='30'></input>
                        <div>{errors.eCreditCardNumber}</div>
                        <p>Nombre del titular: </p>
                        <input className="inputBaseUser"   type="text" name="creditCardName"  onChange={updateFormulario} onBlur={()=>checkError("creditCardName")} placeholder={user.creditCardName} size="34" lenght='30'></input>
                        <div>{errors.eCreditCardName}</div>
                        <p>Fecha de expiración: </p>
                        <input className="inputBaseUser"  type="text" name="creditCardExpDate" onChange={updateFormulario} onBlur={()=>checkError("creditCardExpDate")} placeholder={moment(user.creditCardExpDate).format('L')} size="34" lenght='30'></input>
                        <div>{errors.eCreditCardExpDate}</div>
                        <p>Código de seguridad: </p>
                        <input className="inputBaseUser"   type="password" name="creditCardSecureCodeNumber" onChange={updateFormulario} onBlur={()=>checkError("creditCardSecureCodeNumber")}  placeholder="************" size="34" lenght='30'></input>
                        <div>{errors.eCreditCardSecureCodeNumber}</div>
                        <p>DNI: </p>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="dni"  placeholder={props.credentials.user.dni} size="34" maxlenght='9' ></input>
        

                    </div>

                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);