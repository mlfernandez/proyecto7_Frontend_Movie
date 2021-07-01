//Nos muestra las clases activas a las que está apuntado el usuario.
import React, { useEffect, useState } from "react";
import './Shopping.scss';
import axios from "axios";
import { connect } from 'react-redux';
import {notification} from 'antd';
import {useHistory} from "react-router";
import { MOVIE } from '../../redux/types';


const Shopping = (props) => {
    let history = useHistory();
    //hooks
    const [orders, setOrders] = useState([]);  
    const [msgError, setMensajeError] = useState('');
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
      userOrder();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  

    const reproducir = async (movieId) => {
      try {
          
        history.push('\introtrailer')
       
      } catch (error) {
   
      }


    }



    const userOrder = async () => {  
    try{      
      let idUser = props.credentials.user.id;
      let token = props.credentials.token;

    
      let body = {
        idUser: idUser        
      }

      let res = await axios.post('http://localhost:3005/orders/userid',body,{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data, "que es esto")



      setOrders(res.data);

      

    }catch (err){     


    }
  
    }
    
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

   if (orders[0]?.id) {
      return (
        <div className="nombreDataRoom"> <h1>MIS PELICULAS</h1>

            <div className="boxCardDataRoom">
              {orders.map((act, index) => (
                <div className="card" key={index}>
                    <img src={`${baseImgUrl}/${size}${act.posterMovie}`}  alt="poster" className="posterMovie" onClick={()=>reproducir(act.id)}/> 
                </div>
                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
                
        </div>        

    }
};

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(Shopping);