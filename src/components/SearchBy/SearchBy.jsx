//Buscamos por titulo id gendre // no necesita login

import React, { useEffect, useState } from "react";
import './SearchBy.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETSEARCH, MOVIE } from '../../redux/types';
import {useHistory} from 'react-router-dom';
import unavailable from '../../images/unavailable.jpg'




const SearchBy = (props) => {

    let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
  
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  

   //Guarda la movie en redux y nos lleva a la vista de película.
   const clickMovie = async (data) => {
    try{

      props.dispatch({type:MOVIE,payload: data});
/*       props.dispatch({type:GETSEARCH,payload: data}); */


      history.push("/moviedetails")

  }catch (err){
          
       }      

  }


  const searchByFilterGenre = async (opc) => {

    let genre = document.getElementById("genreList").value;        
    let body={
        query : genre
    }

              try {
                  console.log("Entro en genre");
                  let res2 = await axios.post('http://localhost:3005/movies/genre',body);
                  console.log(res2.data.results);
                  setMoviesSearch(res2.data.results);
              } catch (error) {
          
              }
          
    
}


    const searchByFilter= async () => {  
   
   
      let query = document.getElementById("searchByTitle").value;

      let body = {
        query : query
      }

      if (document.getElementById("opciones").value === "title") {
        try {var res = await axios.post('http://localhost:3005/movies/search/', body);
        console.log(res)
            
            let search = document.getElementById("opciones").value;


            setMoviesSearch(res.data.results)
            

        }catch (err){      

            console.log(err)
        }
      }else if (document.getElementById("opciones").value === "id") {
        try {var res = await axios.post('http://localhost:3005/movies/id', body);
            
            let search = document.getElementById("opciones").value;
            let arrayMovie = [];
            arrayMovie.push(res.data);    
            setMoviesSearch(arrayMovie);

        }catch (err){      

            console.log(err)
        }

/*       } else if (document.getElementById("opciones").value === "actor") {
        try {var res = await axios.post('http://localhost:3005/movies/actor', body);
            
            let search = document.getElementById("opciones").value

            setMoviesSearch(res.data.results)

        }catch (err){      

            console.log(err)
        } */
    }}

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    
    if (moviesSearch[0]?.id) {
      return (

        <div>  
        <div className = "vistaLoginShearch">
        <div className = "loginCardSearch"> 
            <div className = "cardLogin">
                <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
            </div>
            <div className = "cardLoginSearch">
                <select id = "opciones" className="input">
                    <option value="title">Por titulo</option>
                    <option value="id">Por id</option>
               {/*      <option value="actor">Por actor</option> */}
                  
                </select>
                <div className = "sendButton" onClick={()=>searchByFilter()}>Buscar</div>
                Busqueda por genero:
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

        <div className="titleSearch"> <h1>Resultados</h1>
            <div className="boxCardSearch">
              {moviesSearch.map((act, index) => (
                <div className="cardMovie" onClick={()=> clickMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`} alt="poster" className="poster"/>
                </div>
                   ))}

     

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
                        <div className = "genreSearchTitle">Busqueda por título o id:</div>
                            <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
                        </div>
                        <div className = "cardLogin">
                        
                            <select id = "opciones" className="input">
                                <option value="title">Por titulo</option>
                                <option value="id">Por id</option>
                       {/*          <option value="actor">Por actor</option> */}
                
                            </select>
                            <div className = "sendButton" onClick={()=>searchByFilter()}>Buscar</div>
                            <div className = "genreSearchTitle">Busqueda por genero:</div>
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