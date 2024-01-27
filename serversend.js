const express = require('express');
const app = express();
const port = 3000; // defini le port à utiliser

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




app.use(express.static('./log')); 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/log/0080E115000A9B3C.csv');
  });
