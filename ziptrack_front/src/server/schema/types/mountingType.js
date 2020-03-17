import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Mounting',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});
