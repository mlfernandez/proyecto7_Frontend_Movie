import React, { useEffect, useState } from "react";
import axios from "axios";
import './SearchTopRated.scss';
import { connect } from 'react-redux';
import { MOVIE } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SpinnerGif from "../Spinner/Spinner";



const SearchTopRated = (props) => {

    let history = useHistory()

    //hooks
    const [moviesTopRate, setMoviesTopRate] = useState([]); 
    // creo el hooks para cambiar de pagina
    const [page, setPage] = useState(1);
    const [oldpage, setOldPage] = useState(1);
  
    //Se ejecuta solo una vez
    useEffect(() => {
        findTopRated();
    }, []);
  
    //Para la funcion de cambiar de pagina
    useEffect(()=> {

      if(page !== oldpage){
        setOldPage(page);
        findTopRated();
      }
  
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const clickMovie = async (data) => {
      try{

        props.dispatch({type:MOVIE,payload: data});

        history.push("/movieDetails");

    }catch (err){
         console.log(err);      
         }      

    }
  
    const findTopRated = async () => {  
    try{
      let res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&page=${page}`);
      setMoviesTopRate(res.data.results); 
      
  }catch (err){      


    }
  
}

// funcion para cambiar de pagina 

const changePage = (operacion) => {
  if (operacion === "+") {
    let newPage = page + 1;

    setOldPage(page);
    setPage(newPage);
  } else if (operacion === "-" && page > 1) {
    let newPage = page - 1;
    setOldPage(page);
    setPage(newPage);
  }
};

// para traer el poster
  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200"



    if (moviesTopRate[0]?.id) {
      return (
        <div className="titleSearch"> <div className="titleSearchTopRated">Las mejores valoradas</div>
            <div className="boxCardSearch">
              {moviesTopRate.map((act, index) => (
                <div className="cardMovie" onClick={()=> clickMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt={act.title} className="poster"/>
                </div>
                   ))}
            </div>
            <div className="changePagesArrows">
                <div className="left" onClick={() => changePage("-")}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="right" onClick={() => changePage("+")}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div> 
        </div>  
      );
    } else {
      return <div>
        <SpinnerGif/>
          </div>;
    }
};

export default connect((state) => ({movie : state.movie}))(SearchTopRated);