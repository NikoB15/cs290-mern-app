import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to the database
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


// Define the schema and compile the model
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
}, {collection: "exercises"});

/**
 * Represents an exercise document in the database.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);



/**
 * Creates a new exercise document with the specified data.
 * @param {*} data The data for the new exercise document.
 * @returns A new exercise object.
 */
const createExercise = async (data) => {
    const exercise = new Exercise({
        name: data.name, 
        reps: data.reps, 
        weight: data.weight, 
        unit: data.unit,
        date: data.date
    });
    return exercise.save();
}

/**
 * Finds all exercise documents in the database.
 * @returns A list of all exercises in the database.
 */
const findAllExercises = async () => {
    return Exercise.find({}).exec();
}

/**
 * Finds the exercise document with the specified ID.
 * @param {*} id The ID to search for.
 * @returns The matching exercise object, or null if none were found.
 */
const findExerciseById = async (id) => {
    return Exercise.findById(id).exec();
}

/**
 * Updates the exercise document with the specified ID with the key-value pairs provided in the update object.
 * @param {*} id The ID of the document to update.
 * @param {*} update The changes to make to the document.
 * @returns The number of documents that were modified (0 or 1).
 */
const updateExercise = async (id, update) => {
    const result = await Exercise.updateOne({_id: id}, update);
    return result.modifiedCount;
}

/**
 * Deletes the exercise document with the specified ID.
 * @param {*} _id The ID of the document to delete.
 * @returns The number of documents that were deleted (0 or 1).
 */
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

export {createExercise, findAllExercises, findExerciseById, updateExercise, deleteExercise};