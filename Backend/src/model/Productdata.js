const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Library1');
const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    imageUrl : String
});

var Productdata = mongoose.model('book', NewProductSchema);                        //UserData is the model and NewBookData is the schema

module.exports = Productdata;