const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
  } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
  }
});

if (darkModeToggle.checked) {
  toggleDarkMode();
}

// Function to toggle dark mode
function toggleDarkMode() {
  if (darkModeToggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
  } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
  }
}

// Event listener for the dark mode toggle switch
darkModeToggle.addEventListener("change", toggleDarkMode);