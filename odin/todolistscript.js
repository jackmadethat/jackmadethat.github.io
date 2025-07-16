const container = document.getElementById("container");

function ToDo(title, dueDate, status, priority, note) {
  this.toDoTitle = title;
  this.toDoDueDate = dueDate;
  this.toDoStatus = status;
  this.toDoPriority = priority;
  this.toDoNote = note;
};

function Project(name, toDos) {
  this.name = name;
  this.toDos = toDos;
};

const projects = [];

/*
const dailyTasks = new Project("Daily Tasks", []);
const weeklyTasks = new Project("Weekly Tasks", []);

projects.push(dailyTasks);
projects.push(weeklyTasks);

const dailyShower = new ToDo("Shower", new Date(2025, 6, 20).toDateString(), "Active", "Urgent", "Gotta shower every day!");
const waterGarden = new ToDo("Water Garden", new Date(2025, 6, 24).toDateString(), "Active", "Urgent", "Water the plants");

dailyTasks.toDos.push(dailyShower);
dailyTasks.toDos.push(waterGarden);
*/

const setupNewProject = () => {
  document.getElementById("addNewProjectBtn").style.display = "none";
  document.getElementById("addNewProjectForm").style.display = "block";
}

const cancelNewProject = (e) => {
  document.getElementById("addNewProjectBtn").style.display = "block";
  document.getElementById("addNewProjectForm").style.display = "none";
}

const addNewProject = (e) => {
  if (document.getElementById("newProjectName").value != "") {
    const newProject = new Project(document.getElementById("newProjectName").value, []);
    projects.push(newProject);
    document.getElementById("addNewProjectBtn").style.display = "block";
    document.getElementById("addNewProjectForm").style.display = "none";
    listProjects();
  }
}

const setupNewToDo = (projectName) => {
  container.insertAdjacentHTML("beforeend", `
    <form>
      <div>
        <label for="title">Title</label>
        <input type="text" id="toDoTitle" name="title" required>
      </div>
      <div>
        <label for="due_date">Due Date</label>
        <input type="date" id="toDoDate" name="due_date" required>
      </div>
      <div>
        <label for="status">Status</label>
        <select id="toDoStatus" name="status" required>
          <option value="option1">Not Started</option>
          <option value="option2">In Progress</option>
          <option value="option3">On Hold</option>
        </select>
      </div>
      <div>
        <label for="priority">Priority</label>
        <select id="toDoPriority" name="priority" required>
          <option value="option1">1</option>
          <option value="option2">2</option>
          <option value="option3">3</option>
          <option value="option4">4</option>
          <option value="option5">5</option>
        </select>
      </div>
      <div>
        <label for="note">Note</label>
        <textarea id="toDoNote" name="note" required></textarea>
      </div>
      <button type="button" id="addNewToDoBtn" onclick="addNewToDo('${projectName}')">Add</button><button type="button" id="cancelNewToDoBtn" onclick="listProjects()">Cancel</button>
    </form>
  `);
}

const addNewToDo = (projectName) => {
  if (document.getElementById("toDoTitle").value != "") {
    const newToDo = new ToDo(document.getElementById("toDoTitle").value, document.getElementById("toDoDate").value, document.getElementById("toDoStatus").value, document.getElementById("toDoPriority").value, document.getElementById("toDoNote").value);
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].name == projectName) {
        projects[i].toDos.push(newToDo);
      } else {
        // console.log(projectName);
        // console.log(projects[i].name);
      }
    }
    listProjects();
  }
}

const deleteProject = () => {

}

const deleteToDo = () => {

}

const listProjects = () => {
  container.innerHTML = "";
  for (let j = 0; j < projects.length; j++) {
    container.insertAdjacentHTML("beforeend", `<h2>${projects[j].name}</h2>`);
    for (let i = 0; i < projects[j].toDos.length; i++) {
      container.insertAdjacentHTML("beforeend", `
        <h3>${projects[j].toDos[i].toDoTitle}</h3>
        <table>
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Note</th>
              <th>Mark Complete</th>
              <th></th>
            </tr>
          </thead>
          <tr>
            <td>${projects[j].toDos[i].toDoDueDate}</td>
            <td>${projects[j].toDos[i].toDoStatus}</td>
            <td>${projects[j].toDos[i].toDoPriority}</td>
            <td>${projects[j].toDos[i].toDoNote}</td>
            <td><input type="checkbox" /></td>
            <td><button>Delete</button></td>
          </tr>
        </table>
      `);
    }
    container.insertAdjacentHTML("beforeend", `<button type="button" onclick="setupNewToDo('${projects[j].name}')">Add New To-Do</button><button onclick="deleteProject()">Delete Project</button>`);
  }
}

//listProjects();