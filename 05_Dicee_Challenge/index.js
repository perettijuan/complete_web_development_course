function getRandomNumber() {
  return Math.floor(Math.random() * (6 - 1 + 1) + 1);
}

function getRandomImage(randomNumber) {
  switch (randomNumber) {
    case 1:
      return "images/dice1.png";
    case 2:
      return "images/dice2.png";
    case 3:
      return "images/dice3.png";
    case 4:
      return "images/dice4.png";
    case 5:
      return "images/dice5.png";
    case 6:
      return "images/dice6.png";
  }
}

function changeImage(imageSelector, imagePath) {
    document.querySelector(imageSelector).src = imagePath;
}

function getWinnerText(number1, number2) {
  if (number1 === number2) {
    return "Draw";
  } else if (number1 > number2) {
    return "Player 1 wins!";
  } else {
    return "Player 2 wins!";
  }
}

var randomNumber1 = getRandomNumber();
var randomNumber2 = getRandomNumber();

changeImage(".img1", getRandomImage(randomNumber1));
changeImage(".img2", getRandomImage(randomNumber2));
document.querySelector("h1").innerHTML = getWinnerText(randomNumber1, randomNumber2);
