import cors from "cors";
import express from "express";
import graphqlHTTP from "express-graphql";
import path from "path";
import fs from "fs";
import schema from "./schema/schema";

const app = express(),
  STATIC_PATH = path.join(__dirname, "/public"),
  MIME_TYPES = {
    html: "text/html; charset=UTF-8",
    js: "application/javascript; charset=UTF-8",
    css: "text/css",
    png: "image/png",
    ico: "image/x-icon",
    svg: "image/svg+xml"
  };

const serveFile = name => {
  const filePath = path.join(STATIC_PATH, name);
  console.log(filePath);
  if (!filePath.startsWith(STATIC_PATH)) {
    console.log(`Can't be served: ${name}`);
    return null;
  }
  const stream = fs.createReadStream(filePath);
  return stream;
};

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

app.use("*", (req, res) => {
  const cuttedUrl = req.originalUrl.split("?")[0];
  const fileName = cuttedUrl === "/" ? "/index.html" : cuttedUrl;
  const fileExt = path.extname(fileName).substring(1);
  if (fileExt != "ico") {
    const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
    res.writeHead(200, { "Content-Type": mimeType });
    const stream = serveFile(fileName);
    if (stream) stream.pipe(res);
  }
});

app.listen(process.env.PORT || 5000);
