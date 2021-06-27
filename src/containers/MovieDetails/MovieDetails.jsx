import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { MOVIE, ORDER } from "../../redux/types";
import moment from "moment";
import {message} from 'antd'
import 'antd/dist/antd.css'

const MovieDetails = (props) => {
  let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
    const [userOrder, setUserOrder] = useState([]); 


  const AddToCart = async (data) => {



    if (props.credentials.token === "") {
      history.push('/login')

    } else {



        try{
  
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;
        let rentalDate = Date.now();
        let returnDate = moment(rentalDate).add(7, 'days').calendar();     
  
  
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
        message.info('Agregada al carrito.');
        console.log(res, "estoy en res")
    

        history.push('/datacontainer')

        

       }catch (err){
       
        }      
 
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
          <div onClick={() => history.push('/datacontainer')} className="botonIcon">{<FontAwesomeIcon icon={faArrowCircleLeft}/>}   Atrás</div>
         {/*  <div onClick={() => history.push('/rentmovie')} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Alquilar</div> */}
          <div onClick={()=>AddToCart(props.movie?.id)} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Alquilar</div>
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