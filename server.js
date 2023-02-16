const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const {expressjwt} = require('express-jwt')
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
var usersRouter = require('./routes/users');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(expressjwt({
  algorithms: ['HS256'],
  secret: 'secret000',  // 签名的密钥 或 PublicKey
  credentialsRequired: true,  // 设置为 false 就不进行校验了，游客也可以访问
}).unless({
  path: ['/users/login',]  // 指定路径不经过 Token 解析
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(createError(404));
  }
});
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    })
  })
  };
  startApolloServer();