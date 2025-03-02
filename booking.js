// ✅ Firebase Configuration (Same as Contact Page)
const firebaseConfig = {
    apiKey: "AIzaSyCytfUalkyFrowHedfmSAtEEJTAJZAsFe4",
    authDomain: "users-messages-koyamarket.firebaseapp.com",
    projectId: "users-messages-koyamarket",
    storageBucket: "users-messages-koyamarket.appspot.com",
    messagingSenderId: "524030311376",
    appId: "1:524030311376:web:16b0969316fdc5577397d5",
    measurementId: "G-3EPBVVXBB0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Get Product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("id");

// ✅ Ensure Product Data is Available
if (!productName) {
    alert("Invalid product selection!");
    window.location.href = "index.html"; // Redirect if ID is invalid
}

// ✅ Handle Form Submission
document.getElementById("purchase-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form reload

    // ✅ Get Form Data
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gmail = document.getElementById("gmail").value.trim();

    if (!name || !phone || !gmail) {
        alert("⚠️ Please fill in all the fields.");
        return;
    }

    // ✅ Store Order Data in Firestore (`bookings` Collection)
    try {
        await db.collection("bookings").add({
            name,
            phone,
            gmail,
            productName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("✅ Order submitted successfully!");
        document.getElementById("purchase-form").reset(); // Clear form
    } catch (error) {
        console.error("🔥 Firestore Error:", error);
        alert("❌ Order submission failed.");
    }
});
