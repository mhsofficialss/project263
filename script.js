// Set the maximum selectable birth date to today.
const birthDateInput = document.getElementById("birth-date");
const today = new Date();
birthDateInput.max = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

document.getElementById("year").textContent = today.getFullYear();

function showResult(id, message, success = true) {
  const box = document.getElementById(id);
  box.innerHTML = message;
  box.classList.toggle("success", success);
}

document.getElementById("age-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = birthDateInput.value;
  if (!value) {
    showResult("age-result", "Please select your date of birth.", false);
    return;
  }

  const birth = new Date(`${value}T00:00:00`);
  const now = new Date();
  if (Number.isNaN(birth.getTime()) || birth > now) {
    showResult("age-result", "Please enter a valid date that is not in the future.", false);
    return;
  }

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    // Day count in the previous month.
    const previousMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += previousMonthDays;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  showResult("age-result", `You are <strong>${years} years, ${months} months, and ${days} days</strong> old.`);
});

document.getElementById("rectangle-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const length = Number(document.getElementById("length").value);
  const width = Number(document.getElementById("width").value);
  if (document.getElementById("length").value.trim() === "" ||
      document.getElementById("width").value.trim() === "" ||
      !Number.isFinite(length) || !Number.isFinite(width) || length < 0 || width < 0) {
    showResult("rectangle-result", "Please enter valid non-negative values for length and width.", false);
    return;
  }
  const area = length * width;
  const perimeter = 2 * (length + width);
  showResult("rectangle-result", `Area: <strong>${area}</strong><br>Perimeter: <strong>${perimeter}</strong>`);
});

document.getElementById("even-odd-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = document.getElementById("number").value.trim();
  const number = Number(raw);
  if (raw === "" || !Number.isSafeInteger(number)) {
    showResult("even-odd-result", "Please enter a valid whole number.", false);
    return;
  }
  const kind = number % 2 === 0 ? "Even" : "Odd";
  showResult("even-odd-result", `<strong>${number}</strong> is an <strong>${kind} number</strong>.`);
});

document.getElementById("grade-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const marksInput = document.getElementById("marks");
  const marks = Number(marksInput.value);

  if (
    marksInput.value.trim() === "" ||
    !Number.isInteger(marks) ||
    marks < 0 ||
    marks > 100
  ) {
    showResult("grade-result", "Enter a whole number from 0 to 100.", false);
    return;
  }

  let grade;

  if (marks < 40) {
    grade = "F (Fail)";
  } else if (marks < 50) {
    grade = "D";
  } else if (marks < 60) {
    grade = "C";
  } else if (marks < 70) {
    grade = "B";
  } else if (marks < 80) {
    grade = "A";
  } else {
    grade = "A+";
  }

  showResult(
    "grade-result",
    `Your marks: <strong>${marks}</strong><br>
     Your grade: <strong>${grade}</strong>`
  );
});
