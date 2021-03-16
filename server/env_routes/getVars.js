const router = require('express').Router();
require('dotenv').config();

router.route('').get(async (req, res)=>{
        const client = req.query.auth.toString();
        const auth = process.env.CONFIRM_FIREBASE;
        if(client === auth){
                const apiKey= process.env.FIREBASE_APIKEY;
                const authDomain= process.env.FIREBASE_AUTHDOMAIN;
                const databaseURL= process.env.FIREBASE_DATABASEURL;
                const projectId= process.env.FIREBASE_PROJECTID;
                const storageBucket= process.env.FIREBASE_STORAGEBUCKET;
                const messagingSenderId= process.env.FIREBASE_MESSEGINGSENDERID;
                const appId= process.env.FIREBASE_APPID;
                const measurementId= process.env.FIREBASE_MEASUREMENTID
                // console.log(apiKey);
            res.status(200).json({
                apiKey,
                authDomain,
                databaseURL,
                projectId,
                storageBucket,
                messagingSenderId,
                appId,
                measurementId
            })
        }
        else res.status(401).json({message:"Unable to authenticate"})
    }
)

module.exports = router;