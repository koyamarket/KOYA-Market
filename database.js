// Firebase config
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
  
  // Get the form element
  const contactForm = document.getElementById("contact-form");
  
  if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
          e.preventDefault(); // Prevent page reload
  
          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("email").value.trim();
          const message = document.getElementById("message").value.trim();
  
          if (!name || !email || !message) {
              alert("Please fill out all fields.");
              return;
          }
  
          try {
              await db.collection("messages").add({
                  name,
                  email,
                  message,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });
  
              alert("Message sent successfully!");
              contactForm.reset();
          } catch (error) {
              console.error("Firestore Error:", error);
              alert("Failed to send message.");
          }
      });
  } else {
      console.error("Form not found. Check if 'contact-form' exists in HTML.");
  }
  
