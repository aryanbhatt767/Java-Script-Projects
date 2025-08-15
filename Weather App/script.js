const API_KEY = "9c2cf681f559d94b329e6849ec5aca92";
const API_KEY_GEO ="4c89c86d88msh7aa6d0d3603f4e9p15201ejsndcf3581b837a";

const cityInput=document.getElementById("cityInput");
const suggestionsList=document.getElementById("suggestions");
const weatherResult=document.getElementById("weatherresult");

cityInput.addEventListener("input",async () => {
    const query=cityInput.value.trim();
    if(query.length<1) {
        suggestionsList.innerHTML="";
        return;
    }
    const options= {
        method:'GET',
        headers: {
            'X-RapidAPI-key':"4c89c86d88msh7aa6d0d3603f4e9p15201ejsndcf3581b837a",
            'X-RapidAPI-Host':'wft-geo-db.p.rapidapi.com'
        }
    };
    try {
        const response=await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,options);
         const data=await response.json();

         suggestionsList.innerHTML="";
         data.data.forEach(city => {
            const li=document.createElement("li");
            li.textContent=`${city.city},${city.country}`;
            li.addEventListener("click",()=> {
                cityInput.value=city.city;
                suggestionsList.innerHTML="";
                getWeather(city.city);

            });
            suggestionsList.appendChild(li);
            
         });

    } 
catch (error) {
        console.error("Error fetching city suggestions:", error);
        suggestionsList.innerHTML="<li>Error fetching suggestions</li>";
    }
});

    


async function getWeather(city) {
    try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if(!response.ok) { throw new Error("City not found"); }
    const data = await response.json();
    weatherResult.innerHTML = `<h2>${data.name},${data.sys.country}
        </h2> <p>Temperature:${data.main.temp}ºC </p> <p> Weather:${data.weather[0].description}</p>`;
    }
catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
};
}


       

   
    
    
