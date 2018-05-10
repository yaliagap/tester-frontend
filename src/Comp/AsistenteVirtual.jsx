import React, { Component } from 'react';

export default class AsistenteVirtual extends Component{
	render(){
		return (
			<div className="asistente-virtual">
				<iframe 
					title="Asistente Virtual"
					src="//pi-innova-uat1.mybluemix.net/ConversationAnalytics/webapp" 
					frameBorder="0"
				></iframe>
	  		</div>
		)
	}
}