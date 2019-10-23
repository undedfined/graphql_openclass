const { graphql, buildSchema } = require("graphql")

// schema
const schema = buildSchema(`
    # escalares
    
    # String
    # Int
    # Float
    # Boolean
    # ID

    type Person {
        name: String
        cats: [String]
        age: Int
        balance: Float
        developer: Boolean
        _id: ID
    }

    type Query {
        person: Person
        people: [Person]
    }
`)

// value
const value = {
    person: {
        _id: "1",
        name: "Marco",
        age: 40,
        cats: ["Chewbacca", "Macciato"],
        balance: 10.1,
        developer: true
    },
    people: [
        {
            _id: "1",
            name: "Marco",
            age: 40,
            cats: ["Chewbacca", "Macciato"],
            balance: 10.1,
            developer: true
        },
        {
            _id: "2",
            name: "Vinicio",
            age: 4,
            cats: ["Chewbacca"],
            balance: 1100000,
            developer: false
        }
    ]
}

// query
const query = `
    query {
        person {
            _id
            name
            cats
        }
    }
`

graphql(schema, query, value)
    .then(args => {
        console.log(JSON.stringify(args, null, 2))
    })
    .catch(console.log)
