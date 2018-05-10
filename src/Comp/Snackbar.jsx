import React, {Component} from 'react';

export default class Snackbar extends Component{
	constructor(props){
		super(props);
		this.state = {
			className: 'snackbar animated',
			texto: '',
			type:''
		}
		this.colors = {
			error:'red',
			success:'green',
			warning:'yellow'
		}
	}
	showMessage = function (props) {
		this.setState({className:'snackbar animated snackbarDown',texto:props.texto,type:props.tipo});
		setTimeout(function() {
			this.setState({className:'snackbar animated snackbarUp'});
		}.bind(this), parseInt(this.props.duration, 10)*1000);
		setTimeout(function() {
			this.setState({texto:''});
			window.root.hideMessage();
		}.bind(this), parseInt(this.props.duration, 10)*1000+1000);
	}
	componentWillReceiveProps(props){
		if (props.texto !== '') {
			this.showMessage(props);
		}
	}
	render(){
		return (
			<div className={this.state.className}>
				<div className={"card " + this.colors[this.state.type]}>
					<div className="card-content white-text">{this.state.texto}</div>
				</div>
			</div>
		)
	}
}