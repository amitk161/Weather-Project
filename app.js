const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
	const query = req.body.cityName;
	const apiKey = "5a4805d44bf4632648dba97d152e7b87";
	const unit = "metric";

	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&appid=" +
		apiKey +
		"&units=" +
		unit;
	https.get(url, function (response) {
		console.log(response.statusCode);

		response.on("data", function (data) {
			const info = JSON.parse(data);
			const temp = info.main.temp;
			const description = info.weather[0].description;
			const icon = info.weather[0].icon;
			const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
			res.write("<p>The weather is currently " + description + "<p>");
			res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
			res.write("<img src=" + imageUrl + ">");
			res.send();
		});
	});
});

app.listen(3001, function () {
	console.log("Server is running on port 3000");
});
