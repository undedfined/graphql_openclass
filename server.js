const express = require("express")
const app = express()

const graphQLExpress = require("express-graphql")

app.use("/graphql", graphQLExpress({}))

app.listen(8080, () => console.log("GraphQL escuchando!"))
