import React from 'react';
import './DataContainer.scss';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { connect } from 'react-redux';

import SearchTopRated from '../../components/SearchTopRated/SearchTopRated';
import SearchComingSoon from '../../components/SearchComingSoon/SearchComingSoon';



/* import DataProfile from '../../components/DataProfile/DataProfile';
import DataRoom from '../../components/DataRoom/DataRoom';
import DataJoin from '../../components/DataJoin/DataJoin';
import DataRoomMonitor from '../../components/DataRoomMonitor/DataRoomMonitor';
import DataJoinMonitor from '../../components/DataJoinMonitor/DataJoinMonitor';
import NewRoom from '../../components/NewRoom/NewRoom';
import Payment from '../../components/Payment/Payment';
import Code from '../../components/QrCode/QrCode';
import NewCoach from '../../components/NewCoach/NewCoach';
import NewUser from '../../components/NewUser/NewUser'; */


const DataContainer = (props) => {

    const traeDatos = () => {
        switch (props.tipodatos) {


            case 'gettoprated':

                return <SearchTopRated/>

            case 'getcomingsoon':

                return <SearchComingSoon/>    
           
/*             case 'joinuser':

                return <DataJoin />

            case 'monitoroom':
                return <DataRoomMonitor/>

            case 'joinmonitor':
                return <DataJoinMonitor/>
            
            case 'newroom':
                return <NewRoom/>
            case 'newcoach':
                return <NewCoach/>
            case 'newuser':
                return <NewUser/>
            case 'payment':
                    return <Payment/>
            case 'codeqr':
                return <Code/>
            default:

                return <DataProfile /> */
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