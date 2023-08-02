const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nandishmohanty:Mohanty1818@cluster0.vugqe6n.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to MongoDB'));

db.once('open',function(){
    console.log("Connected to Database");
})