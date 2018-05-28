import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import Api from '../../js/Api.js';
import Loading from '../Loading.jsx';

export default class Crear extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}
	componentWillMount() {
		
	}
	componentDidMount(){
		this.toggle(this.props.show);
    	var elems = document.querySelectorAll('select');
    	var instances = M.FormSelect.init(elems, {});
	}
	componentDidUpdate() {
		var elems = document.querySelectorAll('select');
    	var instances = M.FormSelect.init(elems, {});
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
	test(e){
		var data = new FormData();
		var file = this.uploadInput.files[0];
		data.append('testcsv', file);
		data.append('bot', this.bot.value);
		console.log(this.bot);
		this.setState({loading:true});
		Api.post('/resultsjson',data,true)
		.then(function (data) {
			var resultsList = [];
			var percentage = [];
			var percentagePerClass = [];
			if (data) {
				if (data.error) {
					if (data.errorType && data.errorType == "AUTH") {
						window.location = '/cerrar-sesion';
					}
					window.root.showMessage('error',data.error);
				} else if (data.results) {
					percentage = data.results.percentage;
					percentagePerClass = data.results.percentagePerClass;
					resultsList = data.results.list;
					this.bot = "";
					this.uploadInput = "";
					this.props.handlerSubmit(e, resultsList, percentage, percentagePerClass);
					document.getElementById("crearPrueba").reset();
				}
			} else {
				this.bot = "";
				this.uploadInput = "";
				document.getElementById("crearPrueba").reset();
			}
			this.setState({loading:false});
		}.bind(this),function (data) {
			window.root.showMessage('error',"Verifique haber llenado todos los campos correctamente");
			this.bot = "";
			this.uploadInput = "";
			this.setState({loading:false});
			document.getElementById("crearPrueba").reset();
		}.bind(this));
		e.preventDefault();
	}
	render(){
		return (
			  <div className={this.state.className}>
			    <form id="crearPrueba" className="col s10 push-s1" onSubmit={this.test.bind(this)}>
			      <Loading loading={this.state.loading}></Loading>
			      <div className="row">
			        <div className="input-field col s12 cognitiva-color">
		          	  <select id="bot" name="bot" ref={(ref) => { this.bot = ref; }}>
					    <option value="" selected>Selecciona un Asistente</option>
					    {this.props.asistentes.map((el,index) => {
							return (
								<option value={el.id}>{el.nombre}</option>
								)
						})}					    
					  </select>
				  	</div>
				  	<div className="input-field col s12">
					  <div className="file-field input-field">
					    <div className="btn cognitiva-blue">
					        <span><i className="material-icons">file_upload</i></span>
					        <input id="testcsv" name="testcsv" type="file" ref={(ref) => { this.uploadInput = ref; }} />
					      </div>
					      <div className="file-path-wrapper">
					        <input className="file-path validate" type="text" placeholder="Archivo de pruebas"/>
					    </div>
					  </div>
					</div>
					<div className="input-field col s12">
					  <button className="btn-large waves-effect waves-light cognitiva-blue" type="submit" name="action">Ejecutar Pruebas</button>
	    			</div>
				  </div>
			    </form>
			 </div>
		)
	}
}
