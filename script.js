// ===== Stage 5a: price and time calculator =====
// Prices and times for each dog size (requirement F3)
const services = {
  small:  { price: 30, minutes: 60 },
  medium: { price: 40, minutes: 90 },
  large:  { price: 55, minutes: 120 }
};
 
// Find the parts of the page we need
const form = document.getElementById("booking-form");
const sizeBox = document.getElementById("size");
const summary = document.getElementById("summary");
const message = document.getElementById("message");
 
// When the dog size changes, show the price and time
sizeBox.addEventListener("change", function () {
  const choice = services[sizeBox.value];
  if (choice) {
    summary.textContent = "Price: £" + choice.price + " · Time: " + choice.minutes + " minutes";
  } else {
    summary.textContent = "Choose a size to see the price and time.";
  }
});

// ===== Stage 5b: check the form before it is sent =====
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
 
  // 1. Read what the user typed
  const owner = document.getElementById("owner").value.trim();
  const phone = document.getElementById("phone").value.replace(/\s/g, ""); // remove spaces
  const dog = document.getElementById("dog").value.trim();
  const size = sizeBox.value;
  const dateText = document.getElementById("date").value;
 
  // 2. Check each value and collect any problems
  const errors = [];
 
  if (owner === "") {
    errors.push("Please enter your name.");
  }
  if (!/^07[0-9]{9}$/.test(phone)) {
    errors.push("Please enter a UK mobile number, e.g. 07700 900123.");
  }
  if (dog === "") {
    errors.push("Please enter your dog's name.");
  }
  if (size === "") {
    errors.push("Please choose your dog's size.");
  }
  if (dateText === "") {
    errors.push("Please choose a date.");
  } else {
    const chosen = new Date(dateText + "T00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) {
      errors.push("The date cannot be in the past.");
    }
  }
 
  // 3. Show the errors, or a confirmation
  message.textContent = ""; // clear any old message
 
  if (errors.length > 0) {
    message.className = "message error";
    const list = document.createElement("ul");
    for (const text of errors) {
      const item = document.createElement("li");
      item.textContent = text;
      list.appendChild(item);
    }
    message.appendChild(list);
  } else {
    const choice = services[size];
    const niceDate = new Date(dateText + "T00:00").toLocaleDateString("en-GB",
      { weekday: "long", day: "numeric", month: "long" });
    message.className = "message success";
    message.textContent = "Thanks, " + owner + "! We have your request for " + dog +
      " on " + niceDate + " (" + choice.minutes + " minutes, £" + choice.price +
      "). We will text you to confirm.";
    form.reset();
    summary.textContent = "Choose a size to see the price and time.";
  }
});
