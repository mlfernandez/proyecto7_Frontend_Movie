//Buscamos las peliculas top // no necesita login

import React, { useEffect, useState } from "react";
import './SearchTopRated.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETTOPRATED, MOVIE } from '../../redux/types';
import { useHistory } from 'react-router-dom';



const SearchTopRated = (props) => {

    let history = useHistory()

    //hooks
    const [moviesTopRate, setMoviesTopRate] = useState([]); 
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        findTopRated();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const clickMovie = async (data) => {
      try{

        console.log(data);
        props.dispatch({type:MOVIE,payload: data});
        
        history.push("/movieDetails");





    }catch (err){
         console.log(err);      
         }      

    }
  
    const findTopRated = async () => {  
    try{
      let res = await axios.get('http://localhost:3005/movies/');
      setMoviesTopRate(res.data.results); 
      
  }catch (err){      

    console.log(err)
    }
  
}

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200"

    if (moviesTopRate[0]?.id) {
      return (
        <div className="titleSearch"> <h1>Las mejores valoradas</h1>
            <div className="boxCardSearch">
              {moviesTopRate.map((act, index) => (
                <div className="cardMovie" onClick={()=> clickMovie(act)} key={index}>
                    <img src={`${baseImgUrl}/${size}${act.poster_path}`}  alt="poster" className="poster"/>

                </div>
                   ))}

            </div>
        </div>  
      );
    } else {
      return <div>
          SPINNER</div>;
    }
};

export default connect((state) => ({movie : state.movie}))(SearchTopRated);