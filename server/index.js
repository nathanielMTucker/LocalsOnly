require('dotenv').config();
const port = process.env.PORT || 5001;
const express = require('express');
const path = require('path');
const cors = require('cors');
const {
    local,
    user,
    review,
    image
} = require('./resolvers');

const app = express();
require('express-ws')(app);

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// app.use( (req,res, next)=>{
//     if(!req.headers.authorization){
//         return res.status(403).json({error: 'No credentials sent!'});
//     }
//     next();
// })

app.use('/api/v1',
    local,
    user,
    review,
    image
);

app.use((req, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
});

app.ws('/echo', (ws, req)=>{
    ws.on('message', (msg)=>{
        ws.send(msg)
    });
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));