// Starting Values -----

const buttonList = document.querySelectorAll("button");

// select the elements that will show the chosen moves
const computerMove = document.querySelector("#computer-choice");
const playerMove = document.querySelector("#player-choice");

// select the element that will show the current round number
const roundCounter = document.querySelector("#round-counter");

// select the win counters
const computerWinCount = document.querySelector("#computer-wins");
const playerWinCount = document.querySelector("#player-wins");

const computerContainer = document.querySelector("#computer");
const playerContainer = document.querySelector("#player");

const resetButton = document.querySelector("#reset-btn");
const roundResult = document.querySelector("#round-result");

let body = document.querySelector("body");

// define possible moves
const moves = ["👊🏻", "✌🏻", "🖐🏻"];

let roundCount = 0;
let computerWins = 0;
let playerWins = 0;

// Functions -----
// when a button is clicked, run the play round function.
function playRound(event) {
  // start a new round
  // increment the round counter
  roundCount++;
  // insert the current round count into the DOM as text
  roundCounter.textContent = roundCount;
  // get the player move value from the button that triggered the round (0/1/2)
  let playerMove = event.currentTarget.value;

  // generate the computer move value using the function that generates a random number (0/1/2)
  let computerMove = chooseComputerMove();
  // pass the two move values to the displayMoves function (now it will execute, go to its definition ->)
  displayMoves(playerMove, computerMove);
  decideWinner(playerMove, computerMove);

  if (roundCount === 10) {
    body.classList.add("finale");
    for (let x = 0; x < buttonList.length - 1; x++) {
      buttonList[x].disabled = true;
    }
    if (computerWins > playerWins) {
      roundResult.textContent = "Computer Wins!";
    } else if (computerWins < playerWins) {
      roundResult.textContent = "Player Wins!";
    } else {
      roundResult.textContent = "Tie!";
    }
  }
}
// when called, choose a random move (0, 1, 2);
function chooseComputerMove() {
  return Math.floor(Math.random() * 3);
}

function decideWinner(playerMove, computerMove) {
  let result = "";
  computerContainer.classList.remove("winner", "loser", "tie");
  playerContainer.classList.remove("winner", "loser", "tie");
  if (computerMove == playerMove) {
    showTie();
    result = "Tie!";
  } else {
    if (computerMove == 0) {
      if (playerMove == 1) {
        showComputerWon();
      } else {
        showPlayerWon();
      }
    } else if (computerMove == 1) {
      if (playerMove == 0) {
        showPlayerWon();
      } else {
        showComputerWon();
      }
    } else {
      if (playerMove == 0) {
        showComputerWon();
      } else {
        showPlayerWon();
      }
    }
  }
  return result;
}

// when called, take the two incoming values and label them as 'player' and 'computer'.
// this function can accept any values and will attempt to use them to decide which emoji from the 'moves' array to insert into the DOM. Only 0, 1, or 2 will work though, as those are the only options in the array.
function displayMoves(player, computer) {
  // access the 'moves' array and use the player value as the index of the element to get, and assign this value to the textContent of the playerMove DOM element object.
  playerMove.textContent = moves[player];
  // same for the computer move
  computerMove.textContent = moves[computer];
}
function showComputerWon() {
  computerWins++;
  computerWinCount.textContent = computerWins;
  computerContainer.classList.add("winner");
  playerContainer.classList.add("loser");
}
function showPlayerWon() {
  playerWins++;
  playerWinCount.textContent = playerWins;
  computerContainer.classList.add("loser");
  playerContainer.classList.add("winner");
}

function showTie() {
  computerContainer.classList.add("tie");
  playerContainer.classList.add("tie");
}

// Program Starts -----
// loop throught the list of buttons and add an eventlistener to each one, all using the same callback function. These listeners will then wait until a click is detected, at which point they will trigger the callback function that we supplied: playRound()

//callback fucntion은 파라미터로 함수를 전달받아, 함수의 내부에서 실행하는 함수이다. addEventListener가 예시임.
//이 경우에는 파라미터로 들어가는 함수에 괄호를 넣지 않는다. 괄호를 넣으면 함수를 바로 실행을 하여 함수의 결과값이 파라미터 값으로 들어가게 되며, 이후 callback 함수 실행시에 함수 기능이 작동하지 않는다.

for (let i = 0; i < buttonList.length - 1; i++) {
  //각 버튼에 click event가 발생시 playRound function을 실행시키는 기능을 추가함
  //addEventListener는 element에 event(클릭, 글자입력, 키누름 등등)가 발생시에 유저가 원하는 기능을 실행시킬수 있다
  //addEventListener("click")은 여러번 적용된 기능이 전부 작동됨
  buttonList[i].addEventListener("click", playRound);

  // onclick을 사용시 element에 여러번 onclick이 추가가 되더라도 마지막 onclick 만 작동됨
  // buttonList[i].onclick = function(){
  //   printConsole();
  // };
  // buttonList[i].onclick = function(event){
  //   playRound(event);
  // };
}

//추가 사항
//------------------------------------------------------------//

//게임을 리셋하는 버튼을 추가
//먼저 리셋버튼을 사용 할 수 있게 준비한다.
// id가 reset인 버튼을 사용할수 있게 resetButton이라는 variable을 만든다.
// let resetButton = document.querySelector("#reset-btn");

/*
리셋버튼이 제대로 resetButton 변수로 지정이 되었다면 
이젠 어떻게 리셋을 해야 할 지 생각 후 코드를 작성해야 한다.

먼저 가위바위보 게임의 초기상태를 먼저 확인한다.

초기상태를 정리를하면
1. Round가 0임
2. Computer 와 Player가 둘 다 ... 상태임
3. Computer 와 Player Wins가 둘 다 0 임

리셋버튼을 클릭 할 경우 위의 3가지 상태로 돌리도록 한다.

초기상태로 돌아가는 resetAll 함수를 먼저 만든다.
*/
function resetAll() {
  //1. Round가 0이 되게 변경
  //roundCount 를 0으로 변경한 후 span#round-counter에 roundCount를 보여지도록 변경한다.
  roundCount = 0;
  roundCounter.textContent = roundCount;

  computerContainer.classList.remove("winner", "loser", "tie");
  playerContainer.classList.remove("winner", "loser", "tie");

  //2. Computer 와 Player가 둘 다 ... 상태임
  computerMove.textContent = "...";
  playerMove.textContent = "...";
  const roundResult = document.querySelector("#round-result");
  roundResult.textContent = "Awaiting Moves!";
  //3. Computer 와 Player Wins가 둘 다 0 이 되도록 변경
  computerWins = 0;
  computerWinCount.textContent = computerWins;
  playerWins = 0;
  playerWinCount.textContent = playerWins;
  body.classList.remove("finale");
  for (let x = 0; x < buttonList.length - 1; x++) {
    buttonList[x].disabled = false;
  }
  //이 fucntion은 끝난 후 이후에 산출할 값이 없기 때문에 return이 필요가 없다
}

//resetAll함수가 리셋 버튼을 눌렀을때 작동이 되도록 리셋 버튼에 addEventListener를 추가한다.
resetButton.addEventListener("click", resetAll);

//로직 변경 연습
//------------------------------------------------------------------------//
/*
현재 Result가 가위바위보 버튼을 누르더라도 awaiting move! 가 변경이 안되는 문제 있다.

1. 가위 바위 보 버튼을 누를 경우 Result가 바뀌도록 코드 잘못된곳을 확인하고 수정이 필요하다.
수정을 위한 팁:
    1) decideWinner 함수가 이미 승패결과를 계산을 하고 있다. 다만 계산 결과가 화면에 나오지 않는 중이다.
    2) playRound 함수에서 버튼을 누르면 가위바위보 로직이 작동이 되도록 되어 있다. 여기에 결과값이 Result로 나오도록 로직을 추가를 한다.

2. 코드 수정후 reset버튼을 누르면 Result가 awaiting move! 변경되도록 resetAll 함수에 로직을 추가를 한다.
*/
