import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Api from '../js/Api.js';
import Cookie from '../js/Cookie.js';
import Loading from './Loading.jsx';

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading:false,
			username: '',
			password: ''
		}
    this.handleChange = this.handleChange.bind(this);
	}
	handleChange (evt) {
    this.setState({ [evt.target.id]: evt.target.value });
  }
	login(e){
		this.setState({loading:true})
		Api.post('/security/adminUsuario2?'+Api.serialize({correo:this.state.username,contrasena:this.state.password}),{},false)
		.then(function (data) {
			Cookie.set('TOKEN1',data.token);
			Api.get('/security/login/admin/'+data.token)
			.then(function (data) {
				Cookie.set('TOKEN2',data.token)
				this.setState({loading:false})
				this.props.history.push('/');
			}.bind(this));
		}.bind(this),function (data) {
			window.root.showMessage('error',data.error.descripcion);
			this.setState({loading:false});
		}.bind(this))
		e.preventDefault();
	}

	render(){
		return (
			<div className="login cyan">
				<div className="row">
					<div className="col s2 offset-s5">
						<form className="card" onSubmit={this.login.bind(this)}>
						<Loading loading={this.state.loading}></Loading>
							<div className="card-content">
								<p>Administrador</p><br/>
								<div className="row">
									<div className="input-field col s12">
					          <input id="username" type="email" className="validate" value={this.state.username} onChange={this.handleChange} />
					          <label htmlFor="username">Correo electrónico</label>
                    <span className="helper-text" data-error="Ingrese un correo electrónico válido"></span>
					        </div>
								</div>
								<div className="row">
									<div className="input-field col s12">
					          <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handleChange} />
					          <label htmlFor="password">Contraseña</label>
					        </div>
								</div>
								<button className="btn btn-block cyan waves-effect" type="submit" >INICIAR SESIÓN</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Login);