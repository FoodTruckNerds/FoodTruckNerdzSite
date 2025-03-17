// default theme is light
const checkbox = document.getElementById("night-toggle-checkbox"); // set toggle button to light mode
const body = document.body; // used for accessing body to set dark-theme class
let theme = localStorage.getItem("theme") || "light"; // Load theme from local storage or use default light theme
applyTheme(theme);

// Ensure the checkbox reflects the current theme
if (theme === 'light') {
  checkbox.checked = true;
}

// Handle button click event
document.getElementById("night-toggle").addEventListener("click", toggleDarkTheme); // register 'toggleDarkTheme' as event handler for button click event;

function toggleDarkTheme() {
  theme = (theme === 'light' ? 'dark' : 'light'); // '===' boolean check, with '?' ternary operator logic
  applyTheme(theme);
  localStorage.setItem("theme", theme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add("dark-theme");
    checkbox.checked = false;
  } else {
    body.classList.remove("dark-theme");
    checkbox.checked = true;
  }
}
