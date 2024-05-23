const bar = document.getElementById("Bar");
const defaultGoal = 5;
const finalGoal = Number(localStorage.getItem("finalgoal")) || defaultGoal;

function getWaterDrankToday() {
  const entries_string = localStorage.getItem("entries") ?? "[]";
  const entries = JSON.parse(entries_string);

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const entriesToday = entries.filter((entry) => {
    const entryDate = new Date(entry.time);
    return entryDate >= startOfToday && entryDate < endOfToday;
  });

  return entriesToday.reduce((total, entry) => total + entry.amount, 0);
}

function getProgress() {
  const drankToday = getWaterDrankToday();

  return (drankToday * 100) / ((finalGoal ?? defaultGoal) == 0 ? defaultGoal : finalGoal);
}

function initialize() {
  const drankToday = getWaterDrankToday();
  const progress = (drankToday * 100) / ((finalGoal ?? defaultGoal) == 0 ? defaultGoal : finalGoal);

  bar.style.width = progress + "%";
  bar.innerHTML = (progress >= 100 ? 100 : progress.toPrecision(2)) + "%";
  waterdrank = (progress * finalGoal) / 100;
  if (progress >= 100) {
    bar.style.width = "100%";
    bar.innerHTML = "100%";
  }
}

initialize();

function movebar() {
  const progress = getProgress();

  if (getWaterDrankToday() < finalGoal) {
    bar.style.width = progress + "%";
    bar.innerHTML = progress.toFixed(2) + "%";
  } else {
    bar.style.width = "100%";
    bar.innerHTML = "100%";
  }
}

function add_bottles() {
  if (bar.innerHTML === "100%") return;
  const entries_string = localStorage.getItem("entries") ?? "[]";
  const entries = JSON.parse(entries_string);
  entries.push({ amount: 0.5, time: new Date().toISOString() });
  localStorage.setItem("entries", JSON.stringify(entries));
  movebar();
}
function add_glasses() {
  if (bar.innerHTML === "100%") return;
  const entries_string = localStorage.getItem("entries") ?? "[]";
  const entries = JSON.parse(entries_string);
  entries.push({ amount: 0.25, time: (new Date()).toISOString() });
  localStorage.setItem("entries", JSON.stringify(entries));
  movebar();
}
