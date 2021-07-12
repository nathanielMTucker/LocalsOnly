const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const cors = require('cors');
const {
    createLocal, 
    createUser, 
    getLocal, 
    getLocals, 
    getUser, 
    updateUser,
    getReviews,
    createReview
} = require('./resolvers');



const app = express();



app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use('/api', 
    createLocal, 
    createUser, 
    getLocal, 
    getLocals, 
    getUser, 
    updateUser,
    getReviews,
    createReview
);

app.use((req, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
});

const port = process.env.PORT || 5001;
app.listen(port, ()=>console.log(`Listening on port ${port}`));