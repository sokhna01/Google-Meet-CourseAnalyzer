let app = require("express")();
let morgan = require("morgan");
let dotenv = require("dotenv");
let bodyParser = require("body-parser");
let seanceRouter = require("./routes/seance.route").router;
let participantRouter = require("./routes/participant.route").router;
let db_connector = require("./repository/db.js").connect;
dotenv.config();
const PORT = process.env.PORT || 8081;

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(seanceRouter);
app.use(participantRouter);

db_connector();

//start server on PORT
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});