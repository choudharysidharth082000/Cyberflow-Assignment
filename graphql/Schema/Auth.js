const { ApolloServer, gql } = require('apollo-server');
module.exports= gql`


type admin
{
    firstName: String!
    lastName: String!
    mobileNumber : String!
    email: String
    title: String
    password: String
    isAcive : Boolean


}
input adminInput 
{
    firstName: String!
    lastName: String!
    mobileNumber : String!
    email: String
    title: String
    password: String
    isAcive : Boolean
    salt: String

}

type Response 
{
    status : Boolean 
    message: String 
    admin: admin
    accessToken: String
}
type logoutResponse
{
    status: Boolean
    message: String
}


  
  type Query {
    books: String
    login(email: String! ,password: String!): Response

  }
  type Mutation
  {
      signupadmin(adminData : adminInput) : Response

      logout(acessToken : String) : Response
      
  }
  `

