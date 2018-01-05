var container = document.getElementById('unix-time');
setInterval(function() {
	container.innerHTML = Math.round(Date.now() / 1000);
}, 1000)

