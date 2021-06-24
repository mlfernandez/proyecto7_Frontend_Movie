//Buscamos las peliculas top // no necesita login

import React, { useEffect, useState } from "react";
import './SearchComingSoon.scss';
import axios from "axios";
import moment from "moment";
import { Popconfirm, message, Button } from 'antd';
import { connect } from 'react-redux';
import { GETCOMINGSOON } from '../../redux/types';



const SearchComingSoon = (props) => {

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
    const clickMovie = async (dataMovie) => {
      try{

        console.log(dataMovie, "soy movie");
        props.dispatch({type:GETCOMINGSOON,payload: dataMovie});



        setmoviesComingSoon(dataMovie)
  
/*         let res = await axios.get(`http://localhost:3005/movies/search/${title}`, title);
        console.log(res.data) */
  
      


    }catch (err){
            
         }      

    }
  
    const findComingSoon = async () => {  
    try{
      let res = await axios.get('http://localhost:3005/movies/soon');
      setmoviesComingSoon(res.data.results); 
      console.log(res.data.results)
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
                    {/* <p className="nombre">{act.name}</p>
                  <p className="datosCard">Comienzo: {moment(act.dateStart).format('LLL')}</p>
                  <p className="datosCard">Fin: {moment(act.dateEnd).format('LLL')}</p>
                  <p className="datosCard">Entrenador: {act.nameCoach}</p>
                  <p className="datosCard">Capacidad: {act.members.length}/{act.maxMember}</p>
                  <div clasName="botonCardJoinUser">
                        <div className="demo">
                            <div style={{ marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }}>
                              <Popconfirm placement="bottom" title="¿Quieres ver esta pelicula?" onConfirm={()=>addToCartMovie(act._id)} okText="Yes" cancelText="No">
                                <Button>Ver</Button>
                              </Popconfirm>
                            </div>
                        </div>
                    </div> */}
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

export default connect((state) => ({}))(SearchComingSoon);