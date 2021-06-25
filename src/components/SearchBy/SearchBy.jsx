//Buscamos por titulo id gendre // no necesita login

import React, { useEffect, useState } from "react";
import './SearchBy.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETSEARCH } from '../../redux/types';
import {useHistory} from 'react-router-dom';


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
  
  
  
    const searchByClick = async () => {  
   
   
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

      } else if (document.getElementById("opciones").value === "genre") {
        try {var res = await axios.post('http://localhost:3005/movies/genre', body);
            
            let search = document.getElementById("opciones").value;

            setMoviesSearch(res.data.results)


        }catch (err){      

            console.log(err)
        }
      }
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"

    
    if (moviesSearch[0]?.id) {
      return (

        <div>  
        <div className = "vistaLogin">
        <div className = "loginCard"> 
            <div className = "cardLogin">
                <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
            </div>
            <div className = "cardLogin">
                <select id = "opciones" className="input">
                    <option value="title">Por titulo</option>
                    <option value="id">Por id</option>
                    <option value="genre">Por genero</option>
                </select>
            </div>
            <div className = "sendButton" onClick={()=>searchByClick()}>Buscar</div>
            
        </div>

    </div>       

        <div className="titleSearch"> <h1>Resultados</h1>
            <div className="boxCardSearch">
              {moviesSearch.map((act, index) => (
                <div className="cardMovie" onClick={()=> searchByClick(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>
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
                            <input id= "searchByTitle" className="input" type="text" name="text" placeholder="Buscar" size="40" lenght='30'></input>     
                        </div>
                        <div className = "cardLogin">
                            <select id = "opciones" className="input">
                                <option value="title">Por titulo</option>
                                <option value="id">Por id</option>
                                <option value="genre">Por genero</option>
                            </select>
                        </div>
                        <div className = "sendButton" onClick={()=>searchByClick()}>Buscar</div>
                        
                    </div>
            
                </div>   
                
            </div>
)
}}

export default connect((state) => ({}))(SearchBy);