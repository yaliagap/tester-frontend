import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Cookie from '../js/Cookie.js';
import Api from '../js/Api.js';

 class CerrarSesion extends Component{
 	constructor(props){
 		super(props);
 		Api.post('/logout', {}, true)
 		.then(function (data) {
	 		Cookie.del('TOKEN');
	 		this.props.history.push('/login')
 		}.bind(this),function (data) {
 			Cookie.del('TOKEN');
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