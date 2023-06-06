import * as dotenv from "dotenv";
import {Configuration, OpenAIApi} from "openai";
// import {checkIfModelIsComplete, upload, createFineTuneModel} from "./openai-functions";
import {checkIfModelIsComplete} from "./openai-functions";

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// export async function uploadFile(filePath: string): Promise<string> {
//   try {
//     console.log("uploadFile()")
//     await upload(filePath)
//     return 'success'
//   }
//   catch (err) {
//     return `err: ${err}`
//   }
// }
//
// export async function createFineTune(): Promise<string> {
//   try {
//     console.log("createFineTune()")
//     await createFineTuneModel()
//     return 'success'
//   }
//   catch (err) {
//     return `err: ${err}`
//   }
// }

export async function getStatus(): Promise<string> {
  // try {
  //   console.log("getStatus()")
  //   const response = await checkIfModelIsComplete()
  //   return response || 'pending'
  // }
  // catch (err) {
  //   return `err: ${err}`
  // }
  return 'pending'
}
