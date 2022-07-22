const express = require('express')
const app = express()
const router = require('./routers')
const session = require('express-session')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));

app.use(session({
  secret: 'educ8',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})