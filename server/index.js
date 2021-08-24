require('dotenv').config();
const {environment} = require("./config");
const port = process.env.PORT || 5001;
const express = require('express');
const path = require('path');
const cors = require('cors');
const {
    local,
    user,
    review,
    image,
    feedback
} = require('./resolvers');

const app = express();
require('express-ws')(app);
console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(cors());

if(environment().static){
    app.use(express.static(path.join(__dirname, 'build')))
}

app.use('/api/v1',
    local,
    user,
    review,
    image,
    feedback
);



app.ws('/echo', (ws, req)=>{
    ws.on('message', (msg)=>{
        ws.send(msg)
    });
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));