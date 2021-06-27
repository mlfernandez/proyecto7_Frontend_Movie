//Buscamos por titulo id gendre // no necesita login

import React, { useEffect, useState } from "react";
import './Shopping.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button, notification } from 'antd';
import { connect } from 'react-redux';
import { GETSEARCH, MOVIE, ORDER } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const Shopping = (props) => {

    let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
    const [userOrder, setUserOrder] = useState([]); 
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        searchUserOrder();
  
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  

    const deleteOrder = async (roomId) => {
        try{
          message.info('Pelicula cancelada.');
  
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;;
        let id = props.order.id  
  
/*         let body = {
          id : roomId,
          member : idUser
        } */
  
        let res = await axios.delete('http://localhost:3005/orders',{headers:{'authorization':'Bearer ' + id}});
  

        searchUserOrder();

        }catch (err){
            notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
        


         }  
    }
  
    const searchUserOrder= async (data) => {  

      /*   props.dispatch({type:ORDER,payload:data}); */
     /*    props.dispatch({type:MOVIE,payload:data}); */

   
    try {
        let idUser = props.credentials.user.id;
        let token = props.credentials.token;

        let body = {
            idUser : idUser
        }

        let res = await axios.post('http://localhost:3005/orders/orderuserid', body);
       
        console.log(res.data, "hola backend")    

        setUserOrder(res.data)
     

        }catch (err){      


        }
      
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    
    if (props.movie?.id) {

        return (
          <div className="dataMovie">
    
            <div className="dataMovieTitle">
              <div className="iconDataMovie"><FontAwesomeIcon className="iconDataMovie" icon={faFilm}/></div> 
              <div>{props.movie.title}</div>
            </div>
    
            <div className="infoDataMovie">
              <div className="imgPoster">
                <img
                  className="posterPath"
                  src={`${baseImgUrl}/${size}${props.movie.poster_path}`}
                  alt="Poster"
                ></img>
              </div>
              <div className="infoMovie">
                <div className="infoMovieOverview">
                  <div>{props.movie.overview}</div>
                </div>
                <div className="infoMovieIcon">
                  <FontAwesomeIcon className="iconDataMovie" icon={faStar}/>
                  <div>Puntuación: {props.movie.vote_average}</div>
                </div>
              </div>
            </div>
    
            <div className="dataMovieBoton">
              <div  onClick={() => history.push('/datacontainer')} className="botonIcon">{<FontAwesomeIcon icon={faArrowCircleLeft}/>}   Atrás</div>
              
              <div  onClick={()=>deleteOrder(props.movie?.id)} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Cancelar</div>

              <div  onClick={()=>deleteOrder(props.movie?.id)} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Ver ahora</div>
            </div>
    
    
          </div>
        );
      } else {
      }
    };

export default connect((state) => ({movie : state.movie, order : state.order, credential: state.credential}))(Shopping);