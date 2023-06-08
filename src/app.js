import express from "express";
import expressHandlebars from "express-handlebars";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import config from "./../config.json";
import router from "./router";
import init from "./init";
import handlebars from "./handlebars";

const app = express();
const port = 3000;
const port8080 = 8080; // New port for the additional website
handlebars();

// Connect to Database
const databaseUri = config.database.uri;
const databaseOptions = config.database.options;
mongoose.connect(databaseUri, databaseOptions, async (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("MongoDB connected");

  // Creates Default Data
  init();
});

// Set Template Engine
app.engine("handlebars", expressHandlebars({
  layoutsDir: __dirname + "/../views/layouts/",
  partialsDir: __dirname + "/../views"
}));
app.set("view engine", "handlebars");

// Set Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(router);

// Error Handling 404, 500
app.use((req, res, next) => {
  console.warn("404 Page Not Found", req.url);
  res.sendStatus(404);
  return;
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
  return;
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});

// Additional website on port 8080
const app8080 = express();

app8080.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html>
  <head>
    <title>Sample Web Page with Article and Ad Zones</title>
    <style>
      .ad-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1px;
        align-items: center;
      }
      .ad-zone {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <h1>Sample Web Page with Article and Ad Zones</h1>
    <p>This is a sample web page with an article and ad zones.</p>
    <!-- Ad Banner area start -->
    <iframe class="ad-zone" src="http://localhost:3000/adserve?zone_id=20&type=iframe" width="728" height="90" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe> 
    <!-- Ad Banner area end -->
    <h2>Article Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla vel tincidunt lacinia, velit velit ultricies velit, vel bibendum justo diam vel justo. Nullam euismod, velit vel tincidunt lacinia, velit velit ultricies velit, vel bibendum justo diam vel justo. Nullam euismod, velit vel tincidunt lacinia, velit velit ultricies velit, vel bibendum justo diam vel justo.</p>
    <div class="ad-container">
      <!-- Ad Banner area start -->
      <iframe class="ad-zone" src="http://localhost:3000/adserve?zone_id=21&type=iframe" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe> 
      <!-- Ad Banner area end -->
      <!-- Ad Banner area start -->
      <iframe class="ad-zone" src="http://localhost:3000/adserve?zone_id=22&type=iframe" width="180" height="160" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe> 
      <!-- Ad Banner area end -->
      <!-- Ad Banner area start -->
      <iframe class="ad-zone" src="http://localhost:3000/adserve?zone_id=23&type=iframe" width="180" height="160" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe> 
      <!-- Ad Banner area end -->
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla vel tincidunt lacinia, velit velit ultricies velit, vel bibendum justo diam vel justo. Nullam euismod, velit vel tincidunt lacinia, velit velit ultricies velit, vel bibendum justo diam vel justo. Nullam euismod, velit vel tincidunt lacinia, velit velit ultricies velit, vel bibendum justo diam vel justo.</p>
    <!-- Ad Banner area start -->
    <iframe class="ad-zone" src="http://localhost:3000/adserve?zone_id=24&type=iframe" width="728" height="90" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe> 
    <!-- Ad Banner area end -->

  </body>
</html>
  `);
});

app8080.listen(port8080, () => {
  console.log("Additional website is running on port", port8080);
});
