// Initialize the users array in localStorage
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([])); // Create an empty users array
        console.log("Initialized users array in localStorage");
    }
}

// Add a new user to localStorage
function addUser(newUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === newUser.email)) {
        return { success: false, message: "User with this email already exists." };
    }

    // Add the user
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
    const activeUser = localStorage.getItem('activeUser');
    return activeUser ? JSON.parse(activeUser) : null;
}

// Logout the current user
function logoutUser() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('activeUser');
    console.log("User logged out successfully.");
    window.location.href = "/login.html";
}

// Redirect to the user's profile page
function redirectToUserPage() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        window.location.href = `/users/${encodeURIComponent(currentUser.email)}`;
    } else {
        alert("You need to log in first.");
        window.location.href = "/login.html";
    }
}

// Get user data by email
function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

// Fetch current user's profile data
function loadUserProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const user = getUserByEmail(email);

    if (!user) {
        alert("User not found.");
        window.location.href = "/login.html";
        return;
    }

    // Populate the profile page with user data
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;

    // Additional fields can be populated here
    // e.g., document.getElementById('profileAge').textContent = user.profileData.age;
}

// Validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Utility function to validate password strength
function validatePassword(password) {
    // Example: Require at least 8 characters, one uppercase letter, and one number
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

// Call initializeUsers when the app starts
initializeUsers();