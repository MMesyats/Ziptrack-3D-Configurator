import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Pelmet',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});
