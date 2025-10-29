
const fs = require("fs");
const https = require("https");
const tls = require("tls");
const path = require("path");


const files = {
  key: path.join(__dirname, "server.key"),
  cert: path.join(__dirname, "server.crt"),
  ca: path.join(__dirname, "ca.crt"),
};


function readCerts() {
  return {
    key: fs.readFileSync(files.key),
    cert: fs.readFileSync(files.cert),
    ca: fs.readFileSync(files.ca),
  };
}


let certData = readCerts();

const options = {
  key: certData.key,
  cert: certData.cert,
  ca: certData.ca,
  requestCert: true,       
  rejectUnauthorized: true, 
};


const server = https.createServer(options, (req, res) => {
  const client = req.socket.getPeerCertificate();
  const status = req.socket.authorized ? "✅ Authorized" : "❌ Unauthorized";

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Hello from mTLS server!\nStatus: ${status}\nClient: ${client.subject?.CN || "None"}\n`);
});

server.listen(8443, () => {
  console.log(" Server running on https://localhost:8443");
  console.log(" Client certificate required");
});


function reloadCerts() {
  try {
    certData = readCerts();
    const newContext = tls.createSecureContext(certData);
    server.setSecureContext(newContext);
    console.log(" Certificates reloaded successfully!");
  } catch (err) {
    console.error(" Error reloading certs:", err.message);
  }
}


["server.crt", "server.key", "ca.crt"].forEach((file) => {
  fs.watch(file, () => {
    console.log(` Change detected in ${file}. Reloading...`);
    setTimeout(reloadCerts, 200); 
  });
});


process.on("SIGINT", () => {
  console.log("\n Shutting down...");
  server.close(() => process.exit(0));
});
