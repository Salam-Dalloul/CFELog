const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 4000;
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port: ${port}`);
});
