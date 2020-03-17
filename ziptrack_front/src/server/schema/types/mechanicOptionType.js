import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';


export default new GraphQLObjectType({
  name: 'MechanicOption',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    mechanic_id: { type: GraphQLID },
  }),
});
