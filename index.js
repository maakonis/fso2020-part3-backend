const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('content', (req, res) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-123456",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "39-123456-23222",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-123456-34333",
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const info =
    `<div>
      <p>Phonebook has info for ${persons.length} people.</p>
      <p>${new Date()}</p>
    </div>`
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log('body', body)

  if (!body.name) {
    return res.status(400).json({
      error: 'name entry missing'
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number entry missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: parseInt(Math.random() * 10000, 10)
  }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

