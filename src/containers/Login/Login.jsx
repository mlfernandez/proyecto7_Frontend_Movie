
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {LOGIN, LOGOUT} from '../../redux/types'
import {notification} from 'antd';
import { NavLink } from 'react-router-dom';


const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [msgError, setMensajeError] = useState('');
    
    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                logueame();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    },[credentials]);

    const logueame = async () => {

        //Primero, testeamos los datos
            
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
             setMensajeError('Introduce el formato de email valido ejemplo@ejemplo.com');
             return;
        }

        //Luego, generamos el body de datos
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        
        //Axios      
        try {var res = await axios.post('https://movieapp-mlf.herokuapp.com/login', body);
           
        console.log(res.data.user)
               
                let data = {
                    token : res.data.token,
                    user : res.data.user,
                    idUser: res.data.user.id,
                    
                }

                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                               
                //Mensaje de bienvenida
                let description = ("Bienvenido " + res.data.user.name + " " + res.data.user.last_name1 + ".");
                
    
                notification.success({message:'Login correcto.',description: description});
                
                //Redireccion           
                history.push("/profile");

            } catch (err) {
                   if (err.response.data.message.includes("La cuenta no está activa")) {   
                    notification.warning({message:'Atencion!', description: "La cuenta no está activa. Por favor, revisa tu correo electrónico y activa tu cuenta."});
                    } else { 
                    console.log("usuario no encontrado")
                    notification.warning({message:'Atencion.',description: "Usuario o password incorrecto."});              
                    }
            
                
                }
                    
}

    return (

        <div>          

            <div className = "vistaLogin">
        
                <div className = "loginCard"> 
                <div className="titleLogin">Accede a tu cuenta</div>
                    <div className = "cardLogin">
                        <input className="input" type="email" name="email" placeholder="email" onChange={updateCredentials} size="40" lenght='30'></input>
                    </div>
                    <div className = "cardLogin">
                        <input className="input" type="password" name="password" placeholder="password" onChange={updateCredentials} size="40" lenght='30'></input>
                        
                    </div>
                    
                    <div className = "sendButton" onClick={()=>logueame()}>Login</div>
                    <div>{msgError}</div>
                    <div className="titleLoginBottom">¿Aun no tienes cuenta?</div>
                    <NavLink style={{ color: '#F02D3A', textDecoration: 'inherit' }} to="/register">¡Registrate aqui!.</NavLink>
                </div>
        
            </div>   
      
        </div>
    )
}

export default connect()(Login);