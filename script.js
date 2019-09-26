"use strict";

const form = document.querySelector("#addForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  post();
});

function get() {
  fetch("https://frontend2019-28cd.restdb.io/rest/todo", {
    method: "get",
    headers: {
      "Content-type": "application/json; charset-utf-8",
      "x-apikey": "5d887478fd86cb75861e25fe",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(todo => {
      todo.forEach(addNewTask);
    });
}

get();

function addNewTask(list) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.list").dataset.listid = list._id;

  copy.querySelector("h1").textContent = list.todo;
  copy.querySelector("h2").textContent = list.maybe;
  copy.querySelector(".showDate").textContent = list.date;
  copy.querySelector(".showTime").textContent = list.time;
  copy.querySelector(".delete").addEventListener("click", () => {
    deleteIt(listid._id);
  });
  document.querySelector("#app").prepend(copy);
}

function post() {
  const list = {
    todo: form.elements.todo.value,
    maybe: form.elements.maybe.value,
    date: form.elements.date.value,
    time: form.elements.time.value
  };
  console.log(list);

  const postData = JSON.stringify(list);
  console.log(postData);
  fetch("https://frontend2019-28cd.restdb.io/rest/todo", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887478fd86cb75861e25fe",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addNewTask(data);
    });
}

function deleteIt(id) {
  fetch("https://frontend2019-28cd.restdb.io/rest/todo/" + id, {
    method: "delete",
    headers: {
      "Content-type": "application/json; charset-utf-8",
      "x-apikey": "5d887478fd86cb75861e25fe",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.querySelector(`.list[data-listid="${id}"]`).remove();
    });
}
