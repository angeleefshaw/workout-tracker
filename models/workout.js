const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: {
        type: {
            type: String,
            trim: true,
            required: "String is required."
        },
        name: {
            type: String,
            trim: true,
            required: "String is required."
        }, 
        duration: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        set: {
            type: Number,
            required: true
        } 
    }
});


//WorkoutSchema.methods.getStats= function() {};

//WorkoutSchema.methods.combineWeight = function() {};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;