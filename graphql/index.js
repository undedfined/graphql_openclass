const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLID
} = require("graphql")

const { Post, Comment } = require("../schemas")

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        views: { type: GraphQLInt },
        comments: {
            type: GraphQLList(CommentType),
            resolve: async parentValue => {
                return Comment.find({
                    post: parentValue._id
                })
            }
        }
        // comments: { type: GraphQLList(CommentType) }
    })
})

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        _id: { type: GraphQLID },
        date: { type: GraphQLString },
        content: { type: GraphQLString },
        post: {
            type: PostType,
            resolve: async parentValue => {
                const comment = await Comment.findOne({
                    _id: parentValue._id
                }).populate("post")
                return comment.post
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve: async (
                parentValue,
                { title, content }
            ) => {
                const post = new Post({
                    title,
                    content,
                    views: 0
                })
                await post.save()
                return post._doc
            }
        },
        addComment: {
            type: CommentType,
            args: {
                post: { type: GraphQLString },
                content: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            resolve: async (
                parentValue,
                { post, content, date }
            ) => {
                const comment = new Comment({
                    post,
                    content,
                    date: new Date(date)
                })
                await comment.save()

                const p = await Post.findOne({ _id: post })
                p.comments.push(comment)
                await p.save()

                return comment._doc
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        posts: {
            type: GraphQLList(PostType),
            resolve: async () => {
                const posts = await Post.find({})
                console.log(posts)
                return posts
            }
        },
        comments: {
            type: GraphQLList(CommentType),
            resolve: () => {
                return Comment.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
