// Initialize the users array in localStorage
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([])); // Create an empty users array
        console.log("Initialized users array in localStorage");
    }
}

// Add a new user to localStorage
function addUser(newUser) {
    const users = JSON.parse(localStorage.getItem('users'));

    // Check if the email already exists
    if (users.some(user => user.email === newUser.email)) {
        return { success: false, message: "User with this email already exists." };
    }

    // Add the new user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: "User registered successfully!" };
}

// Authenticate a user during login
function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Store the authenticated session
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('activeUser', JSON.stringify(user));
        return { success: true, message: "Login successful!" };
    }

    return { success: false, message: "Invalid email or password." };
}

// Get the currently logged-in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('activeUser'));
}

// Logout the current user
function logoutUser() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('activeUser');
    console.log("User logged out successfully.");
}

// Redirect to the user's profile page
function redirectToUserPage() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const email = encodeURIComponent(currentUser.email);
        window.location.href = `/user.html?email=${email}`;
    } else {
        alert("You need to log in first.");
        window.location.href = "/login.html";
    }
}

// Fetch user data by email
function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.find(user => user.email === email);
}

// Load user profile dynamically in user.html
function loadUserProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (!email) {
        alert("No email specified.");
        window.location.href = "/login.html";
        return;
    }

    const user = getUserByEmail(email);

    if (!user) {
        alert("User not found.");
        window.location.href = "/login.html";
        return;
    }

    // Populate profile details
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;

    // Optional: Display additional profile data (e.g., preferences)
    if (user.profileData) {
        const { age, preferences } = user.profileData;
        document.getElementById('profileAge').textContent = age || "Not specified";
        document.getElementById('profilePreferences').textContent = JSON.stringify(preferences, null, 2);
    }
}

// Initialize the users array when the script loads
initializeUsers();