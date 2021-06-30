
import React, {useState} from 'react';
/* import "./Register.css"; */
import axios from 'axios';
import {useHistory} from "react-router";
import moment from 'moment';
import {connect} from 'react-redux';
import {notification} from 'antd';

const Register = () => {
    let history = useHistory();

    //Hooks
    const [datosUser, setDatosUser] = useState(
        {
            name : '',
            last_name1: '',
            last_name2: '',
            email: '',
            password: '',
            birthday: '',
            dni: '',
            creditCardNumber: '',
            creditCardName: '',
            creditCardExpDate: '',
            creditCardSecureCodeNumber: '',
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

    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }


    //Comprobación de errores en los campos completados
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

                let today = moment(new Date()).format('DD/MM/YYYY');
                let someday = moment(datosUser.creditCardExpDate).format('DD/MM/YYYY')

                if (someday < today){
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

            case 'email':
                if(datosUser.email.length < 1){
                    setErrors({...errors, eEmail: 'El campo email no puede estar vacío.'});
                }else if (datosUser.email.length < 4){
                    setErrors({...errors, eEmail: 'El email debe de tener 4 caracteres'});
                }else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(datosUser.email) ) {
                    setErrors({...errors, eEmail: 'Introduce el formato de email valido ejemplo@ejemplo.com'});                    
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':
                if(datosUser.password.length < 1){
                    setErrors({...errors, ePassword: 'El campo password no puede estar vacío.'});
                }else if (datosUser.password.length < 6){
                    setErrors({...errors, ePassword: 'El password debe de tener al menos 6 caracteres'});
                }else if (!/^\+?[0-9]{6}/.test(datosUser.password) ) {
                    setErrors({...errors, ePassword: 'Introduce el password valido'}); 
                }else{
                    setErrors({...errors, ePassword: ''});
                }
                
            break;

            case 'dni':
                if(datosUser.dni.length < 1){
                    setErrors({...errors, eDni: 'El campo DNI no puede estar vacío.'});
                }else if  (! /^\d{8}[a-zA-Z]$/.test(datosUser.dni) ){
                    setErrors({...errors, eDni: 'Formato de DNI incorrecto.'});
                }else{
                    setErrors({...errors, eDni: ''});
                }
            

            break;
            
            case 'birthday':
                
                let years = moment().diff(moment(datosUser.birthday).format('MM/DD/YYYY'), 'years');
                
                if (years < 19 || years > 100){
                    setErrors({...errors, eBirthday: 'Debes tener al menos 18 años para registrarte.'});
                }else {
                    setErrors({...errors, eBirthday: ''});
                }
         
            break;


        }
    }

    const ejecutaRegistro = async () => {
        

        let  user = {

            name : datosUser.name,
            last_name1: datosUser.last_name1,
            last_name2: datosUser.last_name2,
            email: datosUser.email,
            password: datosUser.password,
            birthday: datosUser.birthday,
            dni: datosUser.dni,
            creditCardNumber: datosUser.creditCardNumber,
            creditCardName: datosUser.creditCardName,
            creditCardExpDate: datosUser.creditCardExpDate,
            creditCardSecureCodeNumber: datosUser.creditCardSecureCodeNumber,

        }

        var  array = Object.entries(user);
        var num = array.length;

        for (let x = 0; x < num; x++){
            if(array[x][1] === ''){
                let campoVacio = ("El campo " + array[x][0] + " no puede estar vacío.");
                return setNewMessage(campoVacio);
            }

        }


       
         axios.post(("http://localhost:3005/users"), user)        
        .then(res => {
            notification.success({message:'Usuario registrado.',description: "Te hemos enviado un email para activar la cuenta." });

            setTimeout(()=> {
                history.push('/login');
            }, 5000);     
        }).catch(err => {
           
            var errorText = err.response.data.message;
            if (errorText.includes("email")){
                setNewMessage(JSON.stringify("El email ya existe en la base de datos."));

            }else if (errorText.includes("dni")){
                setNewMessage(JSON.stringify("El dni ya existe en la base de datos."));

            }else if (errorText.includes("telephone")){
                setNewMessage(JSON.stringify("El teléfono ya existe en la base de datos."));
            }else{
                setNewMessage(JSON.stringify(err.response.data.message));            
            }
            
        });     
      
   
    }    

    return (
        <div className= "boxForm">
            <div className= "tituloFormRegistro"> Formulario de registro </div>
            <div className="formulario">
                <input className="inputBase" type="text" name="name" onChange={updateFormulario} onBlur={()=>checkError("name")} placeholder="Nombre" size="34" lenght='30'></input>
                <div>{errors.eName}</div>
                <input className="inputBase" type="text" name="last_name1" onChange={updateFormulario} onBlur={()=>checkError("last_name1")} placeholder="Primer apellido" size="34" lenght='30' ></input>
                <div>{errors.eName}</div>
                <input className="inputBase" type="text" name="last_name2" onChange={updateFormulario} onBlur={()=>checkError("last_name2")} placeholder="Segundo apellido" size="34" lenght='30'></input>
                <div>{errors.eName}</div>
                <input className="inputBase" type="text" name="dni" onChange={updateFormulario} onBlur={()=>checkError("dni")} placeholder="DNI" size="34" maxlenght='9' ></input>
                <div>{errors.eDni}</div>
                <input className="inputBase" type="text" name="email" onChange={updateFormulario} onBlur={()=>checkError("email")} placeholder="Email" size="34" lenght='30'></input>
                <div>{errors.eEmail}</div>
                <input className="inputBase" type="password" name="password" onChange={updateFormulario} onBlur={()=>checkError("password")} placeholder="Password" size="34" lenght='8'></input>
                <div>{errors.ePassword}</div>
                <input className="inputBase" type="date" name="birthday" onChange={updateFormulario} onBlur={()=>checkError("birthday")} placeholder="Fecha de nacimiento :" onchange="this.className=(this.value!=''?'has-value':'')"></input>
                <div>{errors.eBirthday}</div>
                <input className="inputBase" type="text" name="creditCardNumber" onChange={updateFormulario} onBlur={()=>checkError("creditCardNumber")} placeholder="Número de tarjeta de credito" size="34" lenght='30'></input>
                <div>{errors.eCreditCardNumber}</div>
                <input className="inputBase" type="text" name="creditCardName" onChange={updateFormulario} onBlur={()=>checkError("creditCardName")} placeholder="Nombre en la tarjeta de credito" size="34" lenght='30'></input>
                <div>{errors.eName}</div>
                <input className="inputBase" type="date" name="creditCardExpDate" onChange={updateFormulario} onBlur={()=>checkError("creditCardExpDate")} placeholder="Fecha de expiración" size="34" lenght='30'></input>
                <div>{errors.eCreditCardExpDate}</div>
                <input className="inputBase" type="password" name="creditCardSecureCodeNumber" onChange={updateFormulario} onBlur={()=>checkError("creditCardSecureCodeNumber")} placeholder="Código de seguridad" size="34" lenght='30'></input>
                <div>{errors.eCreditCardSecureCodeNumber}</div>


  
                                 
                <div id = "newText"></div>    
                <div id = "Botom"className="newUserBoton" onClick={()=>ejecutaRegistro()}>Enviar</div>    

                <div className="flashcard">
                    <div className="demo">{newMessage} </div>
   	            </div>    

             

            </div>



        </div>
    )
}

export default connect()(Register);