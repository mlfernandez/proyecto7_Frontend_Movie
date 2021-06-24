import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MenuLateral.scss";
import { connect } from "react-redux";
import { LOGIN, LOGOUT, PROFILE, GETPOPULARMOVIE, GETCOMINGSOON, ORDER, ADMINMOVIE, SEARCHBY, GETSEARCH, SERCHTOPRATED, SEARCHBYGENRE, SEARCHBYTITLE, GETTOPRATED, SEARCHBYID, ADMINUSER} from "../../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendarWeek, faSearch } from "@fortawesome/free-solid-svg-icons";

const Menulateral = (props) => {


  let history = useHistory();
  let credentials = props.credentials;
  const [movieInfo, setMovieInfo] = useState([]);  

  const cambiaDatos = async (info) => {
    switch (info) {
 

      case "gettoprated":
        props.dispatch({ type: GETTOPRATED, payload: info });
        console.log("entre a top rated")
        break;

      case "getcomingsoon":
        props.dispatch({ type: GETCOMINGSOON, payload: info });

        break;

      case "getsearch":
        props.dispatch({ type: GETSEARCH, payload: info });

        break;

      case "getsearchbyid":
        props.dispatch({ type: SEARCHBYID, payload: info });

        break;

      case "getsearchbygendre":
        props.dispatch({ type: SEARCHBYGENRE, payload: info });

        break;

      case "getsearchbytitle":
        props.dispatch({ type: SEARCHBYTITLE, payload: info });
  
        break;

      default:

        break;
    }
  };

  //MENU DEL HOME PARA BUSCAR NOVEDADES ETC
 
    return (
      <div className="boxLateral">
        
        <div className="lateralMenu">
          
          <div className="MenuLateral">
            <FontAwesomeIcon className="iconMenuLateral" icon={faStar}/>
            <FontAwesomeIcon className="iconMenuLateral" icon={faCalendarWeek}/>
            <FontAwesomeIcon className="iconMenuLateral" icon={faSearch}/>
            <FontAwesomeIcon className="iconMenuLateral" icon={faStar}/>
          </div>
          <div className="MenuLateral">
            <div className="botomMenuLateral"onClick={() => cambiaDatos("gettoprated") }>Mejores valoradas</div>
            <div className="botomMenuLateral"onClick={() => cambiaDatos("getcomingsoon")}>Proximamente</div>
            <div className="botomMenuLateral"onClick={() => cambiaDatos("getsearch")}>Buscar</div>
            <div className="botomMenuLateral"onClick={() => cambiaDatos("getorder")}>Pedido</div>
          </div>
        </div>
      </div>
    );


};

export default connect((state) => ({
  credentials: state.credentials,
  tipodatos: state.tipodatos,
}))(Menulateral);
