let API_KEY = 'xIzkrseZNgpS0qsCZZwomBsofc9I5e0FUl3GAjvH';
let startDate = new Date();
startDate.setDate(startDate.getDate() - 5);
let dateString = startDate.toISOString();
let apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&start_date=' + dateString.slice(0, dateString.indexOf('T'));

let apodWrapper = document.getElementById('apod-wrapper');
let infoTitle = document.getElementById('info-title');
let infoText = document.getElementById('info-text');
let info = document.getElementById('info');
let content = document.getElementById('info-content');
let infoCopyright = document.getElementById('info-copyright');
let infoTitleContainerHeight = document.getElementById('info-title-container').scrollHeight;

let time = document.getElementById('time');

setInterval(function () {
    time.innerHTML = new Date().toLocaleTimeString();
}, 1000);
let xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.onreadystatechange = function () {

    if (this.readyState === 4 && this.status === 200) {
        let resp = JSON.parse(xmlHttpRequest.responseText);
        let randomImage = resp[Math.round(Math.random() * 5)];
        if (randomImage['media_type'] === 'image') {
            let imageUrl = randomImage['hdurl'] !== undefined ? randomImage['hdurl'] : randomImage['url'];
            apodWrapper.setAttribute('style', 'background-image: url(' + imageUrl + ');');
        } else if (randomImage['media_type'] === 'video') {
            let video = document.createElement('iframe');
            video.setAttribute('src', randomImage['url'] + (randomImage['url'].includes('?') ? '&' : '?') + 'autoplay=1');
            video.setAttribute('width', window.innerWidth);
            video.setAttribute('height', window.innerHeight - infoTitleContainerHeight);
            apodWrapper.appendChild(video);
            try {
                video.mute();
            } catch (e) {
            }
        } else {
            console.warn('Unknown media type: ' + randomImage['media_type']);
        }

        infoTitle.innerText = randomImage['title'];
        infoText.innerText = randomImage['explanation'];
        console.log(randomImage['copyright']);
        if (randomImage['copyright'] !== undefined) {
            infoCopyright.innerHTML = '&copy; ' + randomImage['copyright'];
        } else {
            infoText.style.paddingBottom = '16px';
        }

        let title = document.createElement('h3');
        title.appendChild(document.createTextNode(new Date(randomImage['date']).toLocaleDateString()));
        document.getElementById('title').appendChild(title);
    }
};
xmlHttpRequest.open('GET', apiUrl);
xmlHttpRequest.send();

info.addEventListener('mouseenter', function () {
    content.style.height = content.scrollHeight + 'px';
});

info.addEventListener('mouseleave', function () {
    content.style.height = '0';
});
