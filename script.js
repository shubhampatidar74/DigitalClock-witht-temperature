const time_div = document.querySelector("#time_div");
const date_div = document.querySelector("#date_div");
const day_div = document.querySelector("#day_div");
const showtemp = document.querySelector("#showtemp");
const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function findLocation(positon) {
    let lati = positon?.coords?.latitude;
    let longi = positon?.coords?.longitude;
    findTemperature(lati, longi)

}function locationFaild() {
    console.log("There Was Some issue")
}
function latlon() {
    navigator.geolocation.getCurrentPosition(findLocation, locationFaild)
}

const findTemperature = async (lati, longi) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=00e0d64a3f1167042b391002d5985fce`;
    const options = {
        method: 'GET',
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        showtemp.innerHTML=Math.floor(result?.main?.temp-273.15)+"℃"

    } catch (error) {
        console.error(error);
    }
}
latlon()
findLocation()

setInterval(() => {
    let clockData = new Date();
    let date = clockData.getDate();
    let month = clockData.getMonth() + 1;
    let year = clockData.getFullYear();
    let day = clockData.getDay();
    let hour = clockData.getHours();
    let minute = clockData.getMinutes();
    let second = clockData.getSeconds();
    var session = "AM";


    session = hour >= 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour <= 9 ? "0" + hour : hour;
    minute = minute <= 9 ? "0" + minute : minute;
    second = second <= 9 ? "0" + second : second;

    month = month <= 9 ? "0" + month : month;
    date = date <= 9 ? "0" + date : date;

    time_div.innerHTML = hour + ":" + minute + ":" + second + " " + session;
    date_div.innerHTML = date + "-" + month + "-" + year;
    day_div.innerHTML = dayList[day];
}, 1000);