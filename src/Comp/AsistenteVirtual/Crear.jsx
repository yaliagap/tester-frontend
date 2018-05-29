import React, { Component } from 'react';
import Api from '../../js/Api.js';
import Loading from '../Common/Loading.jsx';
import M from 'materialize-css/dist/js/materialize.min.js';

export default class Crear extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}
	componentDidMount(){
		this.toggle(this.props.show);
		M.updateTextFields();
	}
	toggle(show){
		if (show===true) {
			this.setState({className:'row'})
		}else{
			this.setState({className:'row hide'})
		}
	}
	componentWillReceiveProps(nextProps) {
		this.toggle(nextProps.show);
	}
	save(e){
		var data = new FormData();
		data.append('nombre', this.nombre.value);
		data.append('username', this.username.value);
		data.append('password', this.password.value);
		data.append('variable', this.variable.value);
		data.append('workspace_id', this.workspace_id.value);
		this.setState({loading:true});
		Api.post('/bots/save',data,true)
		.then(function (data) {
			if (data.error) {
				if (data.errorType && data.errorType == "AUTH") {
					window.location = '/cerrar-sesion';
				}
				window.root.showMessage('error',data.error);
			} else {
				this.nombre = "";
				this.username = "";
				this.password = "";
				this.workspace_id = "";
				this.variable = "";
				this.props.handlerSubmit(e);
				document.getElementById("crearAsistente").reset();
			}
			this.setState({loading:false});	
		}.bind(this))
		e.preventDefault();
	}
	render(){
		return (
			  <div className={this.state.className}>
			    <form id="crearAsistente" className="col s10 push-s1" onSubmit={this.save.bind(this)}>
			      <Loading loading={this.state.loading}></Loading>
			      <div className="row">
			        <div className="input-field col s12 cognitiva-color">
		          	  <input id="nombre" name="nombre" type="text" ref={(ref) => { this.nombre = ref; }} />
					  <label htmlFor="nombre">Nombre</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="username" name="username" type="text" ref={(ref) => { this.username = ref; }} />
					  <label htmlFor="username">Usuario</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="password" name="password" type="text" ref={(ref) => { this.password = ref; }} />
					  <label htmlFor="password">Password</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="workspace_id" name="workspace_id" type="text" ref={(ref) => { this.workspace_id = ref; }} />
					  <label htmlFor="workspace_id">Workspace ID</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="variable" name="variable" type="text" ref={(ref) => { this.variable = ref; }} defaultValue="case" />
					  <label htmlFor="variable">Variable de Contexto (Se comparará al momento de correr las pruebas)</label>
				  	</div>
					<div className="input-field col s12">
					  <button className="btn-large waves-effect waves-light cognitiva-blue" type="submit" name="action">Agregar Asistente</button>
	    			</div>
				  </div>
			    </form>
			  </div>
		)
	}
}
