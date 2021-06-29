import React from 'react';
import './DataContainer.scss';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { connect } from 'react-redux';

import SearchTopRated from '../../components/SearchTopRated/SearchTopRated';
import SearchComingSoon from '../../components/SearchComingSoon/SearchComingSoon';
import SearchBy from '../../components/SearchBy/SearchBy';
import Shopping from '../../components/Shopping/Shopping';
import DataProfile from '../../components/DataProfile/DataProfile';
import DataAdminOrders from '../../components/DataAdminOrders/DataAdminOrders';



const DataContainer = (props) => {

    const traeDatos = () => {
        switch (props.tipodatos) {


            case 'gettoprated':

                return <SearchTopRated/>

            case 'getcomingsoon':

                return <SearchComingSoon/>    
           
            
            case 'getsearch':

                return <SearchBy/>      

            case 'getorder':

                return <Shopping/>       
            
            case 'profile':

                return <DataProfile/>   

            case 'getallorders':

                return <DataAdminOrders/>  
                

            default:

                return <SearchTopRated/>
        }

    }

    return (
        <div>

            <div className="boxPerfilUsuario">
                <MenuLateral/>
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
}))(DataContainer);