const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', function() {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    // const location = place.name
    const latitude = place.geometry.location.lat()
    const longtitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            // location: location
            latitude: latitude,
            longtitude: longtitude
        })
    }).then(
        res => res.json()
    ).then(
        data => {
            // console.log(data)
            setWeatherData(data, place.formatted_address)
        }
    )
})

const locationIcon = document.querySelector('.weather-icon');
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const windElement = document.querySelector('[data-wind]')
const temperatureElement = document.querySelector('[data-temperature]')
const feelElement = document.querySelector('[data-feel]')

function setWeatherData(data) {
    locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
    locationElement.textContent = data.name + ', ' + data.sys.country
    statusElement.textContent = data.weather[0].description
    temperatureElement.textContent = data.main.temp
    windElement.textContent = data.wind.speed
    feelElement.textContent = data.main.feels_like
}