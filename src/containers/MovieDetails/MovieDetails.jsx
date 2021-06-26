import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { MOVIE } from "../../redux/types";
import { Popconfirm, message, Button } from 'antd';
import moment from "moment";

const MovieDetails = (props) => {
  let history = useHistory();


  const AddToCart = async (data) => {

    props.dispatch({type:MOVIE,payload:data});

    if (props.credentials.token === "") {
      history.push('/login')
    } else {


     /*  const newOrder = async (data) => { */
        try{
  
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;
        let rentalDate = Date.now();
        let returnDate = moment(rentalDate, "DD-MM-YYYY").add(7, 'days');
  
  
        let body = {
          idUser : idUser,
          idMovie : props.movie?.id,
          titleMovie: props.movie.title,
          posterMovie: props.movie.poster_path,
          rentalDate : rentalDate,
          returnDate : returnDate
        }
  
        console.log(body)
        
        let res = await axios.post('http://localhost:3005/orders',body,{headers:{'authorization':'Bearer ' + token}});
        message.info('Clase reservada.');
        console.log(res)
  
       }catch (err){
       
        }      
     /*  } */
    }

  }
    /* try{

    let token = props.credentials.token;
    let idUser = props.credentials.idUser;


    let body = {
      id : roomId,
      member : idUser,
      email : props.credentials.email,
      name : props.credentials.name
    }
    
    let res = await axios.post('http://localhost:3005/room/join',body,{headers:{'authorization':'Bearer ' + token}});
    message.info('Clase reservada.');
    findAllRoomsAllActive();

   }catch (err){
    notification.warning({message:'Atencion.',description: JSON.stringify(err.response.data.message)});
    }      
  } */




  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200"


  if (props.movie?.id) {
    {
      console.log(props.movie);
    }
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

        <div className="dataMovieBoton">
          <div onClick={() => history.push('/datacontainer')} className="botonIcon">{<FontAwesomeIcon icon={faArrowCircleLeft}/>}   Atrás</div>
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
}))(MovieDetails);