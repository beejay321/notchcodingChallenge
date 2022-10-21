import express from "express"
import postHandlers from "./handlers.js"

const postsRouter = express.Router()


postsRouter.route("/")
.get(postHandlers.getAllPost)
.post(postHandlers.createNewPost)

postsRouter.route("/:id")
.get(postHandlers.getSinglePost)
.put(postHandlers.editSinglePost)
.delete(postHandlers.deleteSinglePost)



export default postsRouter