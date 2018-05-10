import React, { Component } from 'react';
import Api from '../js/Api.js';
import {Link} from 'react-router-dom';
import Loading from './Loading.jsx';

export default class Parametro extends Component{
	constructor(props){
		super(props);
		this.state = {
			id:this.props.match.params.id,
			llave:'',
			valor:''
		}
	}
	componentWillMount(){
		this.getData();
	}
	getData(){
		this.setState({
			loading:true,
			llave:'',
			valor:''
		});
		window.M.updateTextFields();
		Api.get('/parametros/parametros/'+this.state.id)
		.then(function (data) {
			this.setState({
				loading:false,
				llave:data.llave,
				valor:data.valor
			})
			window.M.updateTextFields();
		}.bind(this))
	}
	save(){
		this.setState({loading:true})
		let s = this.state;
		Api.put('/parametros/parametros/'+s.id,{
			id:s.id,
			llave:s.llave,
			valor:s.valor
		})
		.then(function (data) {
			this.setState({loading:false})
			window.root.showMessage('success','Datos guardados exitosamente');
		}.bind(this))
	}
	handleChange (evt) {
		this.setState({ [evt.target.id]: evt.target.value });
	}
	render(){
		return (
			<div className="card">
				<Loading loading={this.state.loading}></Loading>
				<div className="card-content">
					<div className="right-align">
						<Link to="/parametros" className=" waves-effect waves-light btn-flat">
							<i className="material-icons left">list</i>
							Listar
						</Link>
						<button onClick={this.getData.bind(this)} className=" waves-effect waves-light btn-flat">
							<i className="material-icons left">refresh</i>
							Recargar
						</button>
					</div>
					<h4>Parametro: {this.state.id}</h4>
					<div className="row">
						<div className="input-field col s4">
				          	<input id="llave" type="text" value={this.state.llave} onChange={this.handleChange.bind(this)} />
				          	<label htmlFor="llave">Llave</label>
				        </div>
				    </div>
				    <div className="row">
						<div className="input-field col s4">
				          	<input id="valor" type="email" value={this.state.valor} onChange={this.handleChange.bind(this)} />
				          	<label htmlFor="valor">Valor</label>
				        </div>
					</div>
				</div>
				<div className="card-content grey lighten-3">
					<button onClick={this.save.bind(this)} className="waves-effect waves-light btn cyan"><i className="material-icons left">save</i> Guardar</button>
				</div>
			</div>
		)
	}
}