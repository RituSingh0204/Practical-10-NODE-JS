# Secure mTLS Server with Live Certificate Update

###  Author
**Name:** Ritu Singh  
**Roll No:** GF202346594  
**Course:** BCA Full Stack (Final Year)

---

##  About the Project
This project demonstrates how to create a **secure Node.js server** using **Mutual TLS (mTLS)**.  
The server validates client certificates and reloads SSL files automatically when updated — no restart needed!

---

##  Key Features
- Mutual TLS verification (server & client authenticated)  
-  Auto-refresh of TLS certificates using `fs.watch()`  
-  Simple implementation using Node.js built-ins  

---

##  How to Run
1. Open VS Code and **create a folder** named `mtls-server`.  
2. Add a file `mtls-server.js` and paste your Node.js code.  
3. Place these certificate files in the same folder:  
   - `server-cert.pem`  
   - `server-key.pem`  
   - `ca-cert.pem`  
4. Run in terminal:
   ```bash
   node mtls-server.js
   ```
5. Visit **https://localhost:8443** to test.  
   If you update or replace certificates, the server reloads automatically.

---

##  Folder Layout
```
mtls-server/
│
├── mtls-server.js
├── server-cert.pem
├── server-key.pem
├── ca-cert.pem
└── README.md
```

---

##  Usage Tip
Use this project to explore secure communication where **both server and client verify each other’s identity**.

---

##  Built With
- Node.js  
- Native HTTPS  
- File System (fs) module  

---

> This project gave me hands-on experience with mutual TLS authentication and secure server configuration.  
> – **Ritu Singh**
