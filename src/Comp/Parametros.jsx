import React, { Component } from 'react';
import Api from '../js/Api.js';
import {Link} from 'react-router-dom';

import Loading from './Loading.jsx';

export default class Parametros extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:[],
			sortKey:'llave',
			order:'ASC'
		};
	}
	componentDidMount(){
		this.getData();
		this.sort();
	}
	sort(e){
		let sortKey = e ? e.target.id : 'llave' 
		this.setState({
			order: (this.state.order==='ASC') ? 'DESC':'ASC',
			sortKey: sortKey,
			data: this.state.data.sort((a,b) => {
				let out = a[sortKey].toLowerCase().localeCompare(b[sortKey].toLowerCase());
				if (this.state.order==='ASC') {
					return -1*out
				}
				return out
			})
		})
	}
	getData(e){
		this.setState({loading:true})
		Api.get('/parametros/parametros')
		.then(function (data) {
			console.log(data)
			this.setState({loading:false,data:data})
			this.sort()
		}.bind(this))

	}
	render(){
		return (
			<div className="parametros card">
				<Loading loading={this.state.loading}></Loading>

				<div className="card-content">
					<div className="right-align">
						<button onClick={this.getData.bind(this)} className=" waves-effect waves-light btn-flat">
							<i className="material-icons left">refresh</i>
							Recargar
						</button>
					</div>
					<h4>Parámetros</h4>
				</div>
				<table className="striped highlight responsive-table">
					<thead>
						<tr>
							<th>
								<button className="btn-flat" id="llave" onClick={this.sort.bind(this)}>
									{this.state.sortKey==='llave' ? (
										<i className={this.state.order==='ASC'? 'material-icons right flip':'material-icons right'} id="llave">sort</i>
									):null}
									LLAVE
								</button>
							</th>
							<th>
								<button className="btn-flat" id="valor" onClick={this.sort.bind(this)}>
									{this.state.sortKey==='valor'?(
										<i className={this.state.order==='ASC'? 'material-icons right flip':'material-icons right'} id="valor">sort</i>
									):null}
									VALOR
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(function (val,index){
							return (
								<tr key={val.id}>
									<td>{val.llave}</td>
									<td>{val.valor}</td>
									<td>
										<Link to={"/parametro/"+val.id}>
											<span className="material-icons">edit</span>
										</Link>
									</td>
								</tr>
								)
						})}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tfoot>
				</table>
	  	</div>
		)
	}
}