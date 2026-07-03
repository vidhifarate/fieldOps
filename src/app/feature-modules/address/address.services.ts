import { getPreSignedURL } from "../../utilities/aws/s3.services.js";
import addressRepo from "./address.repo.js";
import { AddressResponses } from "./address.responses.js";
import type { Address } from "./address.types.js";

const createAddress= async(address:Address)=>{
  try{
    const newAddress= addressRepo.create(address);
    if(!newAddress)return AddressResponses.ADDRESS_CREATED;
    return newAddress

  }catch(e){
    throw(e);
  }
}

const getAddresses = async(role:"Dispatcher"|'Customer',id:string)=>{
  try{
     let filter = {};
        switch (role) {
          case 'Customer': {
            filter = {  customer_id: id }
            break;
          };
          case 'Dispatcher': {
            filter = {}
            break;
          }
        }
    
        const addresses = await addressRepo.findAll(filter);
        if(addresses.length===0)return AddressResponses.ADDRESS_NOT_FOUND
        return  addresses;
        }

  catch(e){
    console.log(e);
    throw (e);

  }

}

export default{createAddress,getAddresses}