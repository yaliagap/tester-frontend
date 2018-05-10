import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch} from "react-router-dom";
//estilos
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css';
import 'animate.css/animate.min.css'

//componentes
import Login from './Comp/Login.jsx';
import Navbar from './Comp/Navbar.jsx';
import Main from './Comp/Main.jsx';
import Test from './Comp/Test.jsx';
import Sidenav from './Comp/Sidenav.jsx';
import AsistenteVirtual from './Comp/AsistenteVirtual.jsx';
import CerrarSesion from './Comp/CerrarSesion.jsx';
import Snackbar from './Comp/Snackbar.jsx';
import Parametros from './Comp/Parametros.jsx';
import Parametro from './Comp/Parametro.jsx';
import Citas from './Comp/Citas.jsx';

//librerias propias 
import Cookie from './js/Cookie.js';

class App extends Component {
  constructor(props){
    super(props);
    window.M = M;

    document.title = 'Innova PI System';
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
                    <Route exact path="/asistente-virtual" component={AsistenteVirtual} />
                    <Route exact path="/citas" component={Citas} />
                    <Route exact path="/cerrar-sesion" component={CerrarSesion} />
                    <Route exact path="/parametros" component={Parametros} />
                    <Route exact path="/parametro/:id" component={Parametro} />
                    <Route exact path="/test" component={Test} /> 
                  </div>
                  {  !Cookie.get('TOKEN2') ? <Redirect to="/login"/> : null }
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
