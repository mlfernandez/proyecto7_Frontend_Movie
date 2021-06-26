import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faCartPlus, faFilm, faStar, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MovieDetails = (props) => {
  let history = useHistory();


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
          <div onClick={() => history.push('/cart')} className="botonIcon">{<FontAwesomeIcon icon={faCartPlus}/>}   Alquilar</div>
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