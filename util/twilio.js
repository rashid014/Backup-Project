const accountSid = "AC336f2ef350082f102b91a07ecaa8dcbc";
const authToken = "06afb985faf50b62218cb0ce91d117f9";
const verifySid = "VAb8e1eca576ab3f4bbdccb06e8feea036";
const client = require("twilio")(accountSid, authToken);

const express = require('express')



module.exports={
  sentotp :(number) =>{
    client.verify.v2 
  .services(verifySid)
  .verifications.create({ to: `+91 ${number} `, channel: "sms" })
 },
    check: async (otpCode,number) => {
          try{
    const status = await client.verify.v2
              .services(verifySid)
              .verificationChecks.create({ to: `+91 ${number}`, code: otpCode });
               return status
          }catch(err){
              console.log(err);
          }   
      }
    }
