let input = document.querySelector("#locate");
let btn = document.querySelector("#search");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  getWeather(input.value);
});

function getWeather(city) {
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  let apiKey = "df6fede885194ad6987195155260402";
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  document.querySelector(".temperature").innerHTML = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => {

      document.querySelector(".location").innerHTML = data.location.name;
      document.querySelector(".condition").innerHTML = data.current.condition.text;
      document.querySelector(".weather-icon").src = "https:" + data.current.condition.icon;

      document.querySelector(".temperature").innerHTML = data.current.temp_c + "°C";
      document.querySelector(".feels").innerHTML = data.current.feelslike_c + "°C";
      document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
      document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

      let now = new Date(data.location.localtime);
      document.querySelector(".date").innerHTML = now.toDateString();
    })
    .catch(() => {
      alert("City not found!");
    });
}
