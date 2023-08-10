/**
 * WEB222 – Final Assignment
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Hon Wing LEE
 *      Student ID: 121221220
 *      Date:       09 Aug 2022
 */


var { reviewData } = window;
// For debugging
console.log({ reviewData }, "App Data");

// create review cards on load
document.addEventListener("DOMContentLoaded", function () {
    showAllCard(reviewData);
});

// create review cards when clicking "Create" button
const createButton = document.getElementById("submitComment");
createButton.addEventListener("click", function(event){
    event.preventDefault();
    updateReview();
    showAllCard(reviewData);
})


////////////////////////////////////////

// create cards dynamically
function showAllCard() {
    var cardContainer = document.querySelector("#cardContainer");
    cardContainer.innerHTML = ""; // clear the whole table

    reviewData.forEach(function (review) {
        var card = createCard(review);
    cardContainer.appendChild(card);
    });
}

// create a single card
function createCard(review) {
    // Create a <div> to hold the card
    const card = document.createElement("div");
    card.classList.add("card");

    // (optional) console.log details on click
    card.addEventListener("click", function () {
        console.log(review);
    });

    // title
    const title = document.createElement("h3");
    title.textContent =  `*** ${review.title}`;
    title.classList.add("title");
    card.appendChild(title);

    // rating
    const rating = document.createElement("img");
    rating.classList.add('rating');

    switch(review.rating){
    case 5:
        rating.src = "./img/5star.png"  ;
        break;
    case 4:
        rating.src = "./img/4star.png"  ;
        break;
    case 3:
        rating.src = "./img/3star.png"  ;
        break;
    case 2:
        rating.src = "./img/2star.png"  ;
        break;
    case 1:
        rating.src = "./img/1star.png"  ;
        break;
    default:
        rating.src = "./img/0star.png"  ;    
    }
    card.appendChild(rating);

    // name 
    // const name = document.createElement("div");
    // name.classList.add("name");
    // name.textContent = review.name;
    // card.appendChild(name);
    
    // date
    const date = document.createElement("date");
    date.classList.add('date');
    // date.textContent = `on ${review.date}`;
    date.textContent = `${review.name} -- ${review.date}`;
    card.appendChild(date);

    // review content
    const content = document.createElement("p");
    content.classList.add("content");
    content.textContent = review.content;
    card.appendChild(content);

    return card;
}


// get data from user input in form, and append to reviewData
function updateReview() {
    const card_name = document.getElementById("card_name").value;
    const card_date = getFormattedDate();
    const card_rating = parseInt(document.getElementById("card_rating").value);
    const card_title = document.getElementById("card_title").value;
    const card_content = document.getElementById("card_content").value;

    reviewData.push({
       name: card_name,
        date: card_date,
        rating: card_rating,
        title: card_title,
        content: card_content,
    });
}

function getFormattedDate() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${day.toString().padStart(2, '0')}, ${year}`;
    return formattedDate;
}