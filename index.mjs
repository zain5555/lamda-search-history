import { readRecords } from "./db.mjs"; 
import { tableName, responseSuccessMessage } from "./constants.mjs"; 


export async function handler(event) {
    console.log(event);

    try {

        let responseAx = await readRecords(tableName)

    return { body: { message : responseSuccessMessage, data : responseAx ? responseAx : {}} }
  } catch (err) {
    
    return { error: err }
  }
}