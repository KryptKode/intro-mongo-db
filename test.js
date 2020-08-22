const mongoose = require("mongoose");

const student = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "school",
    }
}, { timestamps: true })

const school = new mongoose.Schema({
    name: String,
})

const Student = mongoose.model("student", student);
const School = mongoose.model("school", school);

const url = "mongodb://localhost:27017/test-students"
const connect = (url) => mongoose.connect(url);

connect(url).then(async (connection) => {
    console.log("Connected to DB")
    const school = await School.findOneAndUpdate({ name: "FSS" }, { name: "Federal Staff School" }, { upsert: true, new: true }).exec();
    const student = await Student.create({ firstName: "Paulus", school: school.id });
    const student2 = await Student.create({ firstName: "Raul", school: school.id });

    const match = await Student.findById(student.id).populate("school").exec();
    console.log("Found: ", match);
}).catch(err => console.error("Error connecting to DB", err));

