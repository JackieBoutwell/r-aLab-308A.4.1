import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_92QsgmenerVyDjykZgwa3ZwyxNY2J9XZISpKsLEUvpGndNeM1osQ1D7i4Bbl8C9N";
const url = "https://api.thecatapi.com/v1/breeds";
//axios.defaults.headers.common["x-api-key"] =
("live_92QsgmenerVyDjykZgwa3ZwyxNY2J9XZISpKsLEUvpGndNeM1osQ1D7i4Bbl8C9N");
//axios.defaults.baseURL = "https://api.thecatapi.com/v1/breeds";
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
// async function initialLoad() {
//   try {
//     const response = await fetch(url);
//     const jsonData = await response.json();

//     jsonData.forEach((breed) => {
//       const option = document.createElement("option");
//       option.value = breed.id;
//       option.text = breed.name;
//       breedSelect.appendChild(option);
//     });
//   } catch (error) {
//     console.log("Fetching got error:", error);
//   }
//   // console.log(jsonData);
// }
// initialLoad();

// breedSelect.addEventListener("change", breedSelectHandler);

// async function breedSelectHandler(event) {
//   Carousel.clear();
//   const breedId = event.target.value;

//   const responseBreed = await fetch(
//     `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`
//   );
//   const jsonData = await responseBreed.json();

//   //console.log("json", jsonData);

//   jsonData.forEach((breed) => {
//     // const imgTag = document.createElement("img");
//     // imgTag.setAttribute("src", breed.url);

//     const item = Carousel.createCarouselItem(breed.url, "", breedId);
//     Carousel.appendCarousel(item);
//   });
//   const breedInfo = await fetch(
//     `https://api.thecatapi.com/v1/breeds/${breedId}`
//   );
//   const jsonBreedInfo = await breedInfo.json();
//   //console.log(jsonBreedInfo);

//   infoDump.innerHTML = "";

//   const info = document.createElement("div");
//   info.innerHTML = `<h2>${jsonBreedInfo.name}</h2>
//   <p>${jsonBreedInfo.description}</p>`;
//   infoDump.appendChild(info);
//   //console.log(info);
// }

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 *
 * -  Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
async function initialLoad() {
  try {
    const response = await axios.get(url, {
      onDownloadProgress: updateProgress,
    });

    //console.log(response.data);
    response.data.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.log("Fetching got error:", error);
  }
  // console.log(jsonData);
}
initialLoad();

breedSelect.onchange = breedSelectHandler;
const info = document.createElement("div");

async function breedSelectHandler(event) {
  Carousel.clear();
  //console.log("working");
  const breedId = event.target.value;
  // console.log(breedId, "breed id");
  const responseBreed = await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=8`,
    {
      onDownloadProgress: updateProgress,
    }
  );
  //const jsonData = await responseBreed.json()
  //console.log(responseBreed.data);
  responseBreed.data.forEach((breed) => {
    console.log(breed);
    // const imgTag = document.createElement("img");
    // imgTag.setAttribute("src", breed.url)
    const item = Carousel.createCarouselItem(breed.url, "", breed.id);
    Carousel.appendCarousel(item);
    Carousel.start();
  });
  const breedInfo = await axios.get(
    `https://api.thecatapi.com/v1/breeds/${breedId}`,
    {
      onDownloadProgress: updateProgress,
    }
  );
  //const breedInfo = await breedInfo.json();
  //console.log(breedInfo);
  infoDump.innerHTML = "";

  info.innerHTML = `<h2>${breedInfo.data.name}</h2>
   <p>${breedInfo.data.description}</p>`;
  infoDump.appendChild(info);
  //console.log(info);
}
/**


 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios.interceptors.request.use((request) => {
  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  progressBar.style.width = "0%"
  document.body.style.cursor = "progress";
  return request;
});
axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date().getTime();
    response.durationInMS =
      response.config.metadata.endTime - response.config.metadata.startTime;
    //console.log(`Request took ${response.durationInMS} milliseconds.`);
    document.body.style.cursor = "default";
    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date().getTime();
    error.durationInMS =
      error.config.metadata.endTime - error.config.metadata.startTime;
    //console.log(`Request took ${response.durationInMS} milliseconds.`);
    throw error;
  }
);
function updateProgress(progressEvent) {
  progressBar.style.width = `${progressEvent.progress * 100}%`;
  //console.log(progressEvent.progress);
}
/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * 
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
// console.log("this is the fav pic");

export async function favourite(imgId) {
  await axios.post("https://api.thecatapi.com/v1/favourites", {
      image_id: imgId,
      sub_id: "my-favs"
    }, {
      headers: { 'x-api-key': API_KEY }
  })
  .then(function (response) {
    console.log(response);
  })
    .catch(function (error) {
    //console.log(error);
    if (error.response.data.includes("DUPLICATE_FAVOURITE")) {
      deleteFavorite(imgId)
    }
  });
}

async function deleteFavorite(imgId) {
  const favorites = await axios.get('https://api.thecatapi.com/v1/favourites?limit=20&sub_id=my-favs&order=DESC',{
    headers:{
        "content-type":"application/json",
        'x-api-key': API_KEY
    }
  });

  const favToDelete = favorites.data.filter(fav => {
    if (fav.image_id === imgId) {
      return fav;
    }
  });

  await axios.delete(`https://api.thecatapi.com/v1/favourites/${favToDelete[0].id}`, {
      headers: { 'x-api-key': API_KEY }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

async function getFavourites() {
  Carousel.clear();
  info.innerHTML = "";

  const getFavs = await axios.get('https://api.thecatapi.com/v1/favourites?order=DESC&sub_id=my-favs', {
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY
    }
  });

  getFavs.data.forEach((breed) => {
    const item = Carousel.createCarouselItem(breed.image.url, "", breed.image.id);
    Carousel.appendCarousel(item);
    Carousel.start();
  });
};

getFavouritesBtn.onclick = getFavourites;

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */