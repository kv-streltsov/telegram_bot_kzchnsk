// const e = require('express')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host:'localhost',
    database:'telegram_bot',
    password:'3230',
    port:5432
})

client.connect()

  
async function insertPerson(from){
    
    const values = [from.id,from.first_name,from.username]
    const query_insert = `INSERT INTO person (id,first_name,username)
                          VALUES ($1,$2,$3)`

    client
          .query(query_insert,values)
          .then(res=> {
            console.log(res.rows[0])
          })
          .catch(e => console.error(e.stack))
}

module.exports = insertPerson