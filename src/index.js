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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
