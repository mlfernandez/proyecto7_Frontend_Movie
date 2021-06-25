import React from 'react';
import './Profile.scss';

import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { connect } from 'react-redux';
import DataProfile from '../../components/DataProfile/DataProfile';



const Profile = (props) => {

    const traeDatos = () => {
        switch (props.tipodatos) {
            case 'profile':

                return <DataProfile/>

/*             case 'usermovie':

                return <DataMovie />
           
            case 'userorder':

                return <UserOrder /> */

            default:

                return <DataProfile />
        }

    }

    return (
        <div>

            <div className="boxPerfilUsuario">
                <MenuLateral />
                <div className="datos">
                    {traeDatos()}
                </div>
            </div>


        </div>
    )

}

export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos
}))(Profile);