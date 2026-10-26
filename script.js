
/* ===== MOBILE NAVIGATION ===== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


/* ===== URL VALIDATION ===== */

const shortenForm = document.querySelector("#shorten-form");
const urlInput = document.querySelector("#url-input");
const errorMessage = document.querySelector("#error-message");

// Display validation errors
function showError(message) {
  errorMessage.textContent = message;
  urlInput.classList.add("input-error");
  urlInput.setAttribute("aria-invalid", "true");
}

// Clear validation errors
function clearError() {
  errorMessage.textContent = "";
  urlInput.classList.remove("input-error");
  urlInput.removeAttribute("aria-invalid");
}

// Validate URL format
function isValidUrl(value) {
  try {
    const url = new URL(value);

    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

// Clear errors when the user edits the input
urlInput.addEventListener("input", clearError);


/* ===== SHORTENED URL RESULTS ===== */

const resultsContainer = document.querySelector("#results");

/* ===== LOCAL STORAGE ===== */

const STORAGE_KEY = "shortlyLinks";

// Save a shortened URL
function saveLink(originalUrl, shortenedUrl) {
  const savedLinks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const newLink = {
    originalUrl,
    shortenedUrl
  };

  savedLinks.push(newLink);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(savedLinks)
  );
}

// Load saved URLs when the page opens
function loadLinks() {
  const savedLinks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  savedLinks.forEach((link) => {
    displayResult(
      link.originalUrl,
      link.shortenedUrl
    );
  });
}

// Display the original and shortened URLs
function displayResult(originalUrl, shortenedUrl) {
  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");

  const originalLink = document.createElement("p");
  originalLink.classList.add("original-url");
  originalLink.textContent = originalUrl;

  const resultActions = document.createElement("div");
  resultActions.classList.add("result-actions");

  const shortLink = document.createElement("a");
  shortLink.classList.add("shortened-url");
  shortLink.href = shortenedUrl;
  shortLink.textContent = shortenedUrl;
  shortLink.target = "_blank";
  shortLink.rel = "noopener noreferrer";

  const copyButton = document.createElement("button");
  copyButton.classList.add("btn", "copy-btn");
  copyButton.type = "button";
  copyButton.textContent = "Copy";

  // Copy shortened URL to clipboard
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);

      copyButton.textContent = "Copied!";
      copyButton.classList.add("copied");

      setTimeout(() => {
        copyButton.textContent = "Copy";
        copyButton.classList.remove("copied");
      }, 2000);

    } catch (error) {
      console.error("Unable to copy link:", error);
      copyButton.textContent = "Copy failed";
    }
  });

  resultActions.append(shortLink, copyButton);
  resultItem.append(originalLink, resultActions);
  resultsContainer.prepend(resultItem);
}


/* ===== BITLY API INTEGRATION ===== */

shortenForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = urlInput.value.trim();

  // Check for empty input
  if (url === "") {
    showError("Please add a link");
    return;
  }

  // Check URL format
  if (!isValidUrl(url)) {
    showError("Please enter a valid URL");
    return;
  }

  clearError();

  const submitButton = shortenForm.querySelector(
    'button[type="submit"]'
  );

  // Disable button during API request
  submitButton.disabled = true;
  submitButton.textContent = "Shortening...";

  try {
    // Call Netlify serverless function
    const response = await fetch(
      "/.netlify/functions/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: url,
        }),
      }
    );

    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      throw new Error(
        data.error || "Unable to shorten URL"
      );
    }

// Display actual Bitly result
displayResult(
  data.originalUrl,
  data.shortenedUrl
);

// Save the result to localStorage
saveLink(
  data.originalUrl,
  data.shortenedUrl
);

    // Clear input after success
    urlInput.value = "";

  } catch (error) {
    showError(error.message);
    console.error("Shortening failed:", error);

  } finally {
    // Restore button
    submitButton.disabled = false;
    submitButton.textContent = "Shorten It!";
  }
});
/* ===== INITIALIZE APPLICATION ===== */

loadLinks();