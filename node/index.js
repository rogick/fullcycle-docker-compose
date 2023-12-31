const express = require('express')
const axios = require('axios').default;
const inserir = require('./inserir');
const listar = require('./listar');
const app = express()
const port = 3000


app.get('/', (req, res)=> {
  getPeple(res)
})

async function getPersonName() {
  const RANDOM = Math.floor(Math.random() * 10);
  const response = await axios.get('https://swapi.dev/api/people');
  personName = response.data.results;
  return personName[RANDOM].name;
}

async function getPeple(res) {
  const name = await getPersonName()
  await inserir(name);
  const data = await listar();
  let responseBody = `
          <h1>Full Cycle Rocks!!</h1>
          <br/><br/>
          <h3>Nomes:</h3>
          <br/>
          <ul>
        `; 
    for (let linha of data) {
      responseBody += `<li>${linha.name}</li>\n`
    }
    responseBody += '\n</ul>'
    res.send(responseBody);
}

app.listen(port, () => {
  console.log('STARTED AT ' + port);
});