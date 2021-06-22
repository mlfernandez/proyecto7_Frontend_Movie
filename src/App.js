
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';

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
              <Route path="/" exact component={}/>
              <Route path="/login" exact component={Login}/>
{/*               <Route path="/profile" exact component={Profile}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/form" exact component={Demo}/>
                     */}
            </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;

