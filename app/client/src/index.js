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
  ).then((response) => {
    const table = document.querySelector("#leaderboard-data");
    console.log(response);
    const rows = response.data.data.users.map((row, index) => {
      const rowElement = document.createElement("tr");
      const rankElement = document.createElement("td");
      rankElement.textContent = index + 1;
      rowElement.appendChild(rankElement);
      const nameElement = document.createElement("td");
      nameElement.textContent = row.name;
      rowElement.appendChild(nameElement);
      const pointElement = document.createElement("td");
      pointElement.textContent = row.points;
      rowElement.appendChild(pointElement);
      return rowElement;
    });
    table.innerHTML = rows.map((row) => row.outerHTML).join("");
  })
   .catch((error => {console.log(error);}))
}

function getUserStatus() {
  axios.get(
    "http://localhost:3000/user/status",
    {
      headers: {'Access-Control-Allow-Origin': '*'}
    }
  ).then((response) => {console.log(response);})
    .catch((error => {console.log(error);}))
}

setTimeout( getUserStatus, 5000 );
document.onload = getLeaderboard();




