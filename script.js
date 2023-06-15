const input = document.querySelector("input");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const API_KEY = '7009eb72e374cb33c0f7942f5b28d089';

btn.addEventListener("click", () => {
    let city  = input.value.trim()
    if(city.length===0) {
        window.alert("Please Enter city name");
        return
    }
    getWeather(city);

})


const getWeather =(city) => {
    // console.log(city)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        const iconCode =data.weather[0].icon;
        icon.innerHTML =`<img src ="http://openweathermap.org/img/w/${iconCode}.png" alt ='weather icon'/>`

        const weatherCity =data.name;
        const weatherCountry = data.sys.country;
        weather.innerHTML =`${weatherCity}, ${weatherCountry}`;

        let weatherTemp = data.main.temp; // it is Kelvin value
        weatherTemp -=273;
        const temp =weatherTemp.toFixed(2);
        temperature.innerHTML =`${temp} &#8451;`


        const weatherDescription = data.weather[0].description;
        description.innerHTML = weatherDescription

        input.value="";
    })
    .catch(err => {
        console.log("error",err)
        // window.alert("Plz Enter Valid city Name")
    })
}

function submit(e) {
    // console.log(e)
    if(e.key=='Enter' || e.which ==13) {
        getWeather(e.target.value)
    }
}






//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}