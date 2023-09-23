const express = require('express')
const app = express()
const PORT = 3001

const persons = [
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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

