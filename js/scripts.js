$(document).ready(function () {
  const wordDatabase = [
    { english: "happy", serbian: "srećan", image: "./images/assests/happy_pic.svg" },
    { english: "book", serbian: "knjiga", image: "./images/assests/book_pic.svg" },
    { english: "car", serbian: "auto", image: "./images/assests/car_pic.svg" },
    { english: "carrot", serbian: "šargarepa", image: "./images/assests/carrot_pic.svg" },
    { english: "Earth", serbian: "Zemlja", image: "./images/assests/earth_pic.svg" },
    { english: "explosion", serbian: "eksplozija", image: "./images/assests/explosion_pic.svg" },
    { english: "fear", serbian: "strah", image: "./images/assests/fear_pic.svg" },
    { english: "friend", serbian: "prijatelj", image: "./images/assests/friend_pic.svg" },
    { english: "nice", serbian: "lijepo", image: "./images/assests/nice_pic.svg" },
    { english: "relativity", serbian: "relativnost", image: "./images/assests/relativity_pic.svg" },
    { english: "soldier", serbian: "vojnik", image: "./images/assests/soldier_pic.svg" },
    { english: "speedlimit", serbian: "ograničenje brzine", image: "./images/assests/speedlimit_pic.svg" },
  ];

  let availableWords = []; 
  let currentWord = null;
  let successCount = 0;
  let errorCount = 0;
  const totalInDatabase = wordDatabase.length;

  resetGame();

  function resetGame() {
    successCount = 0;
    errorCount = 0;
    availableWords = [...wordDatabase]; // Fill pool
    updateCounters();
    getNewWord();
  }

  function getNewWord() {
    // If the pool is empty, the game session is over
    if (availableWords.length === 0) {
      alert(`Session Over! Correct: ${successCount}, Failed: ${errorCount}. Restarting...`);
      resetGame();
      return;
    }

    // Pick a random index
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    currentWord = availableWords[randomIndex];

    // REMOVE IMMEDIATELY: This ensures it won't appear again in this session
    // regardless of whether the answer is right or wrong.
    availableWords.splice(randomIndex, 1);

    // Update UI
    $("#word").text(currentWord.english);
    $("#pic").attr("src", currentWord.image);
    $("#input").val("").focus();
    $("#input").css("background-color", "transparent");
  }

  function checkAnswer() {
    const userInput = $("#input").val().trim().toLowerCase();
    const correctAnswer = currentWord.serbian.toLowerCase();

    if (userInput === correctAnswer) {
      // SUCCESS
      successCount++;
      $("#input").css("background-color", "rgba(0, 255, 0, 0.4)");
    } else {
      // ERROR
      errorCount++;
      $("#input").css("background-color", "rgba(255, 0, 0, 0.4)");
    }

    updateCounters();
    
    // Always move to the next word after 1 second, 
    // because we already removed the current one from the pool.
    setTimeout(getNewWord, 1000);
  }

  function updateCounters() {
    $(".plus-icon").parent().find("font, span, .counter-text").text(successCount + " / " + totalInDatabase);
    $(".minus-icon").parent().find("font, span, .counter-text").text(errorCount + " / " + totalInDatabase);
  }

  $("#letsee").on("click", checkAnswer);
  $("#input").on("keypress", function (e) {
    if (e.which === 13) checkAnswer();
  });
});