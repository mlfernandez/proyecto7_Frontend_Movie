import React from 'react';
import './Profile.scss';

import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { connect } from 'react-redux';
import DataProfile from '../../components/DataProfile/DataProfile';
import SearchTopRated from '../../components/SearchTopRated/SearchTopRated';
import SearchComingSoon from '../../components/SearchComingSoon/SearchComingSoon';
import SearchBy from '../../components/SearchBy/SearchBy';



const Profile = (props) => {

    const traeDatos = () => {
        switch (props.tipodatos) {

                case 'profile':

                    return <DataProfile/>

                case 'gettoprated':

                    return <SearchTopRated/>
    
                case 'getcomingsoon':
    
                    return <SearchComingSoon/>    
               
                case 'getsearch':
    
                    return <SearchBy/> 

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