import React, { useEffect, useState } from "react";
import './SearchComingSoon.scss';
import axios from "axios";
import { connect } from 'react-redux';
import { MOVIE } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const SearchComingSoon = (props) => {


    let history = useHistory();

    //hooks
    const [moviesComingSoon, setmoviesComingSoon] = useState([]); 
    // creo el hooks para cambiar de pagina
    const [page, setPage] = useState(1);
    const [oldpage, setOldPage] = useState(1);
  
    //Se ejecuta solo una vez
    useEffect(() => {
        findComingSoon();
    }, []);
  
    //Para la funcion de cambiar de pagina
    useEffect(()=> {

      if(page !== oldpage){
        setOldPage(page);
        findComingSoon();
      }
  
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const clickMovie = async (data) => {
      try{
 
        props.dispatch({type:MOVIE,payload: data});

        history.push("/moviedetails")


    }catch (err){
      console.log(err); 
         }      

    }
  
    const findComingSoon = async () => {  
    try{
      let res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&page=${page}`);
      setmoviesComingSoon(res.data.results); 
      
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



  if (moviesComingSoon[0]?.id) {
      return (
        <div className="titleSearch"> <h1>Próximamente</h1>
            <div className="boxCardSearch">
              {moviesComingSoon.map((act, index) => (
                <div className="cardMovie" onClick={()=> clickMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
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
          SPINNER</div>;
    }
}; 

export default connect((state) => ({movie : state.movie}))(SearchComingSoon);