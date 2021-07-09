//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './DataAdminUsers.scss';
import axios from "axios";
import { connect } from 'react-redux';
import {useHistory} from "react-router";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";



const DataAdminUsers = (props) => {
    let history = useHistory();
    //hooks
    const [users, setUsers] = useState([]);  
    
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        allUsers();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });


    const allUsers = async () => {  
        
      let idUser = props.credentials.user.id;
      let token = props.credentials.token;
      let email = document.getElementById("searchByTitle").value;
      let dni = document.getElementById("searchByTitle").value;
      let body = {
        email : email,
        dni : dni
      }

    
      if (document.getElementById("opciones").value === "email") {

        try{ 


            var res = await axios.get(`https://movieapp-mlf.herokuapp.com/users/email/${email}`,{headers:{'authorization':'Bearer ' + email}});

            console.log(res.data)

            setUsers(res.data);


        }catch (err){     

        }
  
      }else if (document.getElementById("opciones").value === "dni") {

        try{ 
    
            var res = await axios.get(`https://movieapp-mlf.herokuapp.com/users/dni/${dni}`,{headers:{'authorization':'Bearer ' + dni}});

            console.log(res.data)

            setUsers(res.data);

      

        }catch (err){     

        }

  }
}
    

   if (users?.id != undefined) {
  
      return (
        <div>  
          <div className = "vistaLoginShearch">
            <div className = "loginCardSearch"> 
              <div className = "cardLogin">
                <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
              </div>
            <div className = "cardLoginSearch">
                <select id = "opciones" className="input">
                    <option value="email">Buscar usuario por email</option>
                    <option value="dni">Buscar usuario por dni</option>
                </select>
            </div>
            <div className = "sendButton" onClick={()=>allUsers(2)}>Buscar</div>
            </div>
          </div>  

          <div className="nombreDataRoomAdmin"> <div>Buscar por usuario</div>
          <div className="boxCardDataRoomAdmin">
                <div className="cardAdmin">  
                    <FontAwesomeIcon className="iconoDataAdminUser" icon={faUsers}/>              
                    <div className= "dataCard">
                        <p className="nombre"> Id: {users.id}</p>
                        <p className="nombre"> Nombre: {users.name}</p>
                        <p className="rentalDate">Apellido: {users.last_name1}</p>
                        <p className="returnDate">Segundo Apellido: {users.last_name2}</p>
                        <p className="orderId">Email: {users.email}</p>
                        <p className="idUser">Password: {users.password}</p>
                        <p className="idUser">Fecha Nacimiento: {moment(users.birthday).format('DD/MM/YYYY')}</p>
                        <p className="idUser">DNI: {users.dni}</p>
                        <p className="idUser"># tarjeta de crédito: {users.creditCardNumber}</p>
                        <p className="idUser">Nombre en la tarjeta: {users.creditCardName}</p>
                        <p className="idUser">Fecha expiracion tarjeta: {moment(users.creditCardExpDate).format('MM/YYYY')}</p>
                        <p className="idUser">Codigo Seguridad tarjeta: {users.creditCardSecureCodeNumber}</p>   
                    </div>
                </div>
          </div>
        </div>  
      </div>  
      );
   
            
    } else {

      return (
      
      <div>          

      <div className = "vistaLogin">
      <div className = "loginCardSearch"> 
              <div className = "cardLogin">
                <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
              </div>
            <div className = "cardLoginSearch">
                <select id = "opciones" className="input">
                    <option value="email">Buscar usuario por email</option>
                    <option value="dni">Buscar usuario por dni</option>
                </select>
            </div>
            <div className = "sendButton" onClick={()=>allUsers()}>Buscar</div>
      </div>
      </div>   
    </div>    
      )  
    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(DataAdminUsers);