const express = require("express")
const cors = require("cors")
const app = express()

const schema = require("./graphql")
const graphQLExpress = require("express-graphql")

app.use(cors())

app.use(
    "/graphql",
    graphQLExpress({
        schema,
        graphiql: true
    })
)

app.listen(8080, () => console.log("GraphQL escuchando!"))
