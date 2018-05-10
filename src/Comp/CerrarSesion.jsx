import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Cookie from '../js/Cookie.js';
import Api from '../js/Api.js';

 class CerrarSesion extends Component{
 	constructor(props){
 		super(props);
 		Api.post('/security/logout')
 		.then(function (data) {
	 		Cookie.del('TOKEN1');
	 		Cookie.del('TOKEN2');
	 		this.props.history.push('/login')
 		}.bind(this),function (data) {
 			console.error(data);
 			Cookie.del('TOKEN1');
	 		Cookie.del('TOKEN2');
	 		this.props.history.push('/login')
 		}.bind(this))
 	}
	render(){
		return (
			<div>
				<em>Cerrando Sesión...</em>
			</div>
		)
	}
}

export default withRouter(CerrarSesion)