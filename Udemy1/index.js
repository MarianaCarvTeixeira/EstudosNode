const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", (request, response) => {
  const showPending = request.query.showPending;

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return response.status(500).send("Desculpe, algo deu errado!!");
    }
    const todos = JSON.parse(data);

    if (showPending !== "1") {
      return response.json({ todos: todos });
    } else {
      return response.json({
        todos: todos.filter((t) => {
          return t.complete === false;
        }),
      });
    }
  });
});

app.post("/todo", (request, response) => {
  if (!request.body.name) {
    return response.status(400).send("O nome é obrigatório");
  }
  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    if (err) {
      return response.status(500).send("Desculpe, algo deu errado!!");
    }
    const todos=JSON.parse(data)
    const maxId = Math.max.apply(math, todos.maps(t=>{return t.id}))
  });
});

app.put("/todos/:id/complete", (request, response) => {
  const id = request.params.id;

  const findToDoById = (todos, id) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === parseInt(id)) {
        return i;
      }
    }
    return -1;
  };

  fs.readFile("./store/todos.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    const todoIndex = findToDoById(todos, id);

    if (todoIndex === -1) {
      return response.status(404).send("Não encontrado!!");
    }

    todos[todoIndex].complete = true;

    fs.writeFile("./store/todos.json", JSON.stringify(todos), () => {
      return response.json({ status: "Ok" });
    });
  });
});

app.listen(3000, () => {
  console.log("aplicação rodando na porta http://localhost:3000/todos");
});
