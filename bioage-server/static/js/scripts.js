document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bioage-form");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Convert form data to numbers
        for (let key in data) {
            data[key] = parseFloat(data[key]);
        }

        try {
            // Send data to the API
            const response = await fetch("http://127.0.0.1:5001/api/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const result = await response.json();

            // Display the result
            resultDiv.innerHTML = `<p>Your predicted biological age is: <strong>${result.predicted_age}</strong> years</p>`;
        } catch (error) {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    });
});