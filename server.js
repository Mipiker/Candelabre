const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);
});

app.use(express.static('./server')); 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server/home.html');
  });

app.use('/log', express.static('./log'));
app.use('/img', express.static('./img'));