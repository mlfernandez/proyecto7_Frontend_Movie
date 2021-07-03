import React, { useEffect, useState } from "react";
import './SearchBy.scss';
import axios from "axios";
import { connect } from 'react-redux';
import { MOVIE } from '../../redux/types';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const SearchBy = (props) => {

    let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
    
    // creo el hooks para cambiar de pagina
    const [page, setPage] = useState(1);
    const [oldpage, setOldPage] = useState(1);
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {

    }, []);
  
    useEffect(()=> {

        if(page !== oldpage){
          setOldPage(page);
          searchByFilterGenre();
          searchByFilter();
        }
    
      });

   //Guarda la movie en redux y nos lleva a la vista de película.
   const clickMovie = async (data) => {
    try{

      props.dispatch({type:MOVIE,payload: data});

      history.push("/moviedetails")

  }catch (err){
          
       }      

  }

  // buscqueda por filtro de genero
  const searchByFilterGenre = async (opc) => {

    let genre = document.getElementById("genreList").value;        
    let body={
        query : genre
    }

        try {
            console.log("Entro en genre");
            let res2 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US&with_genres=${genre}&page=${page}`)
            console.log(res2.data.results);
            setMoviesSearch(res2.data.results);
        } catch (error) {
    
        }
  
}

//busqueda por título
    const searchByFilter= async () => {  
   
      let query = document.getElementById("searchByTitle").value;

      let body = {
        query : query
      }

      
        try {var res = await axios.post('http://localhost:3005/movies/search/', body);
        console.log(res)
            
            let search = document.getElementById("opciones").value;

            setMoviesSearch(res.data.results)
            

        }catch (err){      

            console.log(err)
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


    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    
    if (moviesSearch[0]?.id) {
      return (

        <div>  
        <div className = "vistaLoginSearchBy">
        <div className = "loginCardSearchBy"> 
            <div className = "cardLoginSearchBy">
                <input id= "searchByTitle" className="inputSearchBy" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
            </div>
            <div className = "cardLoginSearchBy">
                <select id = "opciones" className="inputSearchBy">
                    <option value="title">Por titulo</option>
                </select>
                <div className = "sendButtonSearchBy" onClick={()=>searchByFilter()}>Buscar</div>
                <div className = "titleSearchBy">Busqueda por genero:</div>
                <select id="genreList" onChange={()=>searchByFilterGenre(document.getElementById("genreList").value)} className="inputSearchBy">
                            <option value="28">Acción</option>
                            <option value="12">Aventura</option>
                            <option value="16">Animacion</option>
                            <option value="35">Comedia</option>
                            <option value="80">Crimen</option>
                            <option value="99">Documental</option>
                            <option value="18">Drama</option>
                            <option value="10751">Familiar</option>
                            <option value="14">Fantasia</option>
                            <option value="36">Historia</option>
                            <option value="27">Horror</option>
                            <option value="10402">Musical</option>
                            <option value="9648">Misterio</option>
                            <option value="10749">Romance</option>
                            <option value="878">Ciencia ficción</option>
                            <option value="10770">TV Movie</option>
                            <option value="53">Thriller</option>
                            <option value="10752">Guerra</option>
                            <option value="37">Western</option>                            
                        </select>  
            </div>
            
            
        </div>

    </div>       

        <div className="titleSearch"> <div className="titleSearchBy">Resultados</div>
            <div className="boxCardSearch">
              {moviesSearch.map((act, index) => (
                <div className="cardMovieSearchBy" onClick={()=> clickMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`} alt={act.title} className="poster"/>
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
        </div> 
      );
    } else {
        
        return (


            <div>          

                <div className = "vistaLogin">
                    <div className = "loginCard"> 
                        <div className = "cardLogin">
                        <div className = "titleSearchBy">Busqueda por título o id:</div>
                            <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
                        </div>
                        <div className = "cardLogin">
                        
                            <select id = "opciones" className="input">
                                <option value="title">Por titulo</option>
                            </select>
                            <div className = "sendButton" onClick={()=>searchByFilter()}>Buscar</div>
                            <div className = "titleSearchBy">Busqueda por genero:</div>
                            <select id="genreList" onChange={()=>searchByFilterGenre(document.getElementById("genreList").value)} className="input">
                                <option value="28">Acción</option>
                                <option value="12">Aventura</option>
                                <option value="16">Animacion</option>
                                <option value="35">Comedia</option>
                                <option value="80">Crimen</option>
                                <option value="99">Documental</option>
                                <option value="18">Drama</option>
                                <option value="10751">Familiar</option>
                                <option value="14">Fantasia</option>
                                <option value="36">Historia</option>
                                <option value="27">Horror</option>
                                <option value="10402">Musical</option>
                                <option value="9648">Misterio</option>
                                <option value="10749">Romance</option>
                                <option value="878">Ciencia ficción</option>
                                <option value="10770">TV Movie</option>
                                <option value="53">Thriller</option>
                                <option value="10752">Guerra</option>
                                <option value="37">Western</option>                           
                            </select>  
                        </div>
                        
                        
                    </div>
            
                </div>   
                
            </div>
)
}}

export default connect((state) => ({movie : state.movie}))(SearchBy);