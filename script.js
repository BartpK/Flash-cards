var flashCardsArray = JSON.parse(localStorage["flashCardsArray"]);
var itemIdentifier = 0;
var flashcardoverview = document.querySelector("#flashcardoverview");
document.querySelector("#addButton").addEventListener("click", addItem);
document.querySelector("#nextCard").addEventListener("click", showCard);
document.querySelector("#showAnswer").addEventListener("click", showAnswer);
document.querySelector("#clearAll").addEventListener("click", clearAll);
if (flashCardsArray === undefined) {
    var flashCardsArray = [];
}
updateList();
function addItem() {
    var question = document.querySelector("#questionInput").value;
    var answer = document.querySelector("#answerInput").value;
    if (question === "" || answer === "") {
        alert("You can't create an empty card");
    } else {

        var flashcard = {
            oquestion: question,
            oanswer: answer,
        }
        flashCardsArray.push(flashcard);
        updateList();
        document.querySelector("#questionInput").value = "";
        document.querySelector("#answerInput").value = "";
    }
}

function updateList() {
    var flashcardoverview = document.getElementById("flashcardoverview");
    flashcardoverview.innerHTML = "";
    localStorage["flashCardsArray"] = JSON.stringify(flashCardsArray);

    for (i = 0; i < flashCardsArray.length; i++) {
        var flashcardListing = document.createElement("div");
        flashcardListing.innerHTML = `<p class="flashcarditem">${flashCardsArray[i].oquestion}</p><p class="removex" onclick="deleteCard(${i})">x</p>`;
        flashcardoverview.appendChild(flashcardListing);
    }
}

function deleteCard(cardId) {
    flashCardsArray.splice(cardId, 1);
    updateList();
}

function showCard() {
    var cardSelector = Math.floor(Math.random() * flashCardsArray.length);
    var selectedQuestion = flashCardsArray[cardSelector].oquestion;
    var selectedAnswer = flashCardsArray[cardSelector].oanswer;
    document.querySelector("#cardAnswer").style.display = "none";
    document.querySelector("#cardQuestion").innerHTML = `<p class="questionbox">${selectedQuestion}</p>`;
    document.querySelector("#cardAnswer").innerHTML = `<p class="answerbox">${selectedAnswer}</p>`;
}

function showAnswer() {
    document.querySelector("#cardAnswer").style.display = "block";
}

function clearAll() {
    if (confirm("Are you sure you want to remove all of your cards?")) {

        flashCardsArray = [];
        updateList();
        localStorage["flashCardsArray"] = JSON.stringify(flashCardsArray);
    }
}

document.getElementById('answerInput').onkeydown = function (event) {
    if (event.keyCode == 13) {
        addItem();
        document.getElementById('questionInput').click();
    }
}
