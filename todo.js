const todoTitle = document.querySelector("#todoName");
const addTodoBtn = document.querySelector("#addTodo");

const todoDesc = document.querySelector("#todoDesc");
const todoDate = document.querySelector("#todoDate");

const todoEstValue = document.querySelector("#estTime");
const todoEst = document.querySelector("#todoEstimate");

const todoCategory = document.querySelector("#todoCategory");
const todoList = document.querySelector(".your-todo");

const sortFilter = document.querySelector("#riseFall");
const deadlineCheck = document.querySelector("#deadlineEst");
const timeCheck = document.querySelector("#timeEst");
console.log(deadlineCheck.checked, timeCheck.checked);

const createTodoItem = (
  title,
  description,
  estimation,
  estimationUnit,
  deadline
) => {
  //Create Todo-card
  const todoCard = createDiv("todo");

  //Add divs for structure in To-do card
  let upperTodo = createDiv("upperCard");

  let middleTodo = createDiv("middleCard");

  let lowerTodo = createDiv("lowerCard");

  // Append to upper card position
  let status = createDiv("todoStatus");

  status.innerHTML = `<span>To-do</span>
  <span>Est. time: <span>${estimation}</span> ${estimationUnit}</span>
  <span>Deadline: <span>${deadline}</span></span>`;

  //Append to mid card position
  let todoDetails = createDiv("todoDetails");

  todoDetails.innerHTML = `<h4>${title}</h4>
  <p>${description}</p>
  `;
  //Append to lower card position
  const doneBtn = createButton("Done", "todoDoneBtn");
  const editBtn = createButton("Edit", "todoEditBtn");
  const deleteBtn = createButton("Delete", "todoDeleteBtn");

  doneBtn.addEventListener("click", () => {
    doneBtn.parentElement.parentElement.classList.add("todo-done");
    doneBtn.remove();
  });

  upperTodo.append(status);
  middleTodo.append(todoDetails);
  lowerTodo.append(doneBtn, editBtn, deleteBtn);
  todoCard.append(upperTodo, middleTodo, lowerTodo);

  return todoCard;
};

sortFilter.addEventListener("change", () => {
  let filter = sortFilter.value;
  timeSort(filter);
});

const timeSort = (filter) => {
  console.log(filter);
  const todoCards = Array.from(todoList.getElementsByClassName("todo"));

  todoCards.sort((a, b) => {
    const timeA = extractTimeDate(a);
    const timeB = extractTimeDate(b);
    console.log(timeA);
    //Check if sorting by rising or falling order
    if (filter === "rising") {
      return timeA - timeB;
    } else if (filter === "falling") {
      return timeB - timeA;
    }
  });
  //Clear and append the cards according to new order
  todoList.innerHTML = "";
  todoCards.forEach((card) => {
    todoList.appendChild(card);
  });
};

const extractTimeDate = (todoCard) => {
  //Check which checkbox is checked in sorting and sort according to

  if (timeCheck.checked) {
    const details = todoCard.querySelector(
      ".todoStatus span:nth-child(2) > span"
    );
    if (!details) return 0;
    const estText = details.textContent;
    const [estimation, _] = estText.split(" ");
    return parseInt(estimation) || 0;
  }
  if (deadlineCheck.checked) {
    const details = todoCard.querySelector(
      ".todoStatus span:nth-child(3) > span"
    );
    if (!details) return 0;
    const estText = details.textContent;
    const deadlineDate = new Date(estText);

    if (isNaN(deadlineDate.getTime())) {
      console.error("Invalid date format:", deadlineDate);
      return null;
    }
    return deadlineDate;
  }
};

const createDiv = (className) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(className);
  return todoDiv;
};

const createButton = (text, className) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add(className);
  return button;
};

todoDate.addEventListener("change", () => {
  console.log("start");
  const deadline = todoDate.value;

  if (new Date(deadline) < new Date()) {
    errorMessage.style.display = "block";
    addTodoBtn.disabled = true;
  } else {
    errorMessage.style.display = "none";
    addTodoBtn.disabled = false;
  }
});

addTodoBtn.addEventListener("click", () => {
  const title = todoTitle.value;
  const description = todoDesc.value;
  const estimation = todoEst.value;
  const estimationUnit = todoEstValue.value;
  const deadline = todoDate.value;
  console.log(estimation);

  const todoItem = createTodoItem(
    title,
    description,
    estimation,
    estimationUnit,
    deadline
  );
  todoList.append(todoItem);
  console.log(todoItem);
});
