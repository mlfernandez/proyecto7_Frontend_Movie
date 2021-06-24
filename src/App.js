
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import DataContainer from './containers/DataContainer/DataContainer';


/* import Footer from './components/Footer/Footer';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Register from './containers/Register/Register';
import Demo from './containers/Form/Form'; */




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

            </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;

