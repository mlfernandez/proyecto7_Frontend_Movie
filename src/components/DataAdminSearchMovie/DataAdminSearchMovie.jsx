import React, { useEffect, useState } from "react";
import './DataAdminSearchMovie.scss';
import axios from "axios";
import { connect } from 'react-redux';
import { MOVIE } from '../../redux/types';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const DataAdminSearchMovie = (props) => {

    let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
        // creo el hooks para cambiar de pagina
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {

    }, []);
  
    useEffect(()=> {
    
      });

   //Guarda la movie en redux y nos lleva a la vista de película.
   const clickMovie = async (data) => {
    try{

      props.dispatch({type:MOVIE,payload: data});

      history.push("/moviedetails")

  }catch (err){
          
       }      

  }

 

    const searchById= async () => {  
   
      let query = document.getElementById("searchByTitle").value;

      let body = {
        query : query
      }

      
      try {var res = await axios.post('http://localhost:3005/movies/id', body);
        console.log(res)
            
        let search = document.getElementById("opciones").value;
        let arrayMovie = [];
        arrayMovie.push(res.data);    
        setMoviesSearch(arrayMovie);
            

        }catch (err){      

            console.log(err)
        }

    }




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
                    <option value="id">Por id</option>
                </select>
                <div className = "sendButton" onClick={()=>searchById()}>Buscar</div>
                
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
                        <div className = "genreSearchTitle">Busqueda por id:</div>
                            <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
                        </div>
                        <div className = "cardLogin">
                        
                            <select id = "opciones" className="input">
                                <option value="id">Por id</option>
                            </select>
                            <div className = "sendButton" onClick={()=>searchById()}>Buscar</div>
                            
                        </div>
                        
                        
                    </div>
            
                </div>   
                
            </div>
)
}}

export default connect((state) => ({movie : state.movie}))(DataAdminSearchMovie);