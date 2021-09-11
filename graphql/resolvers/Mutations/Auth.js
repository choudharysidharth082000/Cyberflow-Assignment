const {Admin,AdminSessionModel} = require('../../../models/Auth');
const adminValidator = require('../../../Validators/adminValidator');
const hashPassword = require('../../../utils/passwordHash');
const generateJWT = require('../../../utils/generateJWT');
module.exports = 
{

    signupadmin : async(parent, args , context, info) =>
        {
            const {adminData} = args;
            

            const resultFromJoi =  adminValidator('firstName lastName email password mobileNumber title', adminData);
           
            if(!resultFromJoi)
            {
                throw new Error('You have entered Wrong Credentials');
            }

            
            
            

            const {generateSalt, generateHash} =await hashPassword(adminData.password);
            
            

            if(!generateHash)
            {
                throw new Error('Internal Password Error in hashing');
            }

            adminData.password = generateHash;

            adminData.salt = generateSalt;

            const newJWT = generateJWT(adminData);
            

            try{
                const adminEmail = await Admin.findOne({email : adminData.email});
                

                

                if(adminEmail)
                {
                    throw new Error('User already Exists');
                }

            }
            catch(err)
            {
                throw new Error(`${err}`);
            }


            try 
            {
                const admin = await  new Admin(adminData);
                

                if(!admin)
                {
                    throw new Error(`Something went Wrong`);
                }

                    admin.save();

                    return {
                        status: true,
                        message: "Used Signed up Successfully",
                        admin: admin,
                        accessToken: newJWT
                    
                }

                
            }
            catch(err)
            {
                throw new Error(`${err}`)
            }
    
            
        }, 
        logout: async (parent , args , context , info) =>
        {
            if(!context.isLoggedIN) {
				throw new Error('User Not Logged In');
			}
			let {_id} = context.user;
            console.log(_id);
            const {acessToken} =args;
            


            
            try{
                const user = await AdminSessionModel.findOne({userID: _id });

                if(!user)

                {
                            try 
                    {
                        const newuser = await new AdminSessionModel({userID: _id,token:acessToken, lastAccessedAt: new Date(), isActive: false,sessionLogs: `User Logged Out at ${new Date()}`});
                        try{

                            const saving = await newuser.save();

                        }
                        catch(err)
                        {
                            console.log(err);
                        }

                    
                    }
                    catch(err)
                    {
                        console.log(err);
                    }


                 }


                 await AdminSessionModel.findOneAndUpdate({userID : _id},{$set:{isActive : false, lastAccessedAt : new Date() },
				$push: {sessionLogs: `User Logged Out at ${new Date()}` } });


                return {
                    status: true,
                    message: "Logout Successful"
                }



            }
            catch(err)
            {
                console.log(err);
            }



			

           			
		
           
        }
    
    
}