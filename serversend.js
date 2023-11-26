const express = require('express');
const app = express();
const port = 3000; // Set the port you want to use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static('./server'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server/server.html');
  });