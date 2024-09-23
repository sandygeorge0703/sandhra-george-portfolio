document.querySelector("form").addEventListener("submit", sendForm);

async function sendForm(event) {
  // rest of your code
  event.preventDefault();

  console.log("sendForm function is running");

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const data = { name, message };

  try {
    const response = await fetch("http://127.0.0.1:3000/send-email", {
      // Change this line
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Message sent successfully!");
    } else {
      alert("Failed to send message.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred.");
  }
}
