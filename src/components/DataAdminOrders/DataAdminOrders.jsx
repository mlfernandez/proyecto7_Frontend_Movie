
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
        allOrders();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });


    const allOrders = async () => {  
    try{      
      let idUser = props.credentials.user.id;
      let token = props.credentials.token;

    


      let res = await axios.get('http://localhost:3005/orders/',{headers:{'authorization':'Bearer ' + token}});

      console.log(res.data)

  

    setOrders(res.data);

      

    }catch (err){     

    }
  
    }
    
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
   

   if (orders[0]?.id) {
      return (
        <div className="nombreDataRoomAdmin"> <div>Todas las ordenes</div>
        <div className="boxCardDataRoomAdmin">
              {orders.map((act, index) => (
                <div className="cardAdmin" key={index}>                
                    <div className="card"><img src={`${baseImgUrl}/${size}${act.posterMovie}`}  alt="poster" className="posterMovie"/></div>
                        
                    <div className= "dataCard">
                        <p className="nombre"> Titulo: {act.titleMovie}</p>
                        <p className="rentalDate">Fecha de pedido: {moment(act.rentalDate).format('DD/MM/YYYY')}</p>
                        <p className="returnDate">Fecha de devolucion: {moment(act.retunDate).format('DD/MM/YYYY')}</p>
                        <p className="orderId">Pedido # {act.id}</p>
                        <p className="orderId">Cliente # {act.idUser}</p>
                    </div>

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
  }))(DataAdminOrders);