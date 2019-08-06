import Cookie from './Cookie.js';

const Api = {
	url: 'http://localhost:4000',
	serialize: function(obj){
		var str = [];
		for (var p in obj){
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		if (str.length===0) {
			return null;
		}else{
			return str.join("&");
		}
	},
	request: function (type,service,params={},auth=true) {
		return new Promise(function (resolve,reject) {
			var x = new XMLHttpRequest();
		    x.onreadystatechange = function() { 
		      if (x.readyState === 4 && x.status === 200){
		        resolve(JSON.parse(x.responseText));
		      }else if (x.readyState === 4 && x.status === 204){
		      	resolve()
		      }else if (x.readyState === 4) {
		      	console.log("gello");
		      	console.log(x);
		      	console.log(x.responseText)
		      	//if (reject) {reject(JSON.parse(x.responseText))}
		      	if (reject) {reject(x.responseText)}
		      	//window.root.showMessage('error',JSON.parse(x.responseText).error.descripcion)
		      }
		    }
		    x.open(type, Api.url+service, true); // true for asynchronous 
		    if (auth) {
		    	x.setRequestHeader('Authorization','Bearer ' + Cookie.get('TOKEN'));
		    }
		    //x.setRequestHeader('Content-Type', 'application/json');
		    //x.setRequestHeader('Content-Type', 'multipart/form-data');
		    //x.send(JSON.stringify(params));
		    x.send(params);
		});
	},
	get: function (service,auth=true) {
		return Api.request('GET',service,{},auth);
	},
	post: function (service,params={},auth=true) {
		return Api.request('POST',service,params,auth);
	},
	put: function (service,params={},auth=true) {
		return Api.request('PUT',service,params,auth);
	}
}

export default  Api;