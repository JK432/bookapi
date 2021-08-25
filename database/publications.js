const mongoose = require("mongoose");
const PublicationSchema = mongoose.Schema({

    id:Number,
    name:String,
    books:[Number],

})
 
PublicationModel = mongoose.model("publications",PublicationSchema);
module.exports =PublicationModel;