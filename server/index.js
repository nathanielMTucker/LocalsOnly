const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const {createLocal, createUser, getLocal, getLocals, getUser, updateUser} = require('./resolvers');
const {getVars} = require('./env_routes');

app.use(express.static("public"))
app.use(express.json());
app.use(cors());

app.get('/api', (req, res)=>{
    res.send({express:`EXPRESS BACKEND IS RUNNING`});
});

app.use('/api', 
    createLocal, 
    createUser, 
    getLocal, 
    getLocals, 
    getUser, 
    updateUser
);

app.use((req, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));