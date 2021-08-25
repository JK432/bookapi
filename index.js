require("dotenv").config();
const express = require("express");
const mongoose = require ("mongoose");
const database = require("./database/index")

//models
const BookModels = require("./database/book")
const AuthorModels = require("./database/authors")
const PublicationModels = require("./database/publications");
const PublicationModel = require("./database/publications");
const Bookmodel = require("./database/book");
const AuthorModel = require("./database/authors");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

const app = express();
app.use(express.json());
// database connection
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log("conection estableshed"));

//intialising microservices

app.use("/book",Books);
app.use("/authors",Authors);
app.use("/publications",Publications);




//library
