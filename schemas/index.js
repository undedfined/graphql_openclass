const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/graphql_example", {
    useNewUrlParser: true
})
const db = mongoose.connection
const { model, Schema, Types } = mongoose

db.once("open", () => console.log("Listo!"))

// post
const PostSchema = new Schema({
    title: String,
    content: String,
    views: Number,
    comments: [{ type: Types.ObjectId, ref: "Comment" }]
})

const Post = model("Post", PostSchema)

// comment
const CommentSchema = new Schema({
    content: String,
    date: Date,
    post: { type: Types.ObjectId, ref: "Post" }
})

const Comment = model("Comment", CommentSchema)

module.exports = {
    Post,
    Comment
}
