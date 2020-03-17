import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Color',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    hex: { type: GraphQLString },
  }),
});
