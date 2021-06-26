import React, { useEffect, useState } from "react";
import './RentMovie.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { MOVIE } from '../../redux/types';
import {Input, notification} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";





const RentMovie = (props) => {

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
    newOrder()   
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //  

    

    const newOrder = async (data) => {
      try{

      let token = props.credentials.token;
      let idUser = props.credentials.idUser;
      let rentalDate = Date.now();
      let returnDate = (Date.now()+7)


      let body = {
        idUser : idUser,
        idMovie : props.movie?.id,
        rentalDate : rentalDate,
        returnDate : returnDate
      }

      console.log(body)
      
      let res = await axios.post('http://localhost:3005/orders',body,{headers:{'authorization':'Bearer ' + token}});
      message.info('Clase reservada.');
      console.log(res)

     }catch (err){
      notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
      }      
    }


    /* const cancelClass = async (roomId) => {
      try{

      let token = props.credentials?.token;
      let user = props.credentials?.idUser

      let body = {
        id : roomId     
      }

      let resul = await axios.post('http://localhost:3005/room/delete', body,{headers:{'authorization':'Bearer ' + token}});

      message.info('Clase cancelada.')
      findAllRoomsAllActive();
     
   

     }catch (err){
        notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
    }      

    }


    const updateClass = async (room) => {
      //Traemos todos los monitores
      let token = props.credentials?.token;
      let monitors = await axios.get('http://localhost:3005/monitor', {headers:{'authorization':'Bearer ' + token}});

      // Traemos los usuarios de la clase
      let arrayUser = room.members;
      let users = await axios.post('http://localhost:3005/user/group',arrayUser, {headers:{'authorization':'Bearer ' + token}});



      
      //Guardamos en Redux
      let datos = {
        room : room,
        users : users.data,
        monitors : monitors.data
      }



      props.dispatch({type:EDITROOM,payload:datos});
      props.dispatch({ type: NEWROOM, payload: "newroom" });      

    } */

/*     //Encuentra todas las clases activas que puede reserver un user.
    const findAllRoomsAllActive = async () => {  
    try{

      let res = await axios.get('http://localhost:3005/room/active');
      setUseroom(res.data);
 

  }catch (err){
    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
  }
  
} */

const baseImgUrl = "https://image.tmdb.org/t/p"
const size = "w200"


  if(props.credentials?.user)  {
    
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
                <h3>{props.movie.overview}</h3>
              </div>
              <div className="infoMovieIcon">
                <FontAwesomeIcon className="iconDataMovie" icon={faStar}/>
                <h4>Puntuación: {props.movie.vote_average}</h4>
              </div>
            </div>
          </div>
  
{/*           <div className="dataMovieBoton">
            <div onClick={() => history.push('/datacontainer')} className="botonIcon">{<FontAwesomeIcon icon={faArrowCircleLeft}/>}   Atrás</div>
            <div onClick={()=>AddToCart(props.movie?.id)} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Alquilar</div>
          </div>
   */}
  
        </div>
      );
    } else {
    }
  };

export default connect((state) => ({
  credentials:state.credentials, 
  movie:state.movie
  }))(RentMovie);