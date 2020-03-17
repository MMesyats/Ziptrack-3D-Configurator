import fs from 'fs';
import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';
import pelmetType from './types/pelmetType';
import productTypeType from './types/productTypeType';
import mountingType from './types/mountingType';
import materialType from './types/materialType';
import colorType from './types/colorType';
import mechanicType from './types/mechanicType';
import bwsType from './types/bwsType';

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		allPelmets: {
			type: GraphQLList(pelmetType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/pelmets.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		},
		allProductTypes: {
			type: GraphQLList(productTypeType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/product_types.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		},
		allMountings: {
			type: GraphQLList(mountingType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/mountings.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		},
		allMaterials: {
			type: GraphQLList(materialType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/materials.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		},
		allColors: {
			type: GraphQLList(colorType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/colors.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		},
		allMechanics: {
			type: GraphQLList(mechanicType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/mechanics.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		},
		allBWS: {
			type: GraphQLList(bwsType),
			resolve(parent) {
				const data = fs.readFileSync(__dirname + '/public/static/bws.json', (err, data) => {
					if (err) throw err;
				});
				return JSON.parse(data);
			}
		}
	}
});

export default new GraphQLSchema({
	query: Query
});
