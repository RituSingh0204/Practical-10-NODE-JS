const https = require("https");
const fs = require("fs");

const options = {
  hostname: "localhost",
  port: 8443,
  path: "/",
  method: "GET",
  key: fs.readFileSync("client.key"),
  cert: fs.readFileSync("client.crt"),
  ca: fs.readFileSync("ca.crt"),
  rejectUnauthorized: true
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => console.log(data));
});

req.on("error", (err) => console.error("Error:", err));
req.end();
