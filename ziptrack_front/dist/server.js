'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var cors = _interopDefault(require('cors'));
var express = _interopDefault(require('express'));
var graphqlHTTP = _interopDefault(require('express-graphql'));
var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));
var graphql = require('graphql');

var pelmetType = new graphql.GraphQLObjectType({
  name: 'Pelmet',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      }
    };
  }
});

var productTypeType = new graphql.GraphQLObjectType({
  name: 'ProductType',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      }
    };
  }
});

var mountingType = new graphql.GraphQLObjectType({
  name: 'Mounting',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      }
    };
  }
});

var materialType = new graphql.GraphQLObjectType({
  name: 'Material',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      }
    };
  }
});

var colorType = new graphql.GraphQLObjectType({
  name: 'Color',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      },
      hex: {
        type: graphql.GraphQLString
      }
    };
  }
});

var mechanicOptionType = new graphql.GraphQLObjectType({
  name: 'MechanicOption',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      },
      mechanic_id: {
        type: graphql.GraphQLID
      }
    };
  }
});

var mechanicType = new graphql.GraphQLObjectType({
  name: "Mechanic",
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      name: {
        type: graphql.GraphQLString
      },
      options: {
        type: graphql.GraphQLList(mechanicOptionType),
        resolve: function resolve(_ref) {
          var id = _ref.id;
          var data = fs.readFileSync(__dirname + "/public/static/mechanics_options.json", function (err, data) {
            if (err) throw err;
          });
          return JSON.parse(data).filter(function (_ref2) {
            var mechanic_id = _ref2.mechanic_id;
            return mechanic_id == id;
          });
        }
      }
    };
  }
});

var bwsType = new graphql.GraphQLObjectType({
  name: 'BWS',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLID
      },
      value: {
        type: graphql.GraphQLString
      }
    };
  }
});

var Query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    allPelmets: {
      type: graphql.GraphQLList(pelmetType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/pelmets.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    },
    allProductTypes: {
      type: graphql.GraphQLList(productTypeType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/product_types.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    },
    allMountings: {
      type: graphql.GraphQLList(mountingType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/mountings.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    },
    allMaterials: {
      type: graphql.GraphQLList(materialType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/materials.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    },
    allColors: {
      type: graphql.GraphQLList(colorType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/colors.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    },
    allMechanics: {
      type: graphql.GraphQLList(mechanicType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/mechanics.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    },
    allBWS: {
      type: graphql.GraphQLList(bwsType),
      resolve: function resolve(parent) {
        var data = fs.readFileSync(__dirname + '/public/static/bws.json', function (err, data) {
          if (err) throw err;
        });
        return JSON.parse(data);
      }
    }
  }
});
var schema = new graphql.GraphQLSchema({
  query: Query
});

var app = express(),
    STATIC_PATH = path.join(__dirname, "/public"),
    MIME_TYPES = {
  html: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css",
  png: "image/png",
  ico: "image/x-icon",
  svg: "image/svg+xml"
};

var serveFile = function serveFile(name) {
  var filePath = path.join(STATIC_PATH, name);
  console.log(filePath);

  if (!filePath.startsWith(STATIC_PATH)) {
    console.log("Can't be served: ".concat(name));
    return null;
  }

  var stream = fs.createReadStream(filePath);
  return stream;
};

app.use(cors());
app.use("/graphql", graphqlHTTP({
  graphiql: true,
  schema: schema
}));
app.use("*", function (req, res) {
  var cuttedUrl = req.originalUrl.split("?")[0];
  var fileName = cuttedUrl === "/" ? "/index.html" : cuttedUrl;
  var fileExt = path.extname(fileName).substring(1);

  if (fileExt != "ico") {
    var mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
    res.writeHead(200, {
      "Content-Type": mimeType
    });
    var stream = serveFile(fileName);
    if (stream) stream.pipe(res);
  }
});
app.listen(process.env.PORT || 5000);
