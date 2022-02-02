const express = require('express')
//import express
const app = express()
//initializing app


app.get('/', (request, response)=> {
    return response.send('Hello world!!')
}) // executa o evento

app.listen(3000, ()=>{
    console.log('aplicação rodando na porta http://localhost:3000')
}) //escuta o evento
