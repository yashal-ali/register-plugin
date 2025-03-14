# **Scient Plugin Next Registration - Authentication Library**  

**Scient Plugin Next Registration** is a flexible authentication library designed to simplify user registration, verification, password management, and authentication in Node.js applications. It provides an easy-to-use API to handle common authentication features.  

---

## **📌 Features**  
✅ User Registration  
✅ Email Verification with OTP  
✅ Secure Password Hashing  
✅ JWT-Based Authentication  
✅ Forgot & Reset Password  

---

## **📖 Installation**  
To install **Scient Plugin Next Registration**, run the following command:  
```sh
npm install https://github.com/Scient-Systems/scient-plugin-next-registration.git
```

or with Yarn:
```sh
yarn add https://github.com/Scient-Systems/scient-plugin-next-registration.git
```


## **🚀 Usage Guide**  

### **1️⃣ Register a New User**  
To register a user, call the `registerUser` function:  
```ts
import { registerUser } from "scient-plugin-next-registration";

const register = async () => {
  const response = await registerUser(
    "John",
    "Doe",
    "johndoe",
    "johndoe@example.com",
    "SecurePassword123",
    { membership: "Free", businessCards: [], contacts: [] } // Optional extra fields
  );

  console.log(response);
};

register();
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "verifyCode": "123456",
  "userId": "65f2a7b1a2c7e3f9f0d3b8e2"
}
```

---

### **2️⃣ Verify User Email**  
Users receive a 6-digit OTP for email verification.  
Call `verifyUser` to verify their account:  

```ts
import { verifyUser } from "scient-plugin-next-registration";

const verify = async () => {
  const response = await verifyUser("johndoe", "123456"); // OTP sent via email
  console.log(response);
};

verify();
```

**Response:**
```json
{
  "success": true,
  "message": "Account verified successfully!"
}
```

---

### **3️⃣ Forgot Password (Request Reset Link)**  
If a user forgets their password, generate a reset link:  

```ts
import { forgotPassword } from "scient-plugin-next-registration";

const forgot = async () => {
  const response = await forgotPassword("johndoe@example.com");
  console.log(response);
};

forgot();
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent.",
  "resetLink": "https://yourapp.com/reset-password?token=abcdef123456"
}
```

---

### **4️⃣ Reset Password**  
Once the user receives a reset link, they can update their password:  

```ts
import { resetPassword } from "scient-plugin-next-registration";

const reset = async () => {
  const response = await resetPassword("abcdef123456", "NewSecurePassword123");
  console.log(response);
};

reset();
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully."
}
```

---

### **5️⃣ Authenticate User with JWT (Login)**  
To log in and get a JWT token for authentication:  

```ts
import { loginUser } from "scient-plugin-next-registration";

const login = async () => {
  const response = await loginUser("johndoe@example.com", "SecurePassword123");
  console.log(response);
};

login();
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f2a7b1a2c7e3f9f0d3b8e2",
    "email": "johndoe@example.com",
    "userName": "johndoe"
  }
}
```


## **⚙️ Configuration**  

Set up **environment variables** in a `.env` file:  
```env
JWT_SECRET=your_jwt_secret
BASE_URL=https://yourapp.com
MONGODB_URI==your_database
```

---

## **📌 Full API Reference**  

### **registerUser()**
Registers a new user.  
**Parameters:**  
- `firstName` (string)  
- `lastName` (string)  
- `userName` (string)  
- `email` (string)  
- `password` (string)  
- `extraFields` (optional object)  

### **verifyUser()**
Verifies an account using an OTP code.  
**Parameters:**  
- `userName` (string)  
- `code` (string)  

### **forgotPassword()**
Sends a password reset link.  
**Parameters:**  
- `email` (string)  

### **resetPassword()**
Resets the user's password.  
**Parameters:**  
- `token` (string)  
- `newPassword` (string)  

### **loginUser()**
Authenticates a user and returns a JWT token.  
**Parameters:**  
- `email` (string)  
- `password` (string)  

### **authenticateJWT()**
Middleware for protected routes.  

---

## **💡 Contributing**
Feel free to submit issues and pull requests.  

---

