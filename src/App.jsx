import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch} from "react-router-dom";
//estilos
import 'react-table/react-table.css'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css';
import 'animate.css/animate.min.css'
import PubSub from 'pubsub-js';

//componentes
import Login from './Comp/Authentication/Login.jsx';
import Navbar from './Comp/Common/Navbar.jsx';
import Main from './Comp/Main.jsx';
import Sidenav from './Comp/Common/Sidenav.jsx';
import CerrarSesion from './Comp/Authentication/CerrarSesion.jsx';
import Snackbar from './Comp/Common/Snackbar.jsx';
import Pruebas from './Comp/Prueba/Main.jsx';
import AsistentesVirtuales from './Comp/AsistenteVirtual/Main.jsx';

//librerias propias 
import Cookie from './js/Cookie.js';

class App extends Component {
  constructor(props){
    super(props);
    window.M = M;

    document.title = 'Administrador de AVs';
    this.state = {
      sideNavOpen: false,
      contentClassName:'content animated contentNarrow',
      message:{
        type: '',
        text: ''
      }
    }
    window.root = { //este objecto es accesible desde todos los componentes
      showMessage: function (type,text) {
        this.setState({
          message: {
            type:type,
            text:text
          }
        })
      }.bind(this),
      hideMessage: function () {
        this.setState({
          message: {
            type:'',
            text:''
          }
        })
      }.bind(this)
    }
  }
  openSideNav(){
    if (this.state.sideNavOpen) {
      this.setState({
        sideNavOpen: false,
        contentClassName: 'content animated contentNarrow'
      });
    }else{
      this.setState({
        sideNavOpen: true,
        contentClassName: 'content animated contentWide'
      });
    }
    PubSub.publish('products', this.props.name);
  }
  render() {
    return (
      <Router>
        <div>
          <Snackbar tipo={this.state.message.type} texto={this.state.message.text} duration="6" />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" render={() => {
              return (
                <div>
                  <Navbar onmenu={this.openSideNav.bind(this)} />
                  <Sidenav open={this.state.sideNavOpen} />
                  <div className={this.state.contentClassName}>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/asistentes-virtuales" component={AsistentesVirtuales} />
                    <Route exact path="/cerrar-sesion" component={CerrarSesion} />
                    <Route exact path="/pruebas" component={Pruebas} />
                  </div>
                  {  !Cookie.get('TOKEN') ? <Redirect to="/login"/> : null }
                </div>
                )
            }}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
