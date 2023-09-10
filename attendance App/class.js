// app.js
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

import { db } from "./config.js"

// Function to retrieve and display classes from Firestore
function displayClasses() {
    const classContainer = document.getElementById('class'); // Get the container element

    classContainer.innerHTML = '';

    const classRef = ref(db, "class/")
    let classTimings = []
    let scheduleOfClasses = []
    let teacherName = []
    let sectionName = []
    let courseName = []
    let batchNumber = []
    onValue(classRef, (snapshot) => {
        snapshot.forEach(snap => {
            console.log(snap.val());
            let classTime = snap.val().classTimings;
            let schedule = snap.val().scheduleOfClasses;
            let section = snap.val().sectionName
            let techer = snap.val().teacherName;
            let course = snap.val().courseName;
            let batch = snap.val().batchNumber;

            classTimings.push(classTime);
            scheduleOfClasses.push(schedule);
            teacherName.push(techer);
            sectionName.push(section);
            courseName.push(course);
            batchNumber.push(batch)
        })

        // Create a new div for each class
        for (var i = 0; i < classTimings.length; i++) {
            const classDiv = document.createElement('div');
            classDiv.className = "div"
            classes(classTimings[i], scheduleOfClasses[i], teacherName[i], sectionName[i], courseName[i], batchNumber[i], classDiv);
            classContainer.appendChild(classDiv);
        }
    })
}

function classes(time, sched, teac, sec, course, batch, classDiv) {
    classDiv.innerHTML = `  <div class="class-details">
    Class Timings: ${time}<br>
    Schedule: ${sched}<br>
    Teacher's Name: <span class="teacher">${teac}</span><br>
    Section: ${sec}<br>
    Course: ${course}<br>
    Batch: ${batch}<br>
</div>`
}

window.addEventListener('load', displayClasses);

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;
    const course = document.getElementById("course-name").value;

    const refrence = ref(db, "stud/" + rollNo);
    update(refrence, {
        name,
        rollNo,
        course,
    })
    const box = document.querySelector(".add-stu")
    box.style.display = "none"
    window.location.reload()
})
let bussStuName = [];
let bussStuNo = [];
let comStuName = [];
let comStuNo = [];
let engStuName = [];
let engStuNo = [];
const bussStuContainer = document.querySelector(".bussStu");
const comStuContainer = document.querySelector(".comStu");
const engStuContainer = document.querySelector(".engStu");
const stuRef = ref(db, "stud/");

onValue(stuRef, (snapshot) => {
    snapshot.forEach((snap) => {
        const course = snap.val().course;
        console.log(course);
        if (course === "Business Administration") {
            let name = snap.val().name;
            let rollNo = snap.val().rollNo;
            bussStuName.push(name);
            bussStuNo.push(rollNo);
        } else if (course === "Computer Science") {
            let name = snap.val().name;
            let rollNo = snap.val().rollNo;
            comStuName.push(name);
            comStuNo.push(rollNo);
        }
        else if (course === "Electrical Engineering") {
            let name = snap.val().name;
            let rollNo = snap.val().rollNo;
            engStuName.push(name);
            engStuNo.push(rollNo);
        }
    });

    for (let i = 0; i < comStuName.length; i++) {
        const comStuDiv = document.createElement('div');
        compStuData(comStuDiv, comStuName[i], comStuNo[i]);
        comStuContainer.appendChild(comStuDiv);
    }

    for (let i = 0; i < bussStuName.length; i++) {
        const bussStuDiv = document.createElement('div');
        bussStuData(bussStuDiv, bussStuName[i], bussStuNo[i]);
        bussStuContainer.appendChild(bussStuDiv);
    }

    for (let i = 0; i < engStuName.length; i++) {
        const engStuDiv = document.createElement('div');
        engStuData(engStuDiv, engStuName[i], engStuNo[i]);
        engStuContainer.appendChild(engStuDiv);
    }
});
function bussStuData(bussStuDiv, name, rollNo, status) {
    bussStuDiv.innerHTML = `<b>Name:</b> ${name} <b>Roll Number:</b> ${rollNo}<br>
                            <label for="status">Status:</label>
                            <select id="status" name="status">
                                <option value="Present" ${status === "Present" ? 'selected' : ''}>Present</option>
                                <option value="Absent" ${status === "Absent" ? 'selected' : ''}>Absent</option>
                                <option value="Leave" ${status === "Leave" ? 'selected' : ''}>Leave</option>
                                <option value="Late" ${status === "Late" ? 'selected' : ''}>Late</option>
                            </select>`;
}
function compStuData(compStuDiv, name, rollNo, status) {
    compStuDiv.innerHTML = `<b>Name:</b> ${name} <b>Roll Number:</b> ${rollNo}<br>
                            <label for="status">Status:</label>
                            <select id="status" name="status">
                                <option value="Present" ${status === "Present" ? 'selected' : ''}>Present</option>
                                <option value="Absent" ${status === "Absent" ? 'selected' : ''}>Absent</option>
                                <option value="Leave" ${status === "Leave" ? 'selected' : ''}>Leave</option>
                                <option value="Late" ${status === "Late" ? 'selected' : ''}>Late</option>
                            </select>`;
}
function engStuData(engStuDiv, name, rollNo, status) {
    engStuDiv.innerHTML = `<b>Name:</b> ${name} <b>Roll Number:</b> ${rollNo}<br>
                            <label for="status">Status:</label>
                            <select id="status" name="status">
                                <option value="Present" ${status === "Present" ? 'selected' : ''}>Present</option>
                                <option value="Absent" ${status === "Absent" ? 'selected' : ''}>Absent</option>
                                <option value="Leave" ${status === "Leave" ? 'selected' : ''}>Leave</option>
                                <option value="Late" ${status === "Late" ? 'selected' : ''}>Late</option>
                            </select>`;
}

const addStud = document.getElementById("add");

addStud.addEventListener("click", () => {
    const box = document.querySelector(".add-stu")
    box.style.display = "block"
})

const cancel = document.getElementById("cancel");
cancel.addEventListener("click", () => {
    const box = document.querySelector(".add-stu")

    box.style.display = "none"
})