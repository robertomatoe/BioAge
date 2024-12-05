// Initialize the users array in localStorage
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([])); // Create an empty users array
        console.log("Initialized users array in localStorage");
    }
}

// Call this function once when the app starts
initializeUsers();