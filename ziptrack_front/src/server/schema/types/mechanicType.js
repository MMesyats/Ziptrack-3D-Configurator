import fs from "fs";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from "graphql";
import mechanicOptionType from "./mechanicOptionType";

export default new GraphQLObjectType({
  name: "Mechanic",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    options: {
      type: GraphQLList(mechanicOptionType),
      resolve: ({ id }) => {
        const data = fs.readFileSync(
          __dirname + "/public/static/mechanics_options.json",
          (err, data) => {
            if (err) throw err;
          }
        );

        return JSON.parse(data).filter(({ mechanic_id }) => mechanic_id == id);
      }
    }
  })
});
