const apiKey = '9091d9c863d5f603762a78143708e369'; 

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeather, showError);
    } else {
        document.getElementById("description").innerHTML = "Геолокация не поддерживается этим браузером.";
    }
}

function fetchWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Ошибка получения данных о погоде:', error);
        });
}


function displayWeather(data) {


    const iconCode = data.weather[0].icon;
  
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    document.getElementById("description").innerHTML = `
    <div class="container-info">
    <div class="temp_desc">
    
    <p class="temp" > ${data.main.temp}°C</p>
    <p class="description">   ${data.weather[0].description}</p>
    </div>


   
                 <div class="box_wind">
 
                 <p class="humidity"><i class="fa-solid fa-water"></i> ${data.main.humidity}% <br> humidity</p>

                 <p class="wind"> <i class="fa-solid fa-wind"></i> <br>${data.wind.speed}Km/h <br> Wind Speed</p>
                 </div>
 
 </div>
    `;
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = 'block';
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("description").innerHTML = "Пользователь отказался от предоставления геолокации.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("description").innerHTML = "Информация о местоположении недоступна.";
            break;
        case error.TIMEOUT:
            document.getElementById("description").innerHTML = "Запрос на получение местоположения превысил лимит времени.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("description").innerHTML = "Произошла неизвестная ошибка.";
            break;
    }
}



 function getWeatherInput() {
    const inputCity = document.getElementById('city').value;
  
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {

            const weatherResult = document.getElementById('description');
            if (data.cod === 200) {
                weatherResult.innerHTML = `
<div class="container-info">
   <div class="temp_desc">
   
   <p class="temp" > ${data.main.temp}°C</p>
   <p class="description"> ${data.weather[0].description}</p>
   </div>
                <div class="box_wind">

                <p class="humidity"><i class="fa-solid fa-water"></i> ${data.main.humidity}% <br> humidity</p>
                <p class="wind"> <i class="fa-solid fa-wind"></i> <br>${data.wind.speed}Km/h <br> Wind Speed</p>
                </div>

</div>
                `;
            } else {
                weatherResult.innerHTML = `<p>Город не найден!</p>`;
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
        
};