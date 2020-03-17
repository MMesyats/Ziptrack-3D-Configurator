import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'BWS',
  fields: () => ({
    id: { type: GraphQLID },
    value: { type: GraphQLString },
  }),
});
