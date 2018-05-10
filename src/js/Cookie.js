const Cookie = {
	get: function (name) {
	    name += "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) === 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return false;
	},
	set: function  (name,value,exp = 24) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exp * 60 * 60 * 1000));
	    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
	},
	del: function (name) {
		this.set(name,'',-24);
	}
}

module.exports = Cookie;