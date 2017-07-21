function checkBeforeNodeLoaded(id, cb) {
  var si = setInterval(function() {
    var elementExists = document.querySelector(id);
    if (elementExists) {
      clearInterval(si);
      cb();
    }
  }, 0);
}

function loadWidget(name) {
  var sc = document.createElement('script');
  sc.setAttribute('src', '/widgets/' + name + '.js');
  document.head.appendChild(sc);
}

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
