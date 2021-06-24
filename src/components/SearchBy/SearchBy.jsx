//Buscamos por titulo id gendre // no necesita login

import React, { useEffect, useState } from "react";
import './SearchBy.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETSEARCH, SEARCHBYGENRE, SEARCHBYTITLE, SEARCHBYID } from '../../redux/types';
import {useHistory} from 'react-router-dom';


const SearchBy = (props) => {

    let history = useHistory();

    //hooks
    const [moviesSearch, setMoviesSearch] = useState([]); 
    const [moviesByGenre, setMoviesByGenre] = useState([]); 
    const [moviesByTitle, setMoviesByTitle] = useState([]); 
    const [moviesById, setMoviesById] = useState([]); 
  
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
            let data = {
                title : query,
                search: search
            }

            //Guardo en RDX
            props.dispatch({type:SEARCHBYTITLE,payload:data});

            //Redireccion           
            history.push("/");

        }catch (err){      

            console.log(err)
        }
      }else if (document.getElementById("opciones").value === "id") {
        try {var res = await axios.post('http://localhost:3005/movies/id', body);
            
            let search = document.getElementById("opciones").value;
            let data = {
                id : query,
                search: search
            }

            //Guardo en RDX
            props.dispatch({type:SEARCHBYID,payload:data});

            //Redireccion           
            history.push("/");

        }catch (err){      

            console.log(err)
        }

      } else if (document.getElementById("opciones").value === "genre") {
        try {var res = await axios.post('http://localhost:3005/movies/genre', body);
            
            let search = document.getElementById("opciones").value;
            let data = {
                genre : query,
                search: search
            }
            console.log(data)

            //Guardo en RDX
            props.dispatch({type:SEARCHBYGENRE,payload:data});

            //Redireccion           
            history.push("/");

        }catch (err){      

            console.log(err)
        }
      }
}

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
              <div></div>
          </div>
  
      </div>   
       
  </div>
)
}

export default connect((state) => ({}))(SearchBy);