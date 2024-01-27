const express = require('express');
const app = express();
const port = 3000; // defini le port à utiliser

app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);
});


app.use(express.static('./server')); 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server/server.html');
  });


  app.use('/log', express.static('./log'));

  app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, '/log'));
  });