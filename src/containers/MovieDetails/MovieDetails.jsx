import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { MOVIE, GETORDER } from "../../redux/types";
import moment from "moment";
import {message} from 'antd'
import 'antd/dist/antd.css'
import {notification} from 'antd';

const MovieDetails = (props) => {
  let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 



  const AddToCart = async (data) => {


      // comprobar si esta logeado
    if (props.credentials.token === "") {
      history.push('/login')


      // comprobar validación de suscripcion previo a la compra
    } else if (moment(props.credentials.user.lastSuscriptionEnd).format('DD/MM/YYYY') < moment(Date.now()).format('DD/MM/YYYY')) {
    console.log(props.credentials.user.lastSuscriptionEnd)

      notification.warning({message:'Atencion.',description: "Tienes la suscripción vencida."}); 
      history.push('/payment')
    
    
    // hacer el pedido de la pelicula
  } else {

    console.log(props.credentials.user.lastSuscriptionEnd)

        try{
  
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;
        let rentalDate = Date.now();
        let returnDate = moment(rentalDate).add(2, 'day').format('YYYY/MM/DD'); 
   
        
        console.log(returnDate)
  
        let body = {
          idUser : idUser,
          idMovie : props.movie?.id,
          titleMovie: props.movie.title,
          posterMovie: props.movie.poster_path,
          rentalDate : rentalDate,
          returnDate : returnDate
        }
  
        console.log()
      
        
        let res = await axios.post('http://localhost:3005/orders',body,{headers:{'authorization':'Bearer ' + token}});
      
    
        setTimeout(() => {
          history.push('/introtrailer');
        }, 1500)
       

        

       }catch (err){
       
       
        notification.warning({message:'Atencion.',description: "Ya tienes esta pelicula disponible para ver en tu carpeta."}); 
  

        }      
 
    }

  }
   

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200"

  console.log(props.movie)
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
          <div onClick={() => history.push('/datacontainer')} className="botonIcon">{<FontAwesomeIcon icon={faArrowCircleLeft}/>}   Atrás</div>
         {/*  <div onClick={() => history.push('/rentmovie')} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Alquilar</div> */}
          <div onClick={()=>AddToCart(props.movie?.id)} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>} Ver Ahora </div>
        </div>


      </div>
    );
  } else {
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  movie: state.movie,
  order: state.order,
}))(MovieDetails);