const accountSid = "AC2f5aa93510826077e83faeed21dbd09e";
const authToken = "73b4b947b95378a2bf4c80c1575a3bb7";
const verifySid = "VAeb15a310a81ae4f01c88e53fa1152dbb";
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
