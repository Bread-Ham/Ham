const typeDefs = `#graphql
type User {
    id: ID!
    name: String!
    email: String!
}

type Query {
    users: [User!]!
    userById(id: ID!): User!
}
`;

export default typeDefs;