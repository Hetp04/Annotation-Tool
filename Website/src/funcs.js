// Import necessary Firebase functions
import { database, auth } from './firebase-init';
import { ref, get, set, update, onValue } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// Add global username variable
export let currentUsername = "Guest";
export let currentCompanyEmail = "";
export let isLoggedIn = false;

// Function to generate a unique ID for shared chats
export function generateUniqueId(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

// Function to initialize and listen for username changes
export function initUsernameFetcher() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            isLoggedIn = true;
            try {
                // Get company email for the user
                const userEmail = user.email.replace(".", ",");
                currentCompanyEmail = await getFirebaseData(`emailToCompanyDirectory/${userEmail}`);

                if (currentCompanyEmail) {
                    // Fetch username from the company directory
                    const userData = await getFirebaseData(`Companies/${currentCompanyEmail}/${userEmail}`);
                    if (userData && userData.name) {
                        currentUsername = userData.name;
                    } else {
                        currentUsername = user.email.split('@')[0]; // Fallback to email prefix
                    }
                } else {
                    currentUsername = user.email.split('@')[0]; // Fallback to email prefix
                }
            } catch (error) {
                console.error("Error fetching username:", error);
                currentUsername = "User";
            }
        } else {
            currentUsername = "Guest";
            currentCompanyEmail = "";
            isLoggedIn = false;
        }
    });
}

export async function getFirebaseData(path) {
    // Create a reference to the specified path in the database
    const dbRef = ref(database, path);

    // Return a promise that resolves with the data at the specified path
    return get(dbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log(`No data available at path: ${path}`);
                return null;
            }
        })
        .catch((error) => {
            console.error(`Error getting data at path ${path}:`, error);
            throw error;
        });
}

export function saveFirebaseData(path, data) {
    // Create a reference to the specified path in the database
    const dbRef = ref(database, path);

    // Use set() to write data to the specified path
    return set(dbRef, data)
        .then(() => {
            console.log(`Data successfully saved at path: ${path}`);
            return true;
        })
        .catch((error) => {
            console.error(`Error saving data at path ${path}:`, error);
            throw error;
        });
}

export async function firebaseCreateAccount(email, password, inviteCode, username) {
    var companyEmail = email;
    if (inviteCode && inviteCode != "") {
        var invitingCompany = await getFirebaseData(`inviteCodes/${inviteCode}/companyEmail`);
        if (invitingCompany && invitingCompany != "") {
            companyEmail = invitingCompany;
            saveFirebaseData(`inviteCodes/${inviteCode}`, null);
        }
        else {
            console.error("Invalid invite code");
            showToast("Invalid invite code", "error");
            throw new Error("Invalid invite code");
        }
    }
    // Create a new user account with email and password
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // User account created successfully
            const user = userCredential.user;
            console.log("User account created successfully:", user.uid);
            saveFirebaseData(`Companies/${companyEmail.replace(".", ",")}/${email.replace(".", ",")}`,
                {
                    createdAt: new Date().toISOString(),
                    email: email,
                    name: username
                });
            saveFirebaseData(`emailToCompanyDirectory/${email.replace(".", ",")}`, companyEmail.replace(".", ","));
            var defaultProject = await getFirebaseData(`Companies/${companyEmail.replace(".", ",")}/projects/default`);
            if (!defaultProject) {
                saveFirebaseData(`Companies/${companyEmail.replace(".", ",")}/projects/default`, {
                    name: "default",
                    created: new Date().toISOString()
                });
            }
            window.location.href = '/';
            return user;
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Failed to create account: ${errorCode} - ${errorMessage}`);
            showToast(errorMessage, "error");
            throw error;
        });
}

export function firebaseLogin(email, password) {
    // Sign in a user with email and password
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log("User signed in successfully:", user.uid);
            // Navigate to the home page after successful login
            window.location.href = '/';
            return user;
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Failed to sign in: ${errorCode} - ${errorMessage}`);
            showToast("Failed to sign in", "error");
            throw error;
        });
}

export function showToast(message, type) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast with animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Hide and remove toast after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}