import {getAuth} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"

const auth = getAuth()
const database = getDatabase()

auth.onAuthStateChanged(user => {
    const name = document.getElementById("name");
    const rollNo = document.getElementById("rollNo");
    const dp = document.querySelector(".img")
    if (user) {
      let userUid = auth.currentUser.uid
      const userRef = ref(database, "users/" + userUid);
      onValue(userRef, (snapshot) => {
          console.log(snapshot.val());
          name.value = snapshot.val().name
          rollNo.value = snapshot.val().rollNo
const firstName =  snapshot.val().name.slice(0,1);
dp.innerHTML = firstName
      })
    } else {
      // User is signed out, handle accordingly
      console.log('User is signed out.');
    }
  });

const mark = document.getElementById("mark")
mark.addEventListener("click", () => {
    const show = document.getElementById("p")
    mark.style.display = "none"
    show.innerHTML = "attendence marked👍"
})

function displayClasses() {
    const classContainer = document.getElementById('class'); // Get the container element

    classContainer.innerHTML = '';

    const classRef = ref(database, "class/")
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
