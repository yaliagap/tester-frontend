import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import {HorizontalBar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import PubSub from 'pubsub-js';
import ReactTable from "react-table";

export default class Listar extends Component{
	constructor(props){
		super(props);
		this.state = {}
	}
	componentWillMount() {
	    this.subscriptionSidebar = PubSub.subscribe('products', (topic, product) => {
			var el = document.getElementById('tabs');
			for(var i = 1; i < 22; i ++) {
				setTimeout(function() {
					M.Tabs.init(el, {});
				}, i*50)
			}
	    });
		Chart.pluginService.register({
		  beforeDraw: function (chart) {
		    if (chart.config.options.elements.center) {
		      var ctx = chart.chart.ctx;
		      var centerConfig = chart.config.options.elements.center;
		      var fontStyle = centerConfig.fontStyle || 'Arial';
		      var txt = centerConfig.text;
		      var color = centerConfig.color || '#000';
		      var sidePadding = centerConfig.sidePadding || 20;
		      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
		      ctx.font = "30px " + fontStyle;
		      var stringWidth = ctx.measureText(txt).width;
		      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
		      var widthRatio = elementWidth / stringWidth;
		      var newFontSize = Math.floor(30 * widthRatio);
		      var elementHeight = (chart.innerRadius * 2);
		      var fontSizeToUse = Math.min(newFontSize, elementHeight);
		      ctx.textAlign = 'center';
		      ctx.textBaseline = 'middle';
		      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
		      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
		      ctx.font = fontSizeToUse+"px " + fontStyle;
		      ctx.fillStyle = color;
		      ctx.fillText(txt, centerX, centerY);
		    }
		  }
		});
	}
	componentWillUnmount() {
	    PubSub.unsubscribe(this.subscriptionSidebar);
	}
	componentDidMount(){
		this.toggle(this.props.show);
	}
	toggle(show){
		if (show===true) {
			this.setState({className:'row'})
			setTimeout(function() {
				var el = document.getElementById('tabs');
				M.Tabs.init(el, {});
			}, 20);
		} else {
			this.setState({className:'row hide'})
		}
	}
	componentWillReceiveProps(nextProps) {
		this.toggle(nextProps.show);
	}
	render(){
		return (
			<div className={this.state.className} >
				<div className="col s12">
			      <ul id="tabs" className="tabs cognitiva-tabs">
			        <li className="tab col s3"><a className="active" href="#estadisticas">Estadísticas</a></li>
			        <li className="tab col s3"><a href="#listado">Listado</a></li>
			      </ul>
		    	</div>
		    	<div id="estadisticas" className="col s12">
				    <br />
				    <br />
				    <div className="row">
				    	<div className="col s6">
				    		<Doughnut data={this.props.doughnutData} options={this.props.doughnutOptions} />
				    	</div>
				    	<div className="col s6" style={{"min-height": this.props.height+"px"}}>
				    		<HorizontalBar data={this.props.chartData} options={this.props.chartOptions}/>
				    	</div>
					</div>
				</div>
				<div id="listado" className="col s12">
				    <br/>
				    <ReactTable
			          data={this.props.results}
			          pageSize={this.props.results.length}
			          filterable
			          columns={[
			            {
			              Header: "Resultado",
			              accessor: "resultadoClass",
			              filterMethod: (filter, row) => {
		                    if (filter.value === "all") {
		                      return true;
		                    }
		                    return row.resultadoClass == filter.value;
		                  },
		                  Filter: ({ filter, onChange }) =>
		                  	<div className="cognitiva-color">
		                    <select
		                      onChange={event => onChange(event.target.value)}
		                      style={{ width: "100%" }}
		                      value={filter ? filter.value : "all"}
		                    >
		                      <option value="all">Todos</option>
		                      <option value="correct">Correctos</option>
		                      <option value="incorrect">Incorrectos</option>
		                    </select>
		                    </div>
			            },
			            {
			              Header: "Conversation Id",
			              accessor: "conversation_id"
			            },
			            {
			              Header: "Mensaje",
			              accessor: "u"
			            },
			            {
			              Header: "Respuesta",
			              accessor: "b"
			            },
			            {
			              Header: "Esperado",
			              accessor: "esperado"
			            }
			          ]}
			          showPagination={false}
			          minRows={3}
			          loadingText='Cargando...'
  					  noDataText='No se encontraron registros'
			          className="-striped -highlight"
			        />
			        <br/>
			        <br/>
				</div>
			  </div>
		)
	}
}