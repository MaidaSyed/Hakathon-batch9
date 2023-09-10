import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

import {db} from "./config.js"

// Get a reference to the "ADD DETAILS" button by its ID
const addButton = document.getElementById("addDetails");

// Add a click event listener to the button
addButton.addEventListener("click", function() {
    // Get the selected values from the form elements
    const classTimings = document.getElementById("class-timings").value;
    const scheduleOfClasses = document.getElementById("schedule-of-classes").value;
    const teacherName = document.getElementById("teachers-name").value;
    const sectionName = document.getElementById("section-name").value;
    const courseName = document.getElementById("course-name").value;
    const batchNumber = document.getElementById("batch-num").value;

    // Log the selected values (you can replace this with your desired action)
    console.log("Class Timings: " + classTimings);
    console.log("Schedule of Classes: " + scheduleOfClasses);
    console.log("Teacher Name: " + teacherName);
    console.log("Section Name: " + sectionName);
    console.log("Course Name: " + courseName);
    console.log("Batch Number: " + batchNumber);

    const classRef = ref(db, "class/" + courseName)

    let classDetails = {
        classTimings,
        scheduleOfClasses,
        teacherName,
        sectionName,
        courseName,
        batchNumber,
    }

    set(classRef, classDetails)
    setTimeout(function(){
        window.location.href = "./class.html"
    },2000)

});

