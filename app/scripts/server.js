const path = require("path")
const hbs = require("hbs")
const express = require("express")
const geoCode = require("./geocode")
const weather = require("./weather")

const server = express()

//views templates location
const viewsTemplatesLocation = path.join(__dirname, "../templates/views")
//hbs partials location
const hbsPartilasLocation = path.join(__dirname, "../templates/partials")
//static folder location
const staticFolderLocation = path.join(__dirname, "../public")

server.set("view engine", "hbs")
server.set("views", viewsTemplatesLocation)
hbs.registerPartials(hbsPartilasLocation)

//set up assests folder
server.use(express.static(staticFolderLocation))

//home route
server.get("", (req, res) => {
    const extraInfo = {
        title: "Home Page",
        name: "emekarr"
    }
    res.render("index", extraInfo)
})

server.get("/about", (req, res) => {
    const extraInfo = {
        title: "About Page",
        name: "emekarr"
    }
    res.render("about", extraInfo)
})

server.get("/help", (req, res) => {
    const extraInfo = {
        title: "Help Page",
        name: "emekarr",
        helpText: "All you need to do is put in a location in the search field and click search and the weather of thst location will be delivered to you!"
    }
    res.render("help", extraInfo)
})


server.get("/weather", (req, res) => {
    const location = req.query.location

    if (!location) return res.send({
        error: "Please put in a location"
    })

    geoCode(location, ((error, coordinates) => {
        
        if (error) return res.send({error})

        const longitude = coordinates[0]
        const latitude = coordinates[1]
        const data = {longitude, latitude}

        weather(data, (error, {country, latitude, longitude, description, temperature}) => {

            if (error) return res.send(error)
            res.send({country, latitude, longitude, description, temperature})
            
        })
    }))
})

server.get("*", (req, res) => {
    const extraInfo = {
        title: "404 Error!",
        name: "emekarr",
        errorMessage: "Page not found."
    }
    res.render("404", extraInfo)
})

const PORT = process.env.PORT || 3000
server.listen(PORT)
