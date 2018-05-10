import React, { Component } from 'react';
import Api from '../js/Api.js';

export default class Citas extends Component {
	constructor(props){
		super(props);
		this.state = {data:[]}
	}
	componentWillMount() {
		//sort=["persona_contacto","ASC"]&range=[0,19]&filter={"nombres":"","primer_apellido":"","status_contacto":"","fechaCita":"","fechaCitaR":"","responsable":""}
		Api.get('/citas/listarCandidatoCita?sort=%5B%22persona_contacto%22%2C%22ASC%22%5D&range=%5B0%2C19%5D&filter=%7B%22nombres%22%3A%22%22%2C%22primer_apellido%22%3A%22%22%2C%22status_contacto%22%3A%22%22%2C%22fechaCita%22%3A%22%22%2C%22fechaCitaR%22%3A%22%22%2C%22responsable%22%3A%22%22%7D')
		.then((data) => {
			this.setState({data:data});
			console.log(data)
		})
	}
	render() {
		return (
			<div className="card citas">
				<div className="card-content">
					<h4>Citas</h4>
				</div>
					<table className="responsive-table">
						<thead>
							<tr className="cyan">
								<th>Resposable</th>
								<th>Dia de Cita</th>
								<th>Hora</th>
								<th>Stat.</th>
								<th>FTE Reclut.</th>
								<th>Nombres</th>
								<th>Primer Apellido</th>
								<th>Segundo Apellido</th>
								<th>Especialidad</th>
								<th>Sede</th>
								<th>Pers. Contacto</th>
								<th>Direc. Citacion</th>
								<th>Teléfono</th>
								<th>email</th>
								<th>Nº Citac.</th>
								<th>Observación</th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((el,index) => {
								return (
										<tr key={el.id}>
											<td>{el.responsable}</td>
											<td>{el.fecha_cita}</td>
											<td>{el.hora_cita}</td>
											<td>{el.status_contacto}</td>
											<td>{el.fuente_reclutamiento}</td>
											<td>{el.nombres}</td>
											<td>{el.primer_apellido}</td>
											<td>{el.segundo_apellido}</td>
											<td>{el.espcialidad}</td>
											<td>{el.sede_citacion}</td>
											<td>{el.persona_contacto}</td>
											<td>{el.direccion_citacion}</td>
											<td>{el.telefono}</td>
											<td>{el.correo}</td>
											<td>{el.nro_citacion}</td>
											<td>{}</td>
											<td></td>
										</tr>
									)
							})}
						</tbody>
					</table>
				
			</div>
		);
	}
}
