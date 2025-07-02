// default theme is light
// Get references to elements
const checkbox = document.getElementById("night-toggle-checkbox");
const rootElement = document.documentElement; // Target the <html> element
// Use the 'theme' variable already declared in the inline script in index.html
theme = localStorage.getItem("theme") || "light"; // Load theme or default (re-assign, don't re-declare)

console.log("Initial theme loaded:", theme);
applyTheme(theme); // Apply the initial theme

// Ensure the checkbox reflects the current theme
if (theme === 'light') {
  checkbox.checked = true;
}

// Handle button click event
// Use the checkbox itself for the event listener for better reliability
if (checkbox) {
  checkbox.addEventListener("change", toggleDarkTheme); // Listen for 'change' on the checkbox
  console.log("Event listener added to checkbox.");
} else {
  console.error("Could not find checkbox element #night-toggle-checkbox");
}

function toggleDarkTheme() {
  // Determine the new theme based on the checkbox state directly
  theme = checkbox.checked ? 'light' : 'dark';
  console.log("Theme toggled via checkbox. New theme:", theme);
  applyTheme(theme);
  localStorage.setItem("theme", theme); // Save the new theme
}

function applyTheme(newTheme) {
  console.log("Applying theme:", newTheme);

  // --- Apply to main document ---
  rootElement.classList.remove("dark-theme", "light-theme"); // Remove both possibilities
  if (newTheme === 'dark') {
    rootElement.classList.add("dark-theme");
    if (checkbox) checkbox.checked = false; // Uncheck for dark mode
    console.log("Applied dark-theme class to main <html>.");
  } else {
    // Optionally add a light-theme class if needed, or just remove dark-theme
    if (checkbox) checkbox.checked = true; // Check for light mode
    console.log("Removed dark-theme class from main <html> (light theme).");
  }

  // --- Apply to checkin iframe ---
  const checkinIframe = document.querySelector('#checkin iframe');
  if (checkinIframe) {
    const applyToIframeContent = () => {
      try {
        const iframeDoc = checkinIframe.contentDocument || checkinIframe.contentWindow?.document;
        if (iframeDoc && iframeDoc.documentElement) {
          iframeDoc.documentElement.classList.remove("dark-theme", "light-theme");
          if (newTheme === 'dark') {
            iframeDoc.documentElement.classList.add("dark-theme");
            console.log("Applied dark-theme class to checkin iframe <html>.");
          } else {
            console.log("Removed dark-theme class from checkin iframe <html> (light theme).");
          }
        } else {
          console.warn("Checkin iframe document not accessible yet for theme application.");
        }
      } catch (e) {
        // Catch potential cross-origin issues if src changes later
        console.error("Error applying theme to checkin iframe content:", e);
      }
    };

    // Check if iframe is already loaded, otherwise wait for onload
    if (checkinIframe.contentDocument && checkinIframe.contentDocument.readyState === 'complete') {
      applyToIframeContent();
    } else {
      checkinIframe.onload = applyToIframeContent;
      console.log("Set onload handler for checkin iframe theme application.");
    }
  } else {
    console.warn("Could not find checkin iframe to apply theme.");
  }

  // --- Apply to map iframe ---
  const mapIframe = document.querySelector('#map iframe');
  if (mapIframe) {
    const applyToMapIframeContent = () => {
      try {
        const iframeDoc = mapIframe.contentDocument || mapIframe.contentWindow?.document;
        if (iframeDoc && iframeDoc.documentElement) {
          iframeDoc.documentElement.classList.remove("dark-theme", "light-theme");
          if (newTheme === 'dark') {
            iframeDoc.documentElement.classList.add("dark-theme");
            console.log("Applied dark-theme class to map iframe <html>.");
          } else {
            console.log("Removed dark-theme class from map iframe <html> (light theme).");
          }
          // Note: This won't change the map tiles themselves, only the surrounding UI defined in map/index.html's styles.
        } else {
          console.warn("Map iframe document not accessible yet for theme application.");
        }
      } catch (e) {
        console.error("Error applying theme to map iframe content:", e);
      }
    };

    // Check if iframe is already loaded, otherwise wait for onload
    if (mapIframe.contentDocument && mapIframe.contentDocument.readyState === 'complete') {
      applyToMapIframeContent();
    } else {
      mapIframe.onload = applyToMapIframeContent;
      console.log("Set onload handler for map iframe theme application.");
    }
  } else {
    console.warn("Could not find map iframe.");
  }
}
