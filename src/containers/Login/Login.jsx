import React , {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Input, notification} from 'antd';
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types'
/* import  Footer  from '../../components/Footer/Footer'; */


const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [msgError, setMensajeError] = useState('');
    
    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    const logeame = async () => {

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
        try {var res = await axios.post('http://localhost:3005/login', body);
                
               
                let data = {
                    token : res.data.token,
                    user : res.data.user,
                    idUser: res.data.user._id,
                    
                }

                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                               
                //Mensaje de bienvenida
                let description = ("Bienvenido " + res.data.user.name + " " + res.data.user.lastName1 + ".");
                notification.success({message:'Login correcto.',description: description});
                
                //Redireccion           
                history.push("/profile");

            } catch (err) {
                    console.log("usuario no encontrado")
                    notification.warning({message:'Atencion.',description: "Usuario o password incorrecto."});              
                
            
    }
}

    return (

        <div>          

            <div className = "vistaLogin">
        
                <div className = "loginCard"> 
                    <div className = "cardLogin">
                        <input className="input" type="email" name="email" placeholder="email" onChange={updateCredentials} size="40" lenght='30'></input>
                    </div>
                    <div className = "cardLogin">
                        <input className="input" type="password" name="password" placeholder="password" onChange={updateCredentials} size="40" lenght='30'></input>
                        
                    </div>
                    
                    <div className = "sendButton" onClick={()=>logeame()}>Login</div>
                    <div>{msgError}</div>
                </div>
        
            </div>   
           {/*  <Footer/>  */}    
        </div>
    )
}

export default connect()(Login);