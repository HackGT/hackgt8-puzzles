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
    "http://localhost:3000/leaderboard",
    {
      headers: {'Access-Control-Allow-Origin': '*'}
    }
  ).then((response) => {console.log(response);})
    .catch((error => {console.log(error);}))
}


document.onload = getLeaderboard();




