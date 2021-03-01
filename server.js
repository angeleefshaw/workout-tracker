const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI || "mongodb://localhost/workout", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
  }
);



//html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/views/index.html'));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
})



//api routes
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkouts => {
    res.json(dbWorkouts)
  })
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
    .then(dbWorkout => {
    res.json(dbWorkout);
  })
});

 app.post("/api/workouts", ({body}, res) => {
   db.Workout.create(body)
    .then(dbWorkout => {
    console.log(dbWorkout);
    })
    .catch(err => {
    res.json(err);
  });
})

//Listener
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


//