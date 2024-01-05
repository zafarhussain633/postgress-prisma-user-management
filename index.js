const express = require("express");
const app = express();
const cors = require("cors");
// const pool = require("./db");
const prisma = require("./db");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "pern app running" });
});

// get all
app.get("/api/users", async (req, res) => {
  try {
    console.log(req.body);
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// delete by id
app.delete("/api/users/:userId", async (req, res) => {
  try {
    console.log(req.body);
    const userId = parseInt(req.params.userId);

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ error: error});
  }
});


//get single user 
app.get("/api/users/:userId", async (req, res) => {
  try {
    console.log(req.body);
    const userId = parseInt(req.params.userId);

    const foundUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

// Your endpoint for updating a user by ID
app.put("/api/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
  
    // Use Prisma Client to update the user by ID
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: req.body,
    });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error});
  }
});




// add user
app.post("/api/users", async (req, res) => {
  try {
    console.log(req.body);
    const { name, description } = req.body;
    //without prisma
    // Insert the new todo into the database
    // const result = await pool.query(
    //   'INSERT INTO users ( name, description) VALUES ($1, $2) RETURNING *',
    //   [ name, description]
    // );
    // The inserted todo will be available in result.rows[0]

    //with prisma
    const newUser = await prisma.user.create({
      data: {
        name,
        description,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error("Error inserting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log("listening on port", port);
});
