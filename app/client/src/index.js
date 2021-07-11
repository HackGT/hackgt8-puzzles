const faqs = document.querySelectorAll(".faq");
const axios = require('axios');

for (const faq of faqs) {
  const question = faq.querySelector(".question");
  const answer = faq.querySelector(".answer");
  const chevron = question.querySelector("i");
  question.addEventListener("click", () => {
    answer.classList.toggle("hide");
    chevron.classList.toggle("gg-chevron-down");
  });
}


function getLeaderboard() {
  axios.get(
    "http://localhost:3000/leaderboard"
  ).then((response) => {document.getElementById("leaderboard-text").innerHTML = response.text;})
    .catch((error => {console.log(error);}))
}

function getStatus() {
  axios.get(
    "http://localhost:3000/user/status"
  ).then((response) => {document.getElementById("status-text").innerHTML = response.text;})
    .catch((error => {console.log(error);}))
}

document.onload = getLeaderboard();




