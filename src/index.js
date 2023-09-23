const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')


let persons = [
    {
        "name": "Arto Hellas",
        "number": "03225599",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "456789123",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.use(bodyParser.json());
morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
);

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length}</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) return res.status(404).end()
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.some(person => person.name === body.name.trim())) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: body.name.trim(),
        number: body.number,
        id: Math.floor((Math.random() * 9000) + 1001),
    }

    persons.push(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

