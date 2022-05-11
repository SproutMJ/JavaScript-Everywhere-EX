const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('hello world'));
app.listen(port, () => console.log('${port}번 포트로 진입'));

