const labelsWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const waterLastWeek = [8, 10, 12, 16, 20, 24, 22];

const labelsMonth = ["Week 1", "Week 2", "Week 3", "Week 4"];
const waterLastMonth = [12, 12, 124, 123];

new Chart("weekly", {
  type: "line",
  data: {
    labels: labelsWeek,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "blue",
        data: waterLastWeek,
      },
    ],
  },
  options: {
    legend: { display: false },
  },
});

new Chart("monthly", {
  type: "line",
  data: {
    labels: labelsMonth,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "blue",
        data: waterLastMonth,
      },
    ],
  },
  options: {
    legend: { display: false },
  },
});

var ProgBar = document.getElementById("Bar");
document.getElementById("Bar").style.width = localStorage.getItem("ProgBar");
var waterdrank = 0;
function sendGoal() {
  var finalgoal = document.getElementById("goal").value;
  localStorage.setItem("finalgoal", finalgoal);
}
function movebar_bottle() {
  var finalgoal = localStorage.getItem("finalgoal");
  waterdrank += 0.5;
  if (waterdrank < finalgoal) {
    ProgBar = (waterdrank * 100) / finalgoal;
    document.getElementById("Bar").style.width = ProgBar + "%";
    document.getElementById("Bar").innerHTML = ProgBar.toPrecision(2) + "%";
  } else {
    document.getElementById("Bar").style.width = "100%";
    document.getElementById("Bar").innerHTML = "100%";
  }
}
function movebar_glass() {
  var finalgoal = localStorage.getItem("finalgoal");
  waterdrank += 0.25;
  if (waterdrank < finalgoal) {
    ProgBar = (waterdrank * 100) / finalgoal;
    document.getElementById("Bar").style.width = ProgBar + "%";
    document.getElementById("Bar").innerHTML = ProgBar.toPrecision(2) + "%";
  } else {
    document.getElementById("Bar").style.width = "100%";
    document.getElementById("Bar").innerHTML = "100%";
  }
}
function add_bottles() {
  movebar_bottle();
}
function add_glasses() {
  movebar_glass();
}
const LastDrink = setInterval(Reminder, 1000);
var TimeSince = 0;
function Reminder() {
  TimeSince++;
  if (TimeSince > 3600) {
    notify();
    TimeSince = 0;
  }
}
function notify() {
  if (!window.Notification) {
    console.log("Browser does not support notifications.");
  } else {
    if (Notification.permission === "granted") {
      var notify = new Notification("Drink some water!", {
        body: "I know you are thirsty...",
      });
    } else {
      Notification.requestPermission()
        .then(function (p) {
          if (p === "granted") {
            // show notification here
            var notify = new Notification("Drink some water!", {
              body: "I know you are thirsty...",
            });
          } else {
            console.log("User blocked notifications.");
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  }
}
