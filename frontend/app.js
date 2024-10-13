// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  // Handle form submission
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Gather form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Message sent successfully!");
        contactForm.reset(); // Reset the form after submission
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }

    // Load data from the backend after form submission
    loadData();
  });

  // Function to load data from the backend
  async function loadData() {
    try {
      const response = await fetch("http://localhost:3000/api/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Display data on the frontend
      const featuresSection = document.getElementById("features");
      const featureList = document.createElement("ul");

      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name}: ${item.description}`;
        featureList.appendChild(listItem);
      });

      featuresSection.appendChild(featureList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Load data on page load
  loadData();
});
