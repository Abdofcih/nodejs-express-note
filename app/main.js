const express = require('express');
const path = require('path');
const hbs = require('hbs')
const notes = require ('./note-backend');

const app = express();
const port = process.env.PORT || 3000 // 3000 for running locally
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup handlebars engine and views location
app.set('view engine', 'hbs')

app.use(express.json())
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/new',(req,res)=>{
    res.render('new')
})
app.get('/notes', (req, res) => {
    res.send(notes.getAllNotes());
})
app.get('/notes/reade', (req, res) => {
    if(!req.query.id)//id is query string ?id=val
    {
        return res.send({
            error:"you must prvide an id"
        })
    }
    else{
       res.send(notes.readNote(parseInt(req.query.id)))
    }
})
app.get('/notes/delete', (req, res) => {
    if(!req.query.id)//id is query string ?id=val
    {
        return res.send({
            error:"you must prvide an id"
        })
    }
    else{
       res.send(notes.removeNote(parseInt(req.query.id)))
    }
})
app.post('/notes/add',(req, res)=>{
    try {
        notes.addNote(req.body.title,req.body.body);
        res.send({status: 200})
    } catch (error) {
        res.send({error})
    }
})
app.post('/notes/update',(req, res)=>{
    try {
        notes.updateNote(req.body.id,req.body.title,req.body.body);
        res.send({status: 200})
    } catch (error) {
        res.send({error})
    }
})

app.listen(port)