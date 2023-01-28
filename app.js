// Selectors
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("todo-button");
const todoUl = document.getElementById("todo-ul");

let todos = []

const renderSavedTodos = () => {
    todos.forEach((todo) => {
        createListElement(todo);
    })
}
renderSavedTodos();

// Butona click olduğunda ne olsun?
addBtn.addEventListener("click", (e) => {
    e.preventDefault()                               // sayfanın yenilenemsini engelledik
    if(todoInput.value.trim() === ""){               // inputun içine değer girilmediyse alert ver
        alert("Please enter new todo")
    }else{
        const newTodo = {
            id: new Date().getTime(),
            completed:false,
            text:todoInput.value,
        };
        // yeni bir li elementi oluşturup DOM a bas
        createListElement(newTodo);        
        todos.push(newTodo);  // yeni oluşturulan todo yu diziye sakla        
        localStorage.setItem("TODOS", JSON.stringify(todos));
        console.log(todos)
        todoInput.value = "";
    }
})

function createListElement(newTodo){
    const { id, completed, text } = newTodo
    const li = document.createElement("li");    // li elementi olusturduk
    li.setAttribute("id", id);
    completed && li.classList.add("checked");

    const okIcon = document.createElement("i");
    okIcon.setAttribute("class", "fas fa-check");
    li.appendChild(okIcon);

    const p = document.createElement("p");
    const pTextNode = document.createTextNode(text);
    p.appendChild(pTextNode);
    li.appendChild(p);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fas fa-trash");
    li.appendChild(deleteIcon);

    todoUl.appendChild(li);
}

todoUl.addEventListener("click", (e) => {    
    const id = e.target.parentElement.getAttribute("id");
    if(e.target.classList.contains("fa-trash")) {
        e.target.parentElement.remove();
        todos = todos.filter((todo) => todo.id !== Number(id));
        localStorage.setItem("TODOS", JSON.stringify(todos));
    }else if(e.target.classList.contains("fa-check")) {
        e.target.parentElement.classList.toggle("checked");
        todos.map((todo, index) => {
            if(todo.id == id) {
                todos[index].completed = !todos[index].completed;
            }
        });
        localStorage.setItem("TODOS", JSON.stringify(todos));
    }
});

todoInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter"){
        addBtn.click();
    }
})

window.onload = function () {
    todoInput.focus();
}