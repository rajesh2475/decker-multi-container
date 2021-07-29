const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(express.json())
app.use(cors())


const redis = require("redis");

const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379,
});
const redisPublisher = redisClient.duplicate();
// redisClient.hset("values", index, "Nothing yet!");

app.use(
    express.urlencoded({
      extended: true
    })
  )

// client.get("salary", redis.print);


app.post('/data', (req, res) => {
    // client.set("salary", req.body.salary, redis.print);
    // client.set("savings", req.body.savings, redis.print);
    // client.set("loan", req.body.loan, redis.print);
    redisPublisher.publish("insert", 11);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "status": true }));
  })

  app.get('/data', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    redisClient.hgetall('values', function(err, result){
      if(err) console.log(err);
      else console.log(result);

      res.end(JSON.stringify({ "salary": result }));
    });

  //  res.send(JSON.stringify({ "status": true }));
   
    // client.get("salary", function (error, salary) {
    //     client.get("savings", function (error, savings) { 
    //         client.get("loan", function (error, loan) { 
    //             res.end(JSON.stringify({ "salary": salary,  "savings": savings, "loan": loan }));

    //         })
    //     })
    // })
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})