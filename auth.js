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

    // Check if email already exists
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
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Store authenticated session
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

// Redirect to the user's profile page after login
function redirectToUserPage() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Redirect to user-specific portal page
        window.location.href = `user.html?email=${encodeURIComponent(currentUser.email)}`;
    } else {
        alert("You need to log in first.");
        window.location.href = "login.html";
    }
}

// Fetch user data by email
function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

// Populate the user's profile page
function loadUserProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const user = getUserByEmail(email);

    if (!user) {
        alert("User not found.");
        window.location.href = "login.html";
        return;
    }

    // Populate the profile page with user data
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;

    // Additional profile details (example)
    if (user.profileData) {
        document.getElementById('profileAge').textContent = user.profileData.age || "Not provided";
        document.getElementById('profilePreferences').textContent = JSON.stringify(user.profileData.preferences, null, 2);
    }
}

// Ensure users array is initialized on load
initializeUsers();