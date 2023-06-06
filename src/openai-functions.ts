import {Configuration, OpenAIApi} from "openai";
// import Conf from "conf"
import fs from "fs"
import * as dotenv from "dotenv";

dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// const conf = new Conf({projectName: "temporal"})
const openai = new OpenAIApi(configuration)


// export async function upload(filePath: string) {
//     try {
//         const response = await openai.createFile(
//             fs.createReadStream(filePath),
//             "fine-tune"
//         );
//         conf.set("fileId", response.data.id)
//
//     } catch (err) {
//         console.log("err: ", err)
//     }
// }

// export async function createFineTuneModel() {
//     const fileId = conf.get("fileId")
//     try {
//         await openai.createFineTune({training_file: fileId});
//         console.log(`The model with file ${fileId} is being created `)
//     } catch (err) {
//         console.log("err: ", err)
//     }
// }

export async function getModelList() {
    try {
        const response = await openai.listFineTunes();
        return response.data.data
    } catch (err) {
        console.log("err: ", err)
    }
}

export async function checkIfModelIsComplete(){
    try{
        const models = await getModelList() || []
        const currentModel =  models.reduce((prev, current) => (prev.created_at > current.created_at) ? prev : current)
        if (currentModel.status === "succeeded"){
            // conf.set("modelName", currentModel.fine_tuned_model)
            console.log(`This model has been fine-tuned with the name ${currentModel.fine_tuned_model}`)
            return 'succeeded'
        }
        if (currentModel.status === "failed"){
            console.log("This model has failed to fine-tune")
            return 'failed'
        }
        console.log("This model has not been fine-tuned yet")
        return 'pending'
    } catch (err) {
        console.log("err: ", err)
    }
}

