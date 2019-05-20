const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// const mongoose = require('mongoose');
const cors = require('cors');
var route = require('./route/mongodb');
const app = express();

app.use(cors());
app.use(route);
// // connect to mlab database
// mongoose.connect('mongodb+srv://bella:B123456@cluster0-gk0g4.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
// mongoose.connection.once('open',()=>{
//     console.log('connected to database');
// })

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(4000, ()=>{
    console.log('now listening for request on port 4000');
});