console.log('Hello Student Backend Developer');
const { ApolloServer, gql } = require('apollo-server');
const graphqlSchema = require('./graphql/Schema/Index');
const graphqlResolvers = require('./graphql/resolvers/index');
const decryptJWT = require('./utils/decryptJWT');

const crypto = require('crypto');


const mongoose = require('mongoose');



//----------------------doteenv files and variables -----------------------
const dotenv = require('dotenv');
dotenv.config();
const DB = process.env.DB;


//--------------------------------------------------------------------------



//-----------------------------------Connecting the Database -----------------

mongoose.connect(DB, 
    ()=>
    {
        console.log("Database is connected successfully")
    })



//---------------------------------------------------------------------------------

// console.log(crypto.randomBytes(226).toString('hex'));


//-------------------Sample Datasets--------------------
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];


  //----------------------------------------------------


  


  //--------------------creating the instance to start the server ----------------------------

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs: [graphqlSchema]    , 
    resolvers: graphqlResolvers,
    context :  async ({req, res}) => {
            
      console.log(req.connection.remoteAddress);

      const token = req.headers.authorization || '';
          
      
      
      

      const user =await decryptJWT(token); 
      console.log(user);
      
    

      const isLoggedIN = user? true : false;
      return {req, res , isLoggedIN, user}
      

      
  }
   });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


//-----------------------------------------------------------------------------------------------



