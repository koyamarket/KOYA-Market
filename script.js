document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
  
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p>${product.description}</p>
        <a href="${product.amazonUrl}" target="_blank" class="btn">Buy Now</a>`;
  
      productsContainer.appendChild(productCard);
    });
  });




// Firebase initialization (Ensure Firebase SDK is included in HTML)
const firebaseConfig = {
  apiKey: "AIzaSyCytfUalkyFrowHedfmSAtEEJTAJZAsFe4",
  authDomain: "users-messages-koyamarket.firebaseapp.com",
  projectId: "users-messages-koyamarket",
  storageBucket: "users-messages-koyamarket.appspot.com",
  messagingSenderId: "524030311376",
  appId: "1:524030311376:web:3d6883aec69b3d7b7397d5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to get visitor details (IP, location, etc.)
async function getVisitorData() {
    try {
        const response = await fetch("https://ipapi.co/json/"); // Get IP and location
        const data = await response.json();
        return {
            ip: data.ip,
            country: data.country_name,
            city: data.city,
            region: data.region,
            isp: data.org,
            device: navigator.userAgent
        };
    } catch (error) {
        console.error("Error fetching visitor data:", error);
        return null;
    }
}

// Function to store visitor data (ensuring unique IPs)
async function storeVisitorData() {
    const visitorData = await getVisitorData();
    if (!visitorData) return;

    const docRef = db.collection("visitors").doc(visitorData.ip); // Store by IP (prevent duplicates)
    
    const doc = await docRef.get();
    if (!doc.exists) {
        await docRef.set({
            ...visitorData,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("✅ New visitor logged:", visitorData);
    } else {
        console.log("⚠️ Visitor already exists:", visitorData.ip);
    }
}

// Call the function on page load
storeVisitorData();
