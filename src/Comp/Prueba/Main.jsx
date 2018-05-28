import React, { Component } from 'react';
import Api from '../../js/Api.js';
import Download from './Download.jsx';
import Listar from './Listar.jsx';
import Crear from './Crear.jsx';

export default class Main extends Component{
	constructor(props){
		super(props);
		this.state = {
			results: [],
			asistentes: [],
			showCrear: true, 
			showListar: false, 
			listarClassName: "hide", 
			crearClassName: "hide",
			chartOptions: {},
			chartData: {},
		    doughnutOptions: {},
		    doughnutData: {},
		    height: 0
		}

		this.handlerSubmit = this.handlerSubmit.bind(this)
	}
	componentWillMount() {
		Api.get('/bots',true)
		.then(function (data) {
			if (data.error) {
				window.location = '/cerrar-sesion';
			} else {
				this.setState({asistentes:data});
			}
		}.bind(this));
	}
	create(e) {
		this.setState({"showCrear": true, "showListar": false, "crearClassName": "hide", "listarClassName": ""});
	}
	list(e) {
		this.setState({"showCrear": false, "showListar": true, "crearClassName": "", "listarClassName": "hide"});
	}
	handlerSubmit(e, results, percentage, percentagePerClass) {
		this.setState({
			doughnutData: {
			    datasets: [{
			        data: [percentage, 100-percentage],
			        backgroundColor: ["rgb(21, 116, 189)", "rgb(200, 200, 200)"]
			    }],
			    labels: [
			        'Correctas',
			        'Incorrectas'
			    ]
			}
		});
		this.setState({
			doughnutOptions: {
		    	title: {
		            display: true,
		            text: 'Porcentaje de Aciertos',
		            fontSize: 20
		        },
		        elements: {
			      center: {
			      text: ' '+ percentage + '%',
			      color: '#666666', //Default black
			      fontStyle: 'Helvetica', //Default Arial
			      sidePadding: 20 //Default 20 (as a percentage)
			    }
			  }
		    }
		});
		this.setState({
			chartData: {
				labels: percentagePerClass.classes,
				datasets: 
				[{
					label: "Correctas",
	                fillColor: "rgb(21, 116, 189)",
	                backgroundColor: "rgb(21, 116, 189)",
	                highlightFill: "rgb(21, 116, 189)",
	                highlightStroke: "rgb(21, 116, 189)",
	                data: percentagePerClass.correct
	            },
	            {
					label: "Incorrectas",
	                fillColor: "rgb(200, 200, 200)",
	                backgroundColor: "rgb(200, 200, 200)",
	                highlightFill: "rgb(200, 200, 200)",
	                highlightStroke: "rgb(200, 200, 200)",
	                data: percentagePerClass.incorrect
	            }]
		    }
		});
		this.setState({
			chartOptions: {
				maintainAspectRatio: false,
                responsive: true,
                title: {
		            display: true,
		            text: 'Porcentaje de Aciertos por Categoría',
		            fontSize: 20
		        },
		        scales: {
		            yAxes: [{
		            	stacked: true,
			          		ticks: {
			                	beginAtZero:true
			                },
		                scaleLabel: {
		                	display: true,
		                	labelString: "Categoría"
		                }
		            }],
		            xAxes: [{
		                stacked: true,
		                scaleLabel: {
		                	display: true,
		                	labelString: "Porcentaje de Aciertos (%)"
		                }
		            }]
		        }
            }
        });
		this.setState({height: 200 + percentagePerClass.classes.length*30});
		this.setState({results: results});
	    this.list(e);
		e.preventDefault();
	}
	render(){
		return (
			<div className="parametros card">
			  <div className="row card-content">
					<div className="col s6">
						<h4>Pruebas</h4>	
					</div>
					<div className="col s6 right-align">
						<div className={this.state.crearClassName}>
							<button className={"btn-floating btn-large waves-effect waves-light cognitiva-blue " + this.state.crearClassName}  onClick={this.create.bind(this)}>
								<i className="material-icons">add</i>
							</button> <Download data={this.state.results} />
						</div>
						<button className={"btn-floating btn-large waves-effect waves-light cognitiva-blue " + this.state.listarClassName}  onClick={this.list.bind(this)}>
							<i className="material-icons">format_list_numbered</i>
						</button>
					</div>
			  </div>
			  <Crear asistentes={this.state.asistentes} show={this.state.showCrear} handlerSubmit={this.handlerSubmit} />
			  <Listar results={this.state.results} show={this.state.showListar} handlerSubmit={this.handlerSubmit} chartOptions={this.state.chartOptions} chartData={this.state.chartData} doughnutOptions={this.state.doughnutOptions} doughnutData={this.state.doughnutData} height={this.state.height} />
			</div>
		)
	}
}