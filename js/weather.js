let appId = 'cb576d7f9f13da319f418114a401f91a';
let units = 'metric';
let searchMethod = 'q';

function searchWeather(searchTerm) {
    fetch(
            `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
        )
        .then(result => {
            return result.json();
        })
        .then(res => {
            init(res);
        });
}

function init(resultFromServer) {
    localStorage.setItem('City', JSON.stringify(resultFromServer));
    let localCity = JSON.parse(localStorage.getItem('City'));
    document.getElementById('tempr').innerHTML = `${localCity.main.temp}°`;
    document.getElementById('weather_header').innerHTML = localCity.name;

    document.getElementById('humid').innerHTML = `Humidity:  ${
      localCity.main.humidity
   }%`;
    document.getElementById('windspeed').innerHTML = `WindSpeed:  ${
      localCity.wind.speed
   }mph`;
    document.getElementById('descp').innerHTML =
        resultFromServer.weather[0].description;
    let weatherIcon = document.getElementById('icon');
    weatherIcon.src =
        'http://openweathermap.org/img/w/' +
        resultFromServer.weather[0].icon +
        '.png';
    document.getElementById('weather').style.border = '1px solid black';
    document.getElementById('weather').style.width = '40%';

    document.getElementById('weather').style.marginLeft = '30%';
    document.getElementById('weather').style.marginTop = '5%';
    document.getElementById('weather').style.backgroundColor = 'white';
    document.getElementById('weather_header').style.backgroundColor =
        'rgba(31, 2, 65, 0.877)';
    document.getElementById('weather_footer').style.backgroundColor =
        'rgb(61, 107, 109)';
    document.getElementById('weather_footer').style.borderTop =
        'rgba(31, 2, 65, 0.877)';
    document.getElementById('weather_body').style.backgroundColor =
        'rgba(89, 108, 133, 0.582)';
}

document.getElementById('search_btn').addEventListener('click', () => {
    let searchTerm = document.getElementById('search_city').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
});
document.addEventListener('keypress', e => {
    if (e.keyCode == 13) {
        let searchTerm = document.getElementById('search_city').value;
        if (searchTerm) {
            searchWeather(searchTerm);
        }
    }
});