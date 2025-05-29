import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});



app.post('/exercises', async (req, res) => {
    if (isValidBody(req.body)) {
        const exercise = await exercises.createExercise(req.body);
        res.status(201).json(exercise);
    } else {
        res.status(400).json({Error: 'Invalid request'});
    }
});

app.get('/exercises', async (_req, res) => {
    const allExercises = await exercises.findAllExercises();
    res.status(200).json(allExercises);
});

app.get('/exercises/:id', async (req, res) => {
    const match = await exercises.findExerciseById(req.params.id);
    if (match !== null) {
        res.status(200).json(match);
    } else {
        res.status(404).json({Error: 'Not found'});
    }
});

app.put('/exercises/:id', async (req, res) => {
    if (isValidBody(req.body)) {
        const update = {
            name: req.body.name,
            reps: req.body.reps,
            weight: req.body.weight,
            unit: req.body.unit,
            date: req.body.date
        }

        const numUpdated = await exercises.updateExercise(req.params.id, update);
        if (numUpdated !== 0) {
            update._id = req.params.id;
            res.status(200).json(update);
        } else {
            res.status(404).json({Error: 'Not found'});
        }
    } else {
        res.status(400).json({Error: 'Invalid request'});
    }
});

app.delete('/exercises/:id', async (req, res) => {
    const numDeleted = await exercises.deleteExercise(req.params.id);
    if (numDeleted !== 0) {  
        res.status(204).send();
    } else {
        res.status(404).json({Error: 'Not found'});
    }
});



/**
 * Determines whether the given JSON object has the keys 'name', 'reps',
 * 'weight', 'unit', and 'date', all with valid values.
 * @param {*} bodyJSON The object to validate
 * @returns true if the object is valid; otherwise, false.
 */
function isValidBody(bodyJSON) {
    return isValidString(bodyJSON.name) && isPositiveInteger(bodyJSON.reps) 
        && isPositiveInteger(bodyJSON.weight) && isValidWeightUnit(bodyJSON.unit) 
        && isValidDate(bodyJSON.date);
}

/**
 * Determines whether the given object is a non-empty string.
 * @param {*} obj The object to validate
 * @returns true if the object is a non-empty string; otherwise, false.
 */
function isValidString(obj) {
    return typeof obj === 'string' && obj.length >= 1;
}

/**
 * Determines whether the given object is a positive integer or a string
 * representing a positive integer (in standard notation).
 * @param {*} obj The object to validate
 * @returns true if the object is a positive integer; otherwise, false.
 */
function isPositiveInteger(obj) {
    if (typeof obj === 'string') {
        return /^\d+$/.test(obj) && parseInt(obj) > 0;
    } else if (typeof obj === 'number') {
        return obj > 0;
    } else {
        return false;
    }
}

/**
 * Determines whether the given object is either the string 'lbs' or the string 'kgs'.
 * @param {*} obj The object to validate
 * @returns true if the object is 'kgs' or 'lbs'; otherwise, false.
 */
function isValidWeightUnit(obj) {
    return typeof obj === 'string' && ['lbs','kgs'].includes(obj);
}

/**
 * Determines whether the given object is a string matching the format 'MM-DD-YY'
 * and represents a valid date (e.g., 02-30-00 is not valid because February 30
 * isn't a valid date).
 * @param {*} obj The object to validate
 * @returns true if the object is a valid date in MM-DD-YY format; otherwise, false.
 */
function isValidDate(obj) {
    if (typeof obj !== 'string') return false;
    const format = /^(?<month>\d\d)-(?<day>\d\d)-(?<year>\d\d)$/;

    const match = obj.match(format);
    if (match == null) return false;

    const month = Number(match.groups.month);
    const day = Number(match.groups.day);
    const year = Number(match.groups.year);

    // Validate the month and day
    if (month < 1 || month > 12) return false;

    if (day < 1) return false;
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return day <= 31;
    } else if (month === 2) {
        // Years divisible by 100 are only leap years if they are also divisible by 400.
        // We assume the date is in the current century, in which every year divisible by 4 is a leap year.
        return year % 4 === 0 ? day <= 29 : day <= 28;
    } else {
        return day <= 30;
    }
}