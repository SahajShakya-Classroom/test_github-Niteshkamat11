console.log("API_KEY:", API_KEY);

const city = "Kathmandu";

const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log("Raw API response:", data);

        if (data.error) {
            document.getElementById("output").textContent =
                "API Error: " + data.error.message;
            return;
        }

        const formattedData = {
            city: data.location.name,
            region: data.location.region,
            country: data.location.country,
            local_time: data.location.localtime,
            temperature: data.current.temp_c + " °C",
            feels_like: data.current.feelslike_c + " °C",
            humidity: data.current.humidity + " %",
            condition: data.current.condition.text,
            wind_speed: data.current.wind_kph + " kph"
        };
        const output = `
📍 City: ${formattedData.city}, ${formattedData.country}
🕒 Local Time: ${formattedData.local_time}

🌡️ Temperature: ${formattedData.temperature}
🤔 Feels Like: ${formattedData.feels_like}
💧 Humidity: ${formattedData.humidity}
🌤️ Condition: ${formattedData.condition}
💨 Wind Speed: ${formattedData.wind_speed}
`;

        document.getElementById("output").textContent = output;


    })
    .catch(err => {
        console.error(err);
        document.getElementById("output").textContent =
            "Network error";
    });

