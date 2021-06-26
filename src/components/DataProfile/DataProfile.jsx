
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

                shipping_address: props.credentials.user.shipping_address,
                country: props.credentials.user.country,
                city: props.credentials.user.city,
                zipCode: props.credentials.user.zipCode,
                phone: props.credentials.user.phone
        });        


    const [errors, setErrors] = useState({
        eName : '',
        eLast_name1: '',
        eLast_name2: '',
        eCountry: '',
        eCity: '',
        eShipping_address: '',
        eZipCode: '',
        eEmail: '',
        ePassword: '',
        ePhone: '',
        eBirthday: '',
        eDni: '',
/*         eCreditCardNumber: '',
        eCreditCardName: '',
        eCreditCardExpDate: '',
        eCreditCardSecureCodeNumber: '', */
        
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


            case 'shipping_address':
                if(datosUser.shipping_address.length < 1){
                    setErrors({...errors, eShipping_address: 'El campo direccion no puede estar vacío.'});
                }else if  (! /^[a-z 1-9,.'-]+$/i.test(datosUser.shipping_address)){
                    setErrors({...errors, eShipping_address: 'La direccion debe ser alfanumerica'});
                }else{
                    setErrors({...errors, eShipping_address: ''});
                }                
            break;

            case 'billing_address':
                if(datosUser.billing_address.length < 1){
                    setErrors({...errors, eBilling_address: 'El campo direccion no puede estar vacío.'});
                }else if  (! /^[a-z 1-9,.'-]+$/i.test(datosUser.billing_address)){
                    setErrors({...errors, eBilling_address: 'La direccion debe ser alfanumerica'});
                }else{
                    setErrors({...errors, eBilling_address: ''});
                }                
            break;

            case 'city':
                if(datosUser.city.length < 1){
                    setErrors({...errors, eCity: 'El campo ciudad no puede estar vacío.'});
                }else if  (! /^[a-z ,.'-]+$/i.test(datosUser.city) ) {
                    setErrors({...errors, eCity: 'El campo ciudad solo puede contener letras'});
                }else{
                    setErrors({...errors, eCity: ''});
                }
                
            break;

            case 'country':
                if(datosUser.country.length < 1){
                    setErrors({...errors, eCountry: 'El campo país no puede estar vacío.'});
                }else if  (!/^(?=.{3,40}$)[a-zA-ZñÑ]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(datosUser.country) ) {
                    setErrors({...errors, eCountry: 'El campo pais solo puede contener letras.'});
                }else{
                    setErrors({...errors, eCountry: ''});
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
            case 'phone':
                if(datosUser.phone.length < 1){
                    setErrors({...errors, ePhone: 'El campo telefono no puede estar vacío.'});
                }else if (datosUser.phone.length < 9){
                    setErrors({...errors, ePhone: 'El campo telefono debe de tener 9 números'});
                }else if (! /[\d()+-]{9}/g.test(datosUser.phone)) {
                    setErrors({...errors, ePhone: 'Introduce el formato de teléfono valido 999999999'});                        
                }else{
                    setErrors({...errors, ePhone: ''});
                }
          

            break;

            case 'zipCode':
                if(datosUser.zipCode.length < 1){
                    setErrors({...errors, eZipCode: 'El campo telefono no puede estar vacío.'});
                }else if (datosUser.zipCode.length < 5){
                    setErrors({...errors, eZipCode: 'El campo telefono debe de tener 5 números'});
                }else if (! /[\d()+-]{5}/g.test(datosUser.zipCode)) {
                    setErrors({...errors, eZipCode: 'Introduce el formato de codigo postal valido 99999'});                        
                }else{
                    setErrors({...errors, eZipCode: ''});
                }
          

            break;

            
            case 'birthday':
                
                let years = moment().diff(moment(datosUser.birthday).format('MM/DD/YYYY'), 'years');
                
                if (years < 12 || years > 100){
                    setErrors({...errors, eBirthday: 'Debes tener al menos 12 años para registrarte.'});
                }else {
                    setErrors({...errors, eBirthday: ''});
                }
         
            break;

        }
    }


    const saveData = async (info) => {   
        try { 
      
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;
        let shipping_address = datosUser.shipping_address;
        let city = datosUser.city;
        let zipCode = datosUser.zipCode;
        let country = datosUser.country;
        let phone = datosUser.phone;
        console.log(idUser, "estoy en saveData")

        var body = {
            id: idUser,
            idUser : idUser,
            shipping_address: shipping_address,
            phone: phone,
            city: city,
            country: country,
            zipCode: zipCode
            
        }

        let res = await axios.post('http://localhost:3005/users/update',body,{headers:{'authorization':'Bearer ' + token}});
        console.log(res.data)    



            let data = {
                token: token,
                user : res.data,
                idUser: idUser,
            }
                console.log("Datos qeu devuelve axios : ", data);

                props.dispatch({type:UPDATE,payload:data});
   
       /*          notification.success({message:'Atencion.',description: "Datos actualizados correctamente."}); */

                setProfile(info);
            
            } catch (error) {

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
                    <p>Dirección: <input className="inputBaseUser"  readonly="readonly" type="text" name="shipping_address" value={user.shipping_address} size="34" lenght='30'></input></p>
                    <p>Ciudad: <input className="inputBaseUser"  readonly="readonly" type="text" name="city"  value={user.city} size="34" lenght='30'></input></p>
                    <p>Codigo postal: <input className="inputBaseUser"  readonly="readonly" type="text" name="zipCode"  value={user.zipCode} size="34" lenght='30'></input></p>
                    <p>País: <input className="inputBaseUser"  readonly="readonly" type="text" name="country"  value={user.country} size="34" lenght='30'></input></p>
                    <p>DNI: <input className="inputBaseUser"  readonly="readonly" type="text" name="dni"  value={user.dni} size="34" maxlenght='9' ></input></p>
                    <p>Teléfono: <input className="inputBaseUser"  readonly="readonly" type="text" name="phone"  value={user.phone} size="34" lenght='9'></input></p>
                    

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
                        <p>Dirección: <input className="inputBaseUser"  type="text" name="shipping_address" onChange={updateFormulario} onBlur={()=>checkError("shipping_address")} placeholder={props.credentials.user.shipping_address} size="34" lenght='30'></input></p>
                        <div>{errors.eShipping_address}</div>
                        <p>Ciudad:: <input className="inputBaseUser"  readonly="readonly" type="text" name="city" onChange={updateFormulario} onBlur={()=>checkError("city")} placeholder={props.credentials.user.city} size="34" lenght='30'></input></p>
                        <div>{errors.eCity}</div>
                        <p>Codigo Postal: <input className="inputBaseUser" readonly="readonly" type="text" name="zipCode" onChange={updateFormulario} onBlur={()=>checkError("zipCode")} placeholder={props.credentials.user.zipCode} size="34" lenght='30'></input></p>
                        <div>{errors.eZipCode}</div>
                        <p>País: <input className="inputBaseUser" readonly="readonly" type="text" name="country" onChange={updateFormulario} onBlur={()=>checkError("country")} placeholder={props.credentials.user.country} size="34" lenght='30'></input></p>
                        <div>{errors.eCountry}</div>
                        <p>DNI: <input className="inputBaseUser" readonly="readonly" type="text" name="dni"  placeholder={props.credentials.user.dni} size="34" maxlenght='9' ></input></p>
                        <p>Teléfono: <input className="inputBaseUser"  type="text" name="phone" onChange={updateFormulario} onBlur={()=>checkError("phone")}   placeholder={props.credentials.user.phone}size="34" lenght='9'></input></p>
                        <div>{errors.ePhone}</div>

                    </div>


                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);