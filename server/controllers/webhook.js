// // logic will be written to manage clerk webhooks
// import { Webhook } from "svix";

// //import the User Model created in models -> user.js file
// import User from "../models/User.js";

// //API controller function to Manage clerk user with database
// //write export to use it in any other files
// export const clerkWebhooks = async (req,res) =>{
// try {
//     //1. will write logic which will verify clerk webhooks and save the data of user in backend whenever a user is created, deleted or updated
    
//     // Create a svix instance with clerk webhook secret..simply gets the user info who just recently created an account
//     const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

//     // verifying Headers..after getting user id through the webhook secret..verifying its authenticity by some properties like signature..like Narendra modi signature is fixed or permanent , no one else can use this
//     await whook.verify(JSON.stringify(req.body),{
//         "svix-id" : req.headers["svix-id"],
//         "svix-timestamp" : req.headers["svix-timestamp"],
//         "svix-signature": req.headers["svix-signature"]
//     })

//     // Getting Data from request body, and intimating to backend that user has been created, deleted or updated after wwhook verification using above properties after getting webhook secret 

//     const {data,type} = req.body

//     //Switch Cases for different events i.e after knowing user created what to do 
//     switch (type) {
//         case 'user.created':{
//             const userData = {
//                 //here we are receiving the clerk user id in data.id syntax and also storing/assigning it in _id variable in mongodb database or in our backend, and similarly getting email and name and storing it to mongodb database
//                 _id:data.id,
//                 email:data.email_addresses[0].email_address,//array so, index 0 given and email_address property is used
//                 name : data.first_name + " " + data.last_name,
//                 image:data.image_url,
//                 //when a new user created then initially the resume will be initialised to empty string and will get changed or updated if the user updates it
//                 resume:''
//             }
//             //now the userData will be saved to database by the following syntax
//             await User.create(userData)
//             res.json({})
//             break;

//         }

//          case 'user.updated':{
//              const userData = {
//                //only these three info can be updated and accordingly they will be updated
//                 email:data.email_addresses[0].email_address,//array so, index 0 given and email_address property is used
//                 name : data.first_name + " " + data.last_name,
//                 image:data.image_url,
                
//             }
//             //the folowing line will update the above three info by first, finding the user - whose info to be updated by findByIdAndUpdate syntax through passing two arguments like data.id and userData and after finding the user by id will update these three infos
//             await User.findByIdAndUpdate(data.id,userData)
//             res.json({})
//             break;
//         }

//          case 'user.deleted':{
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//         }

//         default:
//         break;
            
          
//     }

// //after designing this controller function, we will create a route and after creating it
// // we will upload this code on github platform and from there we will get a backend link
// //and after getting backend link we will use this link to obtain the webhook secret from clerk dashboard
// //for that go to server.js file and create the route as mentioned, as server.js is our entry point of backend projects

// } catch (error) {
//     console.log(error.message);
//     res.json({success:false,message:'webhooks Error'})
    
// }
// }
import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify Clerk webhook and get event object
    const evt = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = evt;

    // Handle different webhook types
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ""
        };
        await User.create(userData);
        res.status(200).json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(200).json({});
        break;
      }

      default:
        res.status(200).send("Event ignored");
    }
  } catch (error) {
    console.log("Webhook Error:", error.message);
    res.status(400).json({ success: false, message: "Webhook Error" });
  }
};
