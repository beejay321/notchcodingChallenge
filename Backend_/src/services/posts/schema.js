import mongoose from "mongoose"

const { Schema, model} = mongoose

const postSchema = new Schema(
    {
        title: {type:String},
        description: {type:String},
    },
    {timestamps: true}
)

export default model("PostModel", postSchema)