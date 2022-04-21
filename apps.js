

// CREATE A NAMESPACE OBJECT
    // DON'T FORGET INIT METHOD
// CALL OUR DOCUMENT.READY FUNC WITH JQUERY
    // CALL THE INIT METHOD
// SETUP OUR AJAX CALL TO THE API
    // AS A FUNCTION ON OUR NAMESPACE OBJECT
// DISPLAY THE DOG IMAGES WE GET BACK FROM THE API
    // THIS WILL ALSO BE A FUNCTION ON OUR NAMESPACE OBJECT
// ADD AN EVENT LISTENER TO THE FORM
    // CLICK ON THE PHOTO FOR NAME/TEMPERMENT


const app = {};

app.dogApiKey = "658ae417-dd2b-4a66-b873-dd775016aa04";

//catching our selectors
app.$dogWrapper = $(".dogWrapper")
app.$dogBreed = $("#dogBreed");
app.$dogTemperament = $("#dogTemperament");
app.$dogBredFor = $("#dogBredFor");
app.$dogLifeSpan = $("#dogLifeSpan");
app.$dogImage = $(".dogImage");

app.getRandomElement = (array) => {
    const index = Math.floor(Math.random() * array.length)
    return array[index];
}

//calling the api to get back random breed info
app.dogPopulate = () => {
    $.ajax({
        url: "https://api.thedogapi.com/v1/breeds",
        method: "GET",
        dataType: "json",
        header: {"x-api-key": app.dogApiKey},
    }).then((breed) => {
        const randomBreed = app.getRandomElement(breed);
        const randomDog = randomBreed.name;
        const randomTemperament = randomBreed.temperament;
        const randomBredFor = randomBreed.bred_for;
        const randomLifeSpan = randomBreed.life_span;
        const randomImage = randomBreed.image;
        console.log("random breed", randomBreed);

        //displaying api information
        app.$dogBreed.append(`${randomDog}`);
        app.$dogTemperament.append(`Temperment : ${randomTemperament}`);
        app.$dogBredFor.append(`Bred For : ${randomBredFor}`);
        app.$dogLifeSpan.append(`Life Span : ${randomLifeSpan}`);
        
        //second call to api for corresponding image
        $.ajax({
            url: `https://api.thedogapi.com/v1/images/${randomImage.id}`,
            method: "GET",
            dataType: "json",
            header: {"x-api-key": app.dogApiKey},
        }).then((image) => {
            //displaying image to the page
            app.$dogImage.append(`${randomImage}`);

            //adding condition if there is no image + adjustments to attributes
            if(image.url != "N/A"){
                app.$dogImage.attr("src", image.url);
                app.$dogImage.attr("alt", `image for ${randomDog} `)
            }
        })
})};

//clearing old dog info and displaying new dog info
app.refreshDog = () => {
    app.$dogBreed.empty();
    app.$dogTemperament.empty();
    app.$dogBredFor.empty();
    app.$dogLifeSpan.empty();
    app.$dogImage.empty();

    app.dogPopulate();
}

//click function for new dog info
app.init = () => {
    $("#fetch").on("click", () => {
        app.refreshDog();
    })

    app.dogPopulate();
    
}

$(document).ready (() => {
    app.init();
})