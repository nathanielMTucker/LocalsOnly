const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const cors = require('cors');
const {
    local,
    user,
    review,
    image
} = require('./resolvers');

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use('/api/v1',
    local,
    user,
    review,
    image
);

app.use((req, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
});

const port = process.env.PORT || 5001;
app.listen(port, ()=>console.log(`Listening on port ${port}`));