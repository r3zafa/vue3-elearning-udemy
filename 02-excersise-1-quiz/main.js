const bodyClasses = [
  "min-h-screen",
  "min-w-screen",
  "flex",
  "flex-col",
  "justify-start",
  "items-start",
  "bg-white",
  "dark:bg-gray-800",
  "text-gray-900",
  "dark:text-white",
];

const navClasses = [
  "bg-gray-100",
  "dark:bg-gray-700",
  "w-full",
  "px-12",
  "py-6",
  "flex",
  "justify-between",
  "items-center",
  "shadow-md",
];

const modeBtnClasses = [
  "h-12",
  "w-12",
  "rounded-lg",
  "p-2",
  "text-violet-700",
  "hover:bg-violet-700",
  "hover:text-gray-100",
  "dark:text-yellow-500",
  "dark:hover:bg-yellow-500",
  "dark:hover:text-gray-700",
  "transition",
  "duration-200",
  "ease-in-out",
];

// Apply the saved theme on page load
(function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    // Apply the saved theme (manual preference takes precedence)
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  } else {
    // Default to system preference if no saved theme exists
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }

  // Listen for system theme changes and apply them only if no manual preference exists
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    });
})();

function modeSwitch() {
  const htmlElement = document.documentElement;
  // Check if the user has already set a preference
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light"); // Save preference
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark"); // Save preference
  }
}

document.querySelector(".body").classList.add(...bodyClasses);
document.querySelector(".nav").classList.add(...navClasses);
document.querySelector(".mode-btn").classList.add(...modeBtnClasses);
