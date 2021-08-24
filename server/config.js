require('dotenv').config();

const environment = ()=>{
  if(process.env.NODE_ENV === "development" ){
      return {
        database: process.env.FAUNA_KEY,
        static: false
      }
  }
  if(['production', 'staging'].indexOf(process.env.NODE_ENV) >= 0){
      return {
        database: process.env.FAUNA_KEY_PROD,
        static: true
      }
  }
}

module.exports = {environment}