const express = require("express");
const app = express();
const bodyParser = require('body-parser');


app.use(express.static("./public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get("*", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});



const port = 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
