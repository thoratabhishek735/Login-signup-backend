const express = require('express');
const app = express();
const PORT = 5000;



// app.get('/',(req,res)=>{
//     res.send('Welcome')
// })

const mongoose = require('mongoose');
const {MONGOURL} = require('./keys');

mongoose.connect(MONGOURL,{
    useNewUrlParser: true,useUnifiedTopology: true 
})
mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on("error",(error)=>{
    console.log("cannot connected to mongodb",error)
})

//models reg
require('./models/user')


app.use(express.json());


//routes reg

app.use(require('./routes/authentication'))










app.listen(PORT,console.log(`server is running on ${PORT}`))


