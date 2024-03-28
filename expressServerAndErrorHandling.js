const express = require('express');
const { test: testRoutes } = require('./routes');

const app = express()
const port = 3000

const promiseGenerator = (bool) => {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve('success en promise');
      return;
    }
    reject('error en promise!');
  })
}

const middleware1 = async (req, res, next) => {
  const condition = true;

  try {
    if (condition) {
      req.params.test = 'hello';
      next();
    } else {
      throw new Error("system fail 1");
    }
  } catch (err) {
    next(err)
  }
}

const middleware2 = async (req, res, next) => {
  const condition = false;
  let result;

  try {
    result = await promiseGenerator(condition);
    console.log(result)
  } catch (error) {
    console.log(error);
    next(new Error("system fail 2"));
    return;
  }

  res.send("success 2" + result + " " + req.params.test);
}

app.get('/other-test', middleware1, middleware2)

app.get('/hello', (req, res) => {
  res.send('Hiii!')
})

// Tests routes
app.use("/tests", testRoutes);

// Error Handling 
app.use((error, req, res, next) => {
  console.log( `error message ${error?.message}`); // log the error msg
  console.log( `error status ${error?.status}`); // log the error status
  const status = error?.status || 500;
  res.status(status).json("Error test" + error.message + " " + error.stack);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
