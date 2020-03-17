import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'ProductType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});
