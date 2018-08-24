require('dotenv').config();
const {json} = require('body-parser');
const express = require('express')
const massive = require('massive')
const port = 3000;
const app = express()
const pc = require('./products_controller')

app.use(json())

massive(process.env.CONNECTION_STRING)
.then(db => {app.set('db', db)})
.catch(err => console.log(err))

app.get('/api/products', pc.getAll)
app.get('/api/product/:id', pc.getOne)
app.put('/api/product/:id', pc.update)
app.post('/api/product', pc.create)
app.delete('/api/product/:id', pc.delete)


app.listen(port, ()=> console.log(`listening at port ${port}`))
