const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
//schema file 
const Traveler = require('./TravelerDB');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/tripplanner");

app.post("/travelForm", async (req, res) => {
    try {
        const travelData = new Traveler(req.body);
        console.log(travelData);
        await travelData.save();
        res.status(200).json({ message: "the travel data was stored successfully" });
    }
    catch (err) {
        console.error(err);
    }
});

//fetch data from the database 

app.get("/travelForm", async (req, res) => {
    try {
        const travelDates = await Traveler.find();

        if (travelDates.length == 0) {
            return res.status(404).json({ message: "there are no entries in the database " });
        }
        const recentSubmission = travelDates[travelDates.length - 1];
        const { startAvailability, endOfAvailability, travelDays } = recentSubmission;

        const maxStartDate = new Date(Math.max(...startAvailability.map(date => new Date(date))));
        const minEndDate = new Date(Math.min(...endOfAvailability.map(date => new Date(date))));

        const availableDays = (minEndDate - maxStartDate) / 1000 * 60 * 60 * 24;
        if (availableDays >= travelDays) {
            const idealStartDate = new Date(maxStartDate);
            const idealEndDate = new Date(minEndDate);
            idealEndDate.setDate(idealEndDate.getDate() + travelDays - 1);

            return res.status(200).json({
                idealStartDate,
                idealEndDate
            });
        }
    }
    catch (err) {
        console.error("there was an error fetching the data from the database.", err);
        res.status(500).json({ message: "internal server error" });

    }
})

app.listen(5001, () => {
    console.log("Backend running on http://localhost:5001");
});
