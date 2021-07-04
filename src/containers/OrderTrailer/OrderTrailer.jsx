import axios from "axios";
import React, { useEffect } from "react";
import { useState, getState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import './OrderTrailer.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";



const OrderTrailer = (props) => {

  let history = useHistory();
  let token = props.credentials.token;
  let idMovie = props.order?.idMovie
console.log(props.order?.idMovie)



 

  const [videoTrailer, setVideoTrailer] = useState([]);

useEffect(() => {
    setTimeout(() => {
      video();
    }, 500);
  }, []);



  const video = async () => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US`);
        setVideoTrailer(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };



  try {
      let key = videoTrailer[0]?.key;
    return (
        <div>
            <div className="videoframe">
                <iframe title="Trailer" width="560" height="315" src={`https://www.youtube.com/embed/${key}`} frameborder="0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
            
            <div onClick={() => history.push('/datacontainer')} className="botonIconTrailer">{<FontAwesomeIcon icon={faArrowCircleLeft}/>}   Atrás</div>
      
      </div>
    );
  } catch {


  }
};


export default connect((state) => ({
  credentials: state.credentials,
  movie: state.movie,
  order: state.order,
}))(OrderTrailer);