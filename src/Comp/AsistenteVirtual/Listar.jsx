import React, { Component } from 'react';
import Api from '../../js/Api.js';
import Loading from '../Common/Loading.jsx';
import SweetAlert from 'sweetalert2-react';

export default class Listar extends Component{
	constructor(props){
		super(props);
		this.state = {
			showAlert: false,
			dataDelete: {},
			asistentes: []
		}
	}
	componentDidMount(){
		this.toggle(this.props.show);
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
		this.setState({dataDelete:{}});
	}
	delete(id, e) {
		var data = new FormData();
		data.append('id', id);
		this.setState({dataDelete:data});	
		this.setState({showAlert:true});	
	}
	edit(id, e) {
		this.props.handlerEdit(id);
	}
	confirmDelete() {
		this.setState({showAlert:false});	
		this.setState({loading:true});
		Api.post('/bots/delete',this.state.dataDelete,true)
		.then(function (data) {
			if (data.error) {
				window.location = '/cerrar-sesion';
			}
			this.setState({dataDelete:{}});
			this.setState({loading:false});
			this.props.handlerSubmit();
		}.bind(this))
	}
	render(){
		return (
			  <div className={this.state.className}>
			  		<Loading loading={this.state.loading}></Loading>
					<div className="col s12">
						<table className="responsive-table">
							<thead>
								<tr className="cognitiva-blue">
									<th>Nombre</th>
									<th>Usuario</th>
									<th>Password</th>
									<th>Workspace ID</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.props.asistentes.map((el,index) => {
									return (
											<tr key={el.id}>
												<td>{el.nombre}</td>
												<td>{el.usuario}</td>
												<td>{el.password}</td>
												<td>{el.workspace_id}</td>
												<td>
													<button className="transparent deleteButton" onClick={(e)=>this.edit(el.id, e)}>
														<span><i className="material-icons">edit</i></span>
													</button>
													<button className="transparent deleteButton" onClick={(e)=>this.delete(el.id, e)}>
														<span><i className="material-icons">delete</i></span>
													</button>
												</td>
											</tr>
										)
								})}
							</tbody>
						</table>
					</div>
					<SweetAlert
					    show={this.state.showAlert}
					    title="Eliminar asistente"
					    type='warning'
					    text="¿Seguro que deseas eliminar el asistente?"
					    showCancelButton={true}
					    cancelButtonText='Cancelar'
					    confirmButtonColor='#d33'
					    confirmButtonText='Eliminar'
					    onConfirm={() => this.confirmDelete() }
					    onCancel={() => this.setState({ showAlert: false }) }
					 />
				</div>
		)
	}
}




