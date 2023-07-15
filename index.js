const express = require('express');
// const {user_router} = require('./routes/spectateRouter')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const adminroutes = require('./routes/AdminRoutes');
const employeeroutes = require('./routes/EmployeerRoutes');
const userrouter = require('./routes/UserRoutes')
app.use('/admin' ,adminroutes );
app.use('/employee' , employeeroutes)

app.use('/user' , userrouter)

app.get('/' , (req,res)=>{
    res.send('Home page')
})
// app.use('/spectate' , user_router);
app.listen(8000 , ()=>{
    console.log('App listening at port 8000....')
})
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});