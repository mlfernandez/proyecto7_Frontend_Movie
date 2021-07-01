
import React, { useEffect, useState } from "react";
import './DataAdminOrders.scss';
import axios from "axios";
import { connect } from 'react-redux';
import {notification} from 'antd';
import {useHistory} from "react-router";
import { MOVIE } from '../../redux/types';
import moment from 'moment';


const DataAdminOrders = (props) => {
    let history = useHistory();
    //hooks
    const [orders, setOrders] = useState([]);  
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
    
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });


    const allOrders = async () => {  
        let idUser = props.credentials.user.id;
        let token = props.credentials.token;


      if (document.getElementById("opciones").value === "active") {

      try{      
  

    
        var res = await axios.post('http://localhost:3005/orders/active',{headers:{'authorization':'Bearer ' + token}});

        
        setOrders(res.data);

      

    }catch (err){     

    }
  
  }else if (document.getElementById("opciones").value === "noactive") {

    try{      


      var res = await axios.post('http://localhost:3005/orders/noactive',{headers:{'authorization':'Bearer ' + token}});

    
      setOrders(res.data);

    }catch (err){     

    }
  
  }
}

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
   

   if (orders[0]?.id) {
      return (
        <div>  
        <div className = "vistaLoginShearch">
        <div className = "loginCardSearch"> 
            <div className = "cardLoginSearch">
                <select id = "opciones" className="input">
                    <option value="active">Alquileres en curso</option>
                    <option value="noactive">Alquileres pasados</option>
                </select>
            </div>
            <div className = "sendButton" onClick={()=>allOrders()}>Buscar</div>
            
        </div>
        

    </div>  
        <div className="nombreDataRoomAdmin"> <div>Todas las ordenes</div>
        <div className="boxCardDataRoomAdmin">
              {orders.map((act, index) => (
                <div className="cardAdmin" key={index}>                
                    <div className="card"><img src={`${baseImgUrl}/${size}${act.posterMovie}`}  alt="poster" className="posterMovie"/></div>
                        
                    <div className= "dataCard">
                        <p className="nombre"> Titulo: {act.titleMovie}</p>
                        <p className="rentalDate">Fecha de pedido: {moment(act.rentalDate).format('DD/MM/YYYY')}</p>
                        <p className="returnDate">Fecha de devolucion: {moment(act.returnDate).format('DD/MM/YYYY')}</p>
                        <p className="orderId">Pedido # {act.id}</p>
                        <p className="orderId">Cliente # {act.idUser}</p>
                    </div>

                </div>

                   ))}

            </div>
        </div>  
        </div> 
      );
            
    } else {
      return (


        <div>          

            <div className = "vistaLogin">
                <div className = "loginCard"> 
                    <div className = "cardLogin">
                        <select id = "opciones" className="input">
                          <option value="active">Alquileres en curso</option>
                          <option value="noactive">Alquileres pasados</option>
                        </select>
                    </div>
                    <div className = "sendButton" onClick={()=>allOrders()}>Buscar</div>
                    
                </div>
        
            </div>   
            
        </div>
)
}}

export default connect((state) => ({
  credentials:state.credentials, 
  orders:state.orders
  }))(DataAdminOrders);