const mongoose = require("mongoose");
//creating a book schema
const BookSchema = mongoose.Schema({
    ISBN:Number,
    title:String,
    authors:[Number],
    language:String,
    pubdate:String,
    numofpage:Number,
    category:[String],
    publication:Number,
});

//creating dook model
const Bookmodel = mongoose.model("books",BookSchema);


module.exports =  Bookmodel;