const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const textSpace1 = document.querySelector("#textspace-1")
const textSpace2 = document.querySelector("#textspace-2")
const textSpace3 = document.querySelector("#textspace-3")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    textSpace1.textContent = "Loading..."
    textSpace2.textContent = ""
    
    const location = search.value
    sendRequestToServer(location)
})

const sendRequestToServer = (location) => {
    const url = "/weather?location=" + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) return textSpace1.textContent = data.error
        
    textSpace1.textContent = "Location:    " + data.country + "      " + data.latitude + data.longitude
    textSpace2.textContent = "Tempreture:    " + data.temperature + "  degrees.....      "
    textSpace3.textContent = "Weather description:    " + data.description
    })
})
}