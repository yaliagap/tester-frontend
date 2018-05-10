import React, { Component } from 'react';

export default class Navbar extends Component{
	componentDidMount(){
		window.M.AutoInit();
	}
	render(){
		return (
			  <div>
			   <div className="input-field col s12">
	            <select defaultValue="">
	              <option value="" disabled >Choose your option</option>
	              <option value="1">Option 1</option>
	              <option value="2">Option 2</option>
	              <option value="3">Option 3</option>
	            </select>
	            <label>Materialize Select</label>
	          </div>
			  </div>
			)
	}
}