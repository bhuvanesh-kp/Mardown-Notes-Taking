const mongoose = require('mongoose');

require('dotenv').config();
const app = require("./app");

mongoose.connect(process.env.DATABASE).then(()=>console.log("Database connection is established"));

app.listen(process.env.PORT , ()=>{
    console.log(`listening to port ${process.env.PORT}`);
})