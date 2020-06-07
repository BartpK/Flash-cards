var itemIdentifier = 0;
var flashcardoverview = document.querySelector("#flashcardoverview");
document.querySelector("#addButton").addEventListener("click", addItem);
document.querySelector("#nextCard").addEventListener("click", showCard);
document.querySelector("#showAnswer").addEventListener("click", showAnswer);
var flashCardsArray = [];

function addItem() {
    //stores items in array and appends to overview panel
    var question = document.querySelector("#questionInput").value;
    var answer = document.querySelector("#answerInput").value;

    if (question === "" || answer === "") {
        alert("Please fill out the fields")
    } else {
        //activeCard is used to deactive cards when removed from the overview panel
        var flashcard = {
            oquestion: question,
            oanswer: answer,
            activeCard: true,
        }

        flashCardsArray.push(flashcard);
        var flashcardListing = document.createElement("div");
        flashcardListing.innerHTML = `<p class="flashcarditem">${flashcard.oquestion}</p><p class="removex" onclick="deleteCard(${itemIdentifier})">x</p>`;
        flashcardListing.id = `flashcard${itemIdentifier}`;
        flashcardListing.className = "flashcardlistingwrapper";
        flashcardoverview.appendChild(flashcardListing);

        document.querySelector("#questionInput").value = "";
        document.querySelector("#answerInput").value = "";

        itemIdentifier++;
    }
}
//removes cards from overview and deactivates cards within array
function deleteCard(cardId) {
    document.querySelector(`#flashcard${cardId}`).style.display = "none";
    flashCardsArray[`${cardId}`].activeCard = false;
}

function showCard() {
    var cardSelector = Math.floor(Math.random() * flashCardsArray.length);
    //skips cards that have been deactivated
    if (flashCardsArray[cardSelector].activeCard === false) {
        showCard();
    } else {

        var selectedQuestion = flashCardsArray[cardSelector].oquestion;
        var selectedAnswer = flashCardsArray[cardSelector].oanswer;

        document.querySelector("#cardAnswer").style.display = "none";

        document.querySelector("#cardQuestion").innerHTML = `<p class="questionbox">${selectedQuestion}</p>`;

        document.querySelector("#cardAnswer").innerHTML = `<p class="answerbox">${selectedAnswer}</p>`;


    }
}


function showAnswer() {
    document.querySelector("#cardAnswer").style.display = "block";
}

