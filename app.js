const express = require('express');
const path = require('path');
const cors = require('cors');
const pastaRouter = require('./routes/pasta.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pastas/v1/filtrar', pastaRouter);


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
