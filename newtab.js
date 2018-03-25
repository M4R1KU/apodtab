var API_KEY = 'xIzkrseZNgpS0qsCZZwomBsofc9I5e0FUl3GAjvH';
var startDate = new Date();
startDate.setDate(startDate.getDate() - 15);
var dateString = startDate.toISOString();
var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&start_date=' + dateString.slice(0, dateString.indexOf('T'));

var container = document.getElementById('unix-time');
setInterval(function () {
    container.innerHTML = new Date().toLocaleTimeString();
}, 1000);

var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var resp = JSON.parse(xmlHttpRequest.responseText);
        var randomImage = resp[Math.round(Math.random() * 5)];

        if (randomImage['media_type'] === 'image') {
            var imageUrl = randomImage['hdurl'] !== undefined ? randomImage['hdurl'] : randomImage['url'];
            document.getElementById('apod-wrapper').setAttribute('style', 'background-image: url(' + imageUrl + ');');
        } else if (randomImage['media_type'] === 'video') {
            var video = document.createElement('iframe');
            video.setAttribute('src', randomImage['url'] + (randomImage['url'].includes('?') ? '&' : '?') + 'autoplay=1');
            video.setAttribute('width', window.innerWidth);
            video.setAttribute('height', window.innerHeight);
            document.getElementById('apod-wrapper').appendChild(video);

            try {
                video.mute();
            } catch (e) {
            }
        } else {
            console.warn('Unknown media type: ' + randomImage['media_type']);
        }

        document.getElementById('info-title').innerText = randomImage['title'];
        document.getElementById('info-text').innerText = randomImage['explanation'];
        document.getElementById('info-copyright').innerHTML = '&copy; ' + randomImage['copyright'];

        var title = document.createElement('h3');
        title.appendChild(document.createTextNode(new Date(randomImage['date']).toLocaleDateString()));
        document.getElementById('title').appendChild(title);
    }
};
xmlHttpRequest.open('GET', apiUrl);
xmlHttpRequest.send();

