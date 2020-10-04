const { urlencoded } = require("express")
const request = require("postman-request")

//function to get longitude and latitude of location entered
const geoCode = (location, callback) => {

    //url to mapbox api
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) +".json?access_token=pk.eyJ1IjoiZW1la2FyciIsImEiOiJja2ZseDI4N2wwb2FuMnpwaTk5aWxseHV1In0.hqf_lLUgYny8L-VYJKx4TQ"

    //use request module to make network request
    request({url, json: true}, (error, data) => {

        //check if there is an error or everything is alright
        if (error) return callback("Something went wrong")

        const features = data.body.features

        if (features[0] === undefined) return callback("Please put in a valid location")
        
        const locationCoordinates = features[0].geometry.coordinates
        callback(undefined, locationCoordinates)
        
    })
}

module.exports = geoCode
