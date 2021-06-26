//Buscamos las peliculas top // no necesita login

import React, { useEffect, useState } from "react";
import './SearchComingSoon.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETCOMINGSOON, MOVIE } from '../../redux/types';
import {useHistory} from 'react-router-dom';

const SearchComingSoon = (props) => {


    let history = useHistory();

    //hooks
    const [moviesComingSoon, setmoviesComingSoon] = useState([]); 
  
    //Equivalente a componentDidMount en componentes de clase (este se ejecuta solo una vez)
    useEffect(() => {
        findComingSoon();
    }, []);
  
    //Equivalente a componentDidUpdate en componentes de clase
    useEffect(() => {
    });
  
    //Guarda la movie en redux y nos lleva a la vista de película.
    const clickMovie = async (data) => {
      try{

        console.log(data, "soy movie");
        props.dispatch({type:MOVIE,payload: data});
     /*    props.dispatch({type:GETCOMINGSOON,payload: data}); */



        history.push("/moviedetails")

      


    }catch (err){
            
         }      

    }
  
    const findComingSoon = async () => {  
    try{
      let res = await axios.get('http://localhost:3005/movies/soon');
      setmoviesComingSoon(res.data.results); 
      
  }catch (err){      

    console.log(err)
    }
  
}

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
        </div>  
      );
    } else {
      return <div>
          SPINNER</div>;
    }
};

export default connect((state) => ({movie : state.movie}))(SearchComingSoon);