const UserModel=require("../Models/usermodel.js");
const Validator=require("./Validation.js");
let jwt = require("jsonwebtoken")

let createUser=async(req,res)=>{
try{
let data=req.body;
if(!Validator.isValidBody(data)){
    return res.status(404).send({msg:"No data provided"});
}

let {Username,Email,Password} = data
//student name validation
if(!Validator.isValid(Username)){
    return res.status(400).send({msg:"Username is required"});
}

if(!Validator.isValidName.test(Username)){
    return res.status(400).send({msg:"Invalid username"});
}

//email validation
if(!Validator.isValid(Email)){
    return res.status(400).send({msg:"Email name is required"});
}
let sameEmail = await UserModel.findOne({Email})
if (sameEmail){
    return res.status(400).send({msg: "This email already exists"});
}
if(!Validator.isValidEmail.test(Email)){
    return res.status(400).send({msg:"Invalid email"});
}


//Password validation
if(!Validator.isValid(Password)){
    return res.status(400).send({msg:"Password is required"});
}
// if(!Validator.isValidName.test(Password)){
//     return res.status(400).send({msg:"Invalid password"});
// }


let register=await UserModel.create(data);
return res.status(201).send({
    status:true,
     msg:"User Registered Successfully",
     data:register,
});
    }catch(error){
return res
.status(500)
.send({status:false,msg:"Internal Server Error"});
    }
};

//login student
let loginUser=async(req,res)=>{
    try{
        let data=req.body;
        let {Username,Password}=data;
        if(!Validator.isValidBody(data)){
        return res.status(404).send({status:false,msg:"no data provided"});
    }
    
        if(!Validator.isValid(Username)){
            return res.status(400).send({status:false,msg:"please enter your email"});
        }

        if(!Validator.isValid(Password)){
            return res.status(400).send({status:false,msg:"please enter your password"});

        }
        // if (!(password.length >= 8 && password.length <= 15)) {
        //     return res.status(400).send({ status: false, msg: "Password Should be minimum 8 characters and maximum 15 characters", });
        // }

        let matchUser=await UserModel.findOne({Username,Password})
        if (!matchUser){
            return res.status(200).send({msg:"Username or Password invalid"});
        }else{
            const token=jwt.sign({
                userId:matchUser._id.toString(),
            },"MERN STACK",{
                expiresIn:"20000sec",
            }
            );
            return res.status(200).send({msg:"user logged in successfully",token});
        }
    }catch(error){
        return res.status(500).send({status:false,msg:"internal server error"});
    }
};

module.exports={createUser,loginUser};

// const UserModel=require("../Models/usermodel.js");
// const Validator=require("./Validation.js");
// let jwt = require("jsonwebtoken")

// let createUser=async(req,res)=>{
// try{
// let data=req.body;
// if(!Validator.isValidBody(data)){
//     return res.status(404).send({msg:"No data provided"});
// }

// let {Username,Email,Password} = data
// //student name validation
// if(!Validator.isValid(Username)){
//     return res.status(400).send({msg:"Username is required"});
// }

// if(!Validator.isValidName.test(Username)){
//     return res.status(400).send({msg:"Invalid username"});
// }

// //email validation
// if(!Validator.isValid(Email)){
//     return res.status(400).send({msg:"Email name is required"});
// }
// let sameEmail = await UserModel.findOne({Email})
// if (sameEmail){
//     return res.status(400).send({msg: "This email already exists"});
// }
// if(!Validator.isValidEmail.test(Email)){
//     return res.status(400).send({msg:"Invalid email"});
// }


// //Password validation
// if(!Validator.isValid(Password)){
//     return res.status(400).send({msg:"Password is required"});
// }
// if(!Validator.isValidName.test(Password)){
//     return res.status(400).send({msg:"Invalid password"});
// }


// let register=await UserModel.create(data);
// return res.status(201).send({
//     status:true,
//      msg:"User Registered Successfully",
//      data:register,
// });
//     }catch(error){
// return res
// .status(500)
// .send({status:false,msg:"Internal Server Error"});
//     }
// };


// //login
// const loginUser = async function (req, res) {
//     try {
//         const requestBody = req.body;
//         const { email, password } = requestBody;

//         if (!isValidRequestBody(requestBody)) {
//             return res.status(400).send({ status: false, message: "No data provided" });
//         }

//         if (!isValidData(email)) {
//             return res.status(400).send({ status: false, message: "Username is required." });
//         }

//         // if (!isValidEmail.test(username)) {
//         //     return res.status(400).send({ status: false, message: "Please enter valid a email " });
//         // }

//         if (!isValidData(password)) {
//             return res.status(400).send({ status: false, message: "Password is required." });
//         }

//         if (!(password.length >= 8 && password.length <= 15)) {
//             return res.status(400).send({ status: false, msg: "Password Should be minimum 8 characters and maximum 15 characters", });
//         }

//         const matchUser = await userModel.findOne({ username, password });
//         if (!matchUser) {
//             return res.status(404).send({ status: false, message: " Username/Password is Not Matched" });
//         }

//         const token = jwt.sign(
//             {
//                 userId: matchUser._id.toString(),
//                 Project: "Book Management",
//                 batch: "Uranium",
//                 iat: new Date().getTime() / 1000 //(iat)Issued At- the time at which the JWT was issued.              
//             },
//             "Project-03_group-28",
//             {
//                 expiresIn: "12000sec",
//             });

//         res.setHeader("x-user-key", token)
//         return res.status(200).send({ status: true, message: "User Logged in successfully", data: token, });
//     }
//     catch (error) {
//         res.status(500).send({ status: false, message: error.message });
//     }
// };
// module.exports={createUser,loginUser};
