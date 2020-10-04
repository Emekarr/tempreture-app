const request = require("postman-request")

const getWeather = ({latitude, longitude}, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=2b9e053b8a1d60c03dda8b7cad4b0ec9&query=" + latitude + "," + longitude

    request({url, json: true}, (error, data) => {

        if (error) return callback("Something went wrong")
        else if (data.body.success) return callback("Error getting weather")

        const country = data.body.location.country
        const latitude = data.body.location.lat
        const longitude = data.body.location.lon
        const description = data.body.current.weather_descriptions[0]
        const temperature = data.body.current.temperature

        const data_result = {country, latitude, longitude, description, temperature}

        callback(undefined, data_result)
    })
    
}

module.exports = getWeather