const KEY = '30e0998514534ac2bc52f1179805fbfd'

const btn = document.querySelector('button');
const input = document.querySelector('input');

btn.innerText = 'Search'
btn.addEventListener('click', search)

const currentde = document.getElementById('current-description');
const currentte = document.getElementById('current-temp');
const currentwi = document.getElementById('current-wind');
const currenthu = document.getElementById('current-humidity');
const currentWeatherIcon = document.getElementById('current-weather-icon');

const errorMessage = document.getElementById('error-message');

function search () {
    clearDisplay();
    let city = input.value;
    
    getCurrentWeather(city);
}

function getCurrentWeather (city) {

    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${KEY}&include=minutely&lang=sv`
    


    fetch(url).then(
        function (response) {

            if(response.status>=200 && response.status<300){
                return response.json();
            }
            else{
                displayError(response.status);
                throw 'Error: ' + response.status;

            }
        }
    )
    .then(
        function (data) {
            displayCurrentWeather(data)
            return data;
        }
    ).catch (
        function () {
            displayError();
        }
    )
}


function displayCurrentWeather(currentWeather) {
    console.log(currentWeather);

    currentde.innerText = `${currentWeather.data[0].weather.description}`
    currentte.innerText = `Temperatur: ${Math.round(currentWeather.data[0].temp)}`;
    currentwi.innerText = `Vindhastighet: ${Math.round(currentWeather.data[0].wind_spd)};`
    currenthu.innerText = `Luftfuktighet: ${Math.round(currentWeather.data[0].rh)}`;

    const icon = currentWeather.data[0].weather.icon;
    currentWeatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`
}



function displayError (){
    errorMessage.innerText = "City not found."

}

function clearDisplay () {
    errorMessage.innerText = "";
}