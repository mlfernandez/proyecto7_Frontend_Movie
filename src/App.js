
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import DataContainer from './containers/DataContainer/DataContainer';
import Profile from './containers/Profile/Profile';
import MovieDetails from './containers/MovieDetails/MovieDetails';
import IntroTrailer from './containers/IntroTrailer/IntroTrailer';




function App() {
  return (
    <div>
      <BrowserRouter>

        <Header/>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/datacontainer" exact component={DataContainer}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/moviedetails" exact component={MovieDetails}/>
              <Route path="/introtrailer" exact component={IntroTrailer}/>
    

            </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;

