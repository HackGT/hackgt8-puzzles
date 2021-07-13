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

function formatDate(date) {
  function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }
  

  console.log(date.toString());
  var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  let formatted_date = date.getFullYear() + "-" + 
                                        appendLeadingZeroes(date.getMonth() + 1) + "-" + 
                                        appendLeadingZeroes(date.getDate()) + " " + 
                                        appendLeadingZeroes(date.getHours()) + ":" + 
                                        appendLeadingZeroes(date.getMinutes()) + ":" + 
                                        appendLeadingZeroes(date.getSeconds()) + " " +
                                        ampm;
  console.log(formatted_date);
  return formatted_date;

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
  ).then((response) => {
    const table = document.querySelector("#status-table-data");
    console.log(response.data.data);
    const rows = response.data.data.user.puzzlesCompleted.map((data, index) => {
      const rowElement = document.createElement("tr");
      const puzzleElement = document.createElement("td");
      const linkElement = document.createElement("a");
      linkElement.href = data.puzzle.host;
      linkElement.textContent = data.puzzle.title
      puzzleElement.appendChild(linkElement);
      rowElement.appendChild(puzzleElement);

      const dateElement = document.createElement("td");
      dateElement.textContent = formatDate(new Date(data.date));
      rowElement.appendChild(dateElement);

      const pointElement = document.createElement("td");
      pointElement.textContent = data.puzzle.points;
      rowElement.appendChild(pointElement);
      return rowElement;
    });
    table.innerHTML = rows.map((row) => row.outerHTML).join("");
    user_field = document.querySelector("#name-container");
    user_points_field = document.querySelector("#user-points");
    user_field.innerHTML = 'Welcome, ' + response.data.data.user.name;
    user_points_field.innerHTML = response.data.data.user.points;
  })
   .catch((error => {console.log(error);}))
}

window.onload = function() {
  getLeaderboard();
  getUserStatus();
};




