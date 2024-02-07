const addInput = document.querySelector("#add").querySelector("input")
const addBtn = document.querySelector("#add").querySelector("button")
const errorInfo = document.querySelector("#addingError")
const weatherContainer = document.querySelector("#weatherContainer")

const apiKey = "249787baa3b052ab7b3bbe37c0fbd74d"
const citiesStorage = "weather"

renderCitiesFromStorage()

setInterval(async () => {
    await updateWeatherData()
    renderCitiesFromStorage()
}, 1000 * 60 * 5)

addBtn.addEventListener("click", async () => {
    errorInfo.textContent = ""
    let city = addInput.value
    let cityCoordinates
    let cityWeather
    try { cityCoordinates = await fetchCityCoordinates(city) }
    catch (e) {
        errorInfo.textContent = "City not found"
        return
    }
    try { cityWeather = await fetchWeatherData(cityCoordinates.lat, cityCoordinates.lon) }
    catch (e) {
        errorInfo.textContent = `Error while fetching weather data for city: ${city}`
        return
    }

    addCityWeatherToStorage({ city: cityCoordinates, cityWeather: cityWeather, date: new Date() })
    renderCitiesFromStorage()
})

function renderCitiesFromStorage() {
    weatherContainer.innerHTML = ""
    let cities = JSON.parse(localStorage.getItem(citiesStorage)) || []
    cities.forEach(async city => {
        let cityElement
        if (city.date - new Date() > 1000 * 60 * 5) {
            let cityWeather = await fetchWeatherData(city.city.lat, city.city.lon)
            cityElement = createCityElement(city.city, cityWeather)
        } else {
            cityElement = createCityElement(city.city, city.cityWeather)
        }
        weatherContainer.appendChild(cityElement)
    })
}

function createCityElement(city, weatherData) {
    let cityDiv = document.createElement("div")
    cityDiv.classList.add("city")
    cityDiv.textContent = city.name

    let iconDiv = document.createElement("div")
    let icon = document.createElement("img")
    icon.src = weatherData.icon
    iconDiv.appendChild(icon)
    cityDiv.appendChild(iconDiv)

    let description = document.createElement("p")
    description.textContent = weatherData.description
    cityDiv.appendChild(description)

    let temperature = document.createElement("p")
    temperature.textContent = `${weatherData.temp}°C`
    cityDiv.appendChild(temperature)

    let humidity = document.createElement("p")
    humidity.textContent = `Humidity: ${weatherData.humidity}%`
    cityDiv.appendChild(humidity)

    let removeBtn = document.createElement("button")
    removeBtn.textContent = "Remove"
    removeBtn.addEventListener("click", () => {
        removeCityFromStorage(city.city)
        renderCitiesFromStorage()
    })
    cityDiv.appendChild(removeBtn)

    return cityDiv
}

function addCityWeatherToStorage(cityWeather) {
    let cities = JSON.parse(localStorage.getItem(citiesStorage)) || []
    if (cities.some(c => c.city.name === cityWeather.city.name)) {
        errorInfo.textContent = "City already added"
        return
    }
    if (cities.length >= 10) {
        errorInfo.textContent = "You can add only 10 cities"
        return
    }

    cities.push(cityWeather)
    localStorage.setItem(citiesStorage, JSON.stringify(cities))
}

function removeCityFromStorage(city) {
    let cities = JSON.parse(localStorage.getItem(citiesStorage)) || []
    let index = cities.findIndex(c => c.city === city)
    cities.splice(index, 1)
    localStorage.setItem(citiesStorage, JSON.stringify(cities))
}

async function updateWeatherData() {
    let cities = JSON.parse(localStorage.getItem(citiesStorage)) || []
    await cities.forEach(async city => {
        let cityWeather = await fetchWeatherData(city.city.lat, city.city.lon)
        city.cityWeather = cityWeather
        city.date = new Date()
        localStorage.setItem(citiesStorage, JSON.stringify(cities))
    })
}

async function fetchCityCoordinates(city) {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    let coordinates
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            coordinates = { name: data[0].name, lat: data[0].lat, lon: data[0].lon }
        })

    return coordinates
}

async function fetchWeatherData(lat, lon) {
    let url = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
    let weatherData
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            weatherData = {
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                humidity: data.main.humidity
            }
        })

    return weatherData
}
