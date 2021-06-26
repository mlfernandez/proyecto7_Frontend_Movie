import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./MenuLateral.scss";
import { connect } from "react-redux";
import { LOGIN, LOGOUT, PROFILE, GETCOMINGSOON, ORDER, ADMINMOVIE, SEARCHBY, GETSEARCH, GETTOPRATED, ADMINUSER, USER} from "../../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendarWeek, faSearch, faEye, faUsers, faUserEdit, faEdit, faIdCard } from "@fortawesome/free-solid-svg-icons";

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

        case "profile":
          props.dispatch({ type: USER, payload: info });
  
          break;  



      default:

        break;
    }
  };

  //MENU DEL HOME PARA BUSCAR NOVEDADES ETC
    //IFS PARA MOSTRAR UN MENU SEGUN EL TIPO DE USUARIO QUE ACCEDE A LA APLICACIÓN
    if (props?.credentials?.token === "") 
    {
    return (
      <div className="boxLateral">
        <div className="lateralMenu">
        {/* <div className="tituloVistaAdmin">Vista Home</div> */}
          <div className="MenuLateralIcons">
            <FontAwesomeIcon className="iconMenuLateral" icon={faStar}/>
            <FontAwesomeIcon className="iconMenuLateral" icon={faCalendarWeek}/>
            <FontAwesomeIcon className="iconMenuLateral" icon={faSearch}/>
          </div>
          <div className="MenuLateral">
            <div className="botomMenuLateral"onClick={() => cambiaDatos("gettoprated") }>Mejores valoradas</div>
            <div className="botomMenuLateral"onClick={() => cambiaDatos("getcomingsoon")}>Proximamente</div>
            <div className="botomMenuLateral"onClick={() => cambiaDatos("getsearch")}>Buscar</div>
          </div>
        </div>
      </div>
    );
  } else if (props?.credentials?.user?.isAdmin === false) 
    {
    return (

    <div className="boxLateral">
        
    <div className="lateralMenu">
{/*     <div className="tituloVistaAdmin">Vista Usuario</div> */}
      <div className="MenuLateralIcons">
        <FontAwesomeIcon className="iconMenuLateral" icon={faStar}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faCalendarWeek}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faSearch}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faStar}/>
      </div>
      <div className="MenuLateral">
        <div className="botomMenuLateral"onClick={() => cambiaDatos("gettoprated") }>Mejores valoradas</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("getcomingsoon")}>Proximamente</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("getsearch")}>Buscar</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("profile")}>Perfil</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("getorder")}>Carrito</div>
      </div>
    </div>
  </div>
);
} else if (props?.credentials?.user?.isAdmin === true) 
  {
  return (
    <div className="boxLateral">
          
    <div className="lateralMenu">

      <div className="MenuLateralIcons">
        <FontAwesomeIcon className="iconMenuLateral" icon={faEye}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faUsers}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faUserEdit}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faEdit}/>
        <FontAwesomeIcon className="iconMenuLateral" icon={faIdCard}/>
      </div>
      <div className="MenuLateral">
        <div className="tituloVistaAdmin">Vista Administrador</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("gettoprated") }>Nuevo Usuario</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("getcomingsoon")}>Modificar Usuario</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("getsearch")}>Modificar Orden</div>
        <div className="botomMenuLateral"onClick={() => cambiaDatos("getorder")}>Perfil</div>
      </div>
    </div>
  </div>
);
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  tipodatos: state.tipodatos,
}))(Menulateral);
