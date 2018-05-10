import React , {Component} from 'react';

export default class Loading extends Component{
	constructor(props){
		super(props);
		this.state={className:'valign-wrapper loading'};
	}
	componentDidMount(){
		this.toggle(this.props.loading);
	}
	componentWillReceiveProps(p){
		this.toggle(p.loading);
	}
	toggle(loading){
		if (loading===true) {
			this.setState({className:'valign-wrapper loading'})
		}else{
			this.setState({className:'valign-wrapper loading hide'})
		}
	}

	render(){
		return (
				<div className={this.state.className}>
					<div className="center-align">
						<div className=" preloader-wrapper big active ">

				      <div className="spinner-layer spinner-blue">
				        <div className="circle-clipper left">
				          <div className="circle"></div>
				        </div><div className="gap-patch">
				          <div className="circle"></div>
				        </div><div className="circle-clipper right">
				          <div className="circle"></div>
				        </div>
				      </div>

				      <div className="spinner-layer spinner-red">
				        <div className="circle-clipper left">
				          <div className="circle"></div>
				        </div><div className="gap-patch">
				          <div className="circle"></div>
				        </div><div className="circle-clipper right">
				          <div className="circle"></div>
				        </div>
				      </div>

				      <div className="spinner-layer spinner-yellow">
				        <div className="circle-clipper left">
				          <div className="circle"></div>
				        </div><div className="gap-patch">
				          <div className="circle"></div>
				        </div><div className="circle-clipper right">
				          <div className="circle"></div>
				        </div>
				      </div>

				      <div className="spinner-layer spinner-green">
				        <div className="circle-clipper left">
				          <div className="circle"></div>
				        </div><div className="gap-patch">
				          <div className="circle"></div>
				        </div><div className="circle-clipper right">
				          <div className="circle"></div>
				        </div>
				      </div>

				    </div>
					</div>
	      </div>
			)
	}
}