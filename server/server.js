const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const getLocal = require('./functions/getLocal');
const getUser = require('./functions/getUser')
const getLocals = require('./functions/getLocals');
const createUser = require('./functions/createUser')
const createLocal = require('./functions/createLocal');

app.use(express.static("public"))
app.use(express.json());
app.use(cors());

app.get('/api', (req, res)=>{
    res.send({express:`EXPRESS BACKEND IS RUNNING`});
});


app.use('/api', getUser, getLocals, getLocal, createUser, createLocal);

app.use((req, res, next)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));