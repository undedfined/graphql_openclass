const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} = require("graphql")

const PostType = GraphQLObjectType({
    name: "Post",
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        views: { type: GraphQLInt },
        comments: { type: GraphQLList(CommentType) }
    })
})

const CommentType = GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        date: { type: GraphQLString },
        content: { type: GraphQLString },
        post: { type: PostType }
    })
})

const Query = GraphQLObjectType({
    name: "Query",
    fields: {
        posts: { type: GraphQLList(PostType) },
        comments: { type: GraphQLList() }
    }
})

module.exports = new GraphQLSchema()
