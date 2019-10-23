const { graphql, buildSchema } = require("graphql")

// schema
const schema = buildSchema(`
    # escalares
    
    # String
    # Int
    # Float
    # Boolean
    # ID

    type Cat {
        _id: ID
        name: String
        age: Int
        color: String
        race: String
        owner: Person
    }

    type Person {
        name: String
        cats: [Cat]
        age: Int
        balance: Float
        developer: Boolean
        _id: ID
    }

    type Query {
        people: [Person]
        cats: [Cat]
    }
`)

const people = [
    {
        _id: "1",
        name: "Marco",
        age: 40,
        cats: ["1", "2"],
        balance: 10.1,
        developer: true
    },
    {
        _id: "2",
        name: "Uwu",
        age: 40,
        cats: ["3"],
        balance: 10.1,
        developer: true
    }
]

const cats = [
    {
        _id: "1",
        name: "Michi",
        age: 10,
        color: "Negro",
        race: "Siames",
        owner: "1"
    },
    {
        _id: "2",
        name: "GGG",
        age: 10,
        color: "Negro",
        race: "Siames",
        owner: "1"
    },
    {
        _id: "3",
        name: "Algo",
        age: 10,
        color: "Negro",
        race: "Siames",
        owner: "2"
    }
]

// value
const value = {
    people: people.map(p => {
        return {
            ...p,
            cats: p.cats.map(c => {
                // c es "1"
                return cats.find(cat => cat._id === c)
            })
        }
    }),
    cats
}

// query
const query = `
    query {
        people {
            name
            cats {
                _id
                name
                race
                owner {
                    name
                }
            }
        }
    }
`

graphql(schema, query, value)
    .then(args => {
        console.log(JSON.stringify(args, null, 2))
    })
    .catch(console.log)
