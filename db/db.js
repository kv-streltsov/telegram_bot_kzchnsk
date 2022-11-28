const user = require('../login')
const { Client } = require('pg')

const client = new Client({
    port:     user.db.port,
    user:     user.db.user,
    host:     user.db.host,
    database: user.db.database,
    password: user.db.password
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