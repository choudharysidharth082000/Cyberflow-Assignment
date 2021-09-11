const authQuery = require('./Query/Auth');
const authMutation = require('./Mutations/Auth');



module.exports  = 
{
    Query:
    {
        ...authQuery,
        

    },
    Mutation:
    {
        ...authMutation,
        

    }
}