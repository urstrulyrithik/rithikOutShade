const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rithik'
})

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log("mysql connected")
})

app.listen(3005, () => {
  console.log('running on port http://localhost:3005')
})

app.post("/register", async (request, response) => {
  const { username, email, password, fullname } = request.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const selectUserQuery = `SELECT * from REGISTEREDUSERS where username="${username}";`;

  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    if (result.length === 0) {
      if (password.length < 6) {
        response.status(200);
        response.send("Password is too short");
      } else {
        try {
          const createUserQuery = `insert into registeredusers (username,password,email,fullname)
                  values("${username}","${hashedPassword}","${email}","${fullname}");`;
          db.query(createUserQuery, (error, result) => {
            console.log("error", error)
            console.log('result', result)
            response.status(200).send(`User created successfully`);
          });
        } catch (error) {
          console.log(error)
        }

      }
    } else {
      response.status(200);
      response.send("User already exists");
    }

  });
})


app.post("/login", async (request, response) => {
  console.log("login triggered")
  console.log(request.body)
  const { username, password } = request.body;
  console.log(username, password)
  const selectUserQuery = `select * from registeredusers where username="${username}";`;

  db.query(selectUserQuery, async (error, result) => {

    if (result.length === 0) {
      response.status(200).send("Invaild username")
    } else {
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if (isPasswordMatched) {
        const payload = {
          username: username,
        };

        const jwtToken = jwt.sign(payload, "RithikCovid");
        response.send({ jwtToken, username });
      } else {
        response.status(200);
        response.send("Invalid password");
      }
    }
  })
});


app.get("/profile/:username", async (request, response) => {
  console.log("profle trigred")
  const { username } = request.query;

  const selectUserQuery = `SELECT * from REGISTEREDUSERS where username="${username}";`;

  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    if (result.length === 1) {
      
        response.status(200);
        response.send(result);
    }
       else {
       
               console.log("multiple user or no user found")
      }
  });
})


app.post("/addproduct", async (request, response) => {
  const { category, productName, productPrice } = request.body;

  const selectUserQuery = `INSERT INTO products (name, price, category) values("${productName}", ${productPrice}, "${category}");`;

try {
  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    response.status(200).send(`Product added successfully`);

  })
} catch (error) {
  console.log(error)
}

  ;
})

app.get("/getproducts", async (request, response) => {
 
  const selectUserQuery = `SELECT * FROM products ;`;

try {
  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    response.status(200).send(result);

  })
} catch (error) {
  console.log(error)
}

  ;
})

app.post("/getdetails", async (request, response) => {

  const {username}=request.body
 
  const selectUserQuery = `SELECT * FROM registeredusers where username="${username}" ;`;

try {
  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    response.status(200).send(result);

  })
} catch (error) {
  console.log(error)
}

  ;
})


app.put("/updatedetails", async (request, response) => {
  const { username,password,loggedInUser, email,  fullname } = request.body;

 
  const selectUserQuery = `SELECT * from REGISTEREDUSERS where username="${loggedInUser}";`;

  db.query(selectUserQuery,async (error, result) => {
    console.log('error', error);
    console.log('result', result)
    if (result){
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if(isPasswordMatched){
          const updateUserQuery=`UPDATE registeredusers set username="${username}", fullname="${fullname}", email="${email}" where username="${loggedInUser}";`
          db.query(updateUserQuery, async(error,result)=>{
            console.log(error)
            console.log(result)
            response.status(200)
            response.send("Updated Successfully")
          })
      }else{
        response.send("Incorrect Password")
      }
    } else {
     console.log(error)
    }

  });
})

app.put("/changepassword", async (request, response) => {
  const { password, newPassword, loggedInUser } = request.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
 
  const selectUserQuery = `SELECT * from REGISTEREDUSERS where username="${loggedInUser}";`;

  db.query(selectUserQuery,async (error, result) => {
    console.log('error', error);
    console.log('result', result)
    if (result){
      const isPasswordMatched = await bcrypt.compare(password, result[0].password);
      if(isPasswordMatched){
          const updateUserQuery=`UPDATE registeredusers set password="${hashedPassword}"  where username="${loggedInUser}";`
          db.query(updateUserQuery, async(error,result)=>{
            console.log(error)
            console.log(result)
            response.status(200)
            response.send("Updated Successfully")
          })
      }else{
        response.send("Incorrect Password")
      }
    } else {
     console.log(error)
    }

  });
})


app.post("/getcategory", async (request, response) => {

  const {category}=request.body
 
  const selectUserQuery = `SELECT * FROM products where category="${category}" ;`;

try {
  db.query(selectUserQuery, (error, result) => {
    console.log('error', error);
    console.log('result', result)
    response.status(200).send(result);

  })
} catch (error) {
  console.log(error)
}

  ;
})
