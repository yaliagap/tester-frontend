import React, { Component } from 'react';
import Api from '../../js/Api.js';
import Loading from '../Common/Loading.jsx';
import M from 'materialize-css/dist/js/materialize.min.js';

export default class Editar extends Component{
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
	handleChange(evt) {
    	this.setState({ [evt.target.id]: evt.target.value });
  	}
	componentWillReceiveProps(nextProps) {
		this.toggle(nextProps.show);
		M.updateTextFields();
		if (nextProps.botId != this.props.botId) {
			this.setState({username: ""});
			this.setState({nombre: ""});
			this.setState({password: ""});
			this.setState({workspace_id: ""});
			this.setState({variable: ""});
			Api.get('/bots/' + nextProps.botId,true)
			.then(function (data) {
				this.setState({username: data.usuario});
				this.setState({nombre: data.nombre});
				this.setState({password: data.password});
				this.setState({workspace_id: data.workspace_id});
				this.setState({variable: data.variable});
				M.updateTextFields();
			}.bind(this));
		}
	}
	update(e){
		var data = new FormData();
		data.append('id', this.props.botId);
		data.append('nombre', this.state.nombre);
		data.append('username', this.state.username);
		data.append('password', this.state.password);
		data.append('variable', this.state.variable);
		data.append('workspace_id', this.state.workspace_id);
		this.setState({loading:true});
		var botId = this.props.botId;
		Api.post('/bots/' + botId, data,true)
		.then(function (data) {
			if (data.error) {
				if (data.errorType && data.errorType == "AUTH") {
					window.location = '/cerrar-sesion';
				}
				window.root.showMessage('error',data.error);
			} else {
				this.props.handlerSubmit(e);
				document.getElementById("editarAsistente").reset();
			}
			this.setState({loading:false});	
		}.bind(this));
		e.preventDefault();
	}
	render(){
		return (
			  <div className={this.state.className}>
			    <form id="editarAsistente" className="col s10 push-s1" onSubmit={this.update.bind(this)}>
			      <Loading loading={this.state.loading}></Loading>
			      <div className="row">
			        <div className="input-field col s12 cognitiva-color">
		          	  <input id="nombre" name="nombre" type="text" onChange={this.handleChange.bind(this)} value={this.state.nombre} />
					  <label htmlFor="nombre">Nombre</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="username" name="username" type="text" onChange={this.handleChange.bind(this)} value={this.state.username} />
					  <label htmlFor="username">Usuario</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="password" name="password" type="text" onChange={this.handleChange.bind(this)} value={this.state.password} />
					  <label htmlFor="password">Password</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="workspace_id" name="workspace_id" type="text" onChange={this.handleChange.bind(this)} value={this.state.workspace_id} />
					  <label htmlFor="workspace_id">Workspace ID</label>
				  	</div>
				  	<div className="input-field col s12 cognitiva-color">
		          	  <input id="variable" name="variable" type="text" onChange={this.handleChange.bind(this)} value={this.state.variable} />
					  <label htmlFor="variable">Variable de Contexto (Se comparará al momento de correr las pruebas)</label>
				  	</div>
					<div className="input-field col s12">
					  <button className="btn-large waves-effect waves-light cognitiva-blue" type="submit" name="action">Editar Asistente</button>
	    			</div>
				  </div>
			    </form>
			  </div>
		)
	}
}
