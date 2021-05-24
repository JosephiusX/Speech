// todo app /////////////////////////////////////////////////
// todo app /////////////////////////////////////////////////
// todo app /////////////////////////////////////////////////

// //Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) { // pass in event to addTodo function
  
  e.preventDefault();//Prevent natural behaviour
  
  const todoDiv = document.createElement("div");//Create todo div
  todoDiv.classList.add("todo"); // give it a class of todo
  
  const newTodo = document.createElement("li");//Create list
  newTodo.innerText = todoInput.value; // give li todoInput(text area) value
  
  saveLocalTodos(todoInput.value);//Save to local - do this last

  newTodo.classList.add("todo-item"); // add class todo-item to newTodo li item
  todoDiv.appendChild(newTodo); // append new todo to 
  todoInput.value = ""; // clear the text input value
  
  const playBtn = document.createElement("button");//Create Completed Button
  playBtn.innerHTML = `<i class="fas fa-play"></i>`; // give completed button inner html
  playBtn.classList.add("play-btn"); // give it a class
  todoDiv.appendChild(playBtn); // append the button to todo div
  
  const trashButton = document.createElement("button");//Create trash button
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`; // give it an html 
  trashButton.classList.add("trash-btn"); // give it a classlist
  todoDiv.appendChild(trashButton); // append trashButton to todo-div created above

  
  
  todoList.appendChild(todoDiv); // append todoDiv to todo list
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");
    //at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes; // make a variable for all the todoList children (the todos)
  todos.forEach(function(todo) { // for each todo in list todos
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

// text to speach and buttons ///////////////////////////////
// text to speach and buttons ///////////////////////////////
// text to speach and buttons ///////////////////////////////

const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')
const clearButton = document.getElementById('clear-button')
const container = document. querySelector('subject-container')
let currentCharacter
var synth = window.speechSynthesis;

// event listeners

// playButton.addEventListener('click', () => { 
//     playText(textInput.value)
// })
// pauseButton.addEventListener('click', pauseText)
// stopButton.addEventListener('click',stopText)
speedInput.addEventListener('input', () => { // when i change the speed
    stopText() // i stop the speek
    playText(utterance.text.substring(currentCharacter)) // start it where I left off
})
window.addEventListener('load',stopText)




const utterance = new SpeechSynthesisUtterance(text)
utterance.addEventListener('end', () => { // listening for the end of utterance 
    textInput.disabled = false // we make the textbox work again after utterance is finished
})
utterance.addEventListener('boundary', e => {
    currentCharacter = e.charIndex
})

function playText(text) {
    
    if (speechSynthesis.paused){ // if we are paused and have text left to speek
        playText(utterance.text.substring(currentCharacter)) // the return is so that we dont go on to the next and return a new speech utterance
    }
    if (speechSynthesis.speaking) return
    utterance.text = text
    utterance.rate = speedInput.value || 1
    textInput.disabled = true // disables textbox while playing
    speechSynthesis.speak(utterance)
}

function pauseText() {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause()
    }
}

function stopText() {
    synth.resume()
    speechSynthesis.cancel()
    textInput.disabled = false
}

// keyboard logic ////////////////////////////////////////////
// keyboard logic ////////////////////////////////////////////
// keyboard logic ////////////////////////////////////////////

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    }, 

    _createKeys() {
        // fragments are little virtual elements that I can use to append other elements to then append the whole fragment to another element 
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "save" , '',
            ,'clear',"space" /*"pause"*/, "stop", "play"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button"); // setting the keys to be buttons
            keyElement.classList.add("keyboard__key"); // giving all the keys a class

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
                    
                case "clear":
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLocaleLowerCase();

                    keyElement.addEventListener("click", () => {
                        textInput.value = ''
                        this.properties.value = this.properties.value = "";
                        synth.cancel()
                    })

                    break;

                case "save" :
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLocaleLowerCase();

                    keyElement.addEventListener('click', () => {
                        console.log(this.properties.value)
                    })
                    
                    break;

                // case "pause" :
                //     keyElement.classList.add('keyboard__key--wide');
                //     keyElement.textContent = key.toLocaleLowerCase();

                //     keyElement.addEventListener('click', pauseText);

                    
                //     break;

                case "stop" :
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLocaleLowerCase();

                    keyElement.addEventListener('click',stopText)

                    
                    break;

                case "play" :
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLocaleLowerCase();

                    keyElement.addEventListener('click', () => { 
                        if(this.properties.value.length > 0)
                        playText(this.properties.value)
                    })
                    
                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;
 
                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

const Category = function(subject, phrase) {
    this.subject = subject;
    this.phrase = phrase;
}

console.log(new Category('subject', 'phrase'))
