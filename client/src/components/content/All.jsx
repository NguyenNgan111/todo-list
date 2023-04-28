import clsx from "clsx";
import styles from "./All.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { TodoContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import CallAPI from "../../callAPI/Axios";
function All({ tag }) {
  // const [todoList, setTodoList] = useContext(TodoContext);
  const [todoList, setTodoList] = useContext(TodoContext);

  const organize =
    tag == "All" ? todoList : todoList?.filter((item) => item.tag == tag);
  // const callAPI = async () => {
  //   const { data } = await axios.get(`http://localhost:8080/tasks`);
  //   console.log(data);
  // };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/tasks`)
      .then((res) => {
        console.log("all", res.data);
        setTodoList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  //post todo
  const [value, setValue] = useState({ text: "", tag: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: todoList.length != 0 ? todoList[todoList.length - 1].id + 1 : 1,
      todo: value.text || "your todo",
      tag: value.tag || "Uncategorized",
      done: false,
      doneTime: "",
      createdTimeStamp: "",
      personIncharge: "Ngan",
    };
    CallAPI("http://localhost:8080/tasks", "POST", task)
      .then(function (response) {
        console.log(response.data);
        setTodoList([...todoList, response.data]);
        // todoList.push(response.data);
        setValue({ text: "", tag: "" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleChangeText = (text) => {
    setValue((pre) => {
      return { ...pre, text: text };
    });
  };
  const handleChangeOption = (tag) => {
    setValue((pre) => ({ ...pre, tag: tag }));
  };
  //delete todo
  const handleDelete = (e, id) => {
    e.stopPropagation();
    CallAPI(`http://localhost:8080/tasks/${id}`, "DELETE", id)
      .then(function (response) {
        console.log(response);
        // const index = todoList.findIndex(element=>element.id==id)
        setTodoList(todoList.filter((todo) => todo.id !== id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //handle checkbox
  const handleCheckBox = (id) => {
    const index = todoList.findIndex((element) => element.id === id);
    const task = { ...todoList[index], done: !todoList[index].done };
    if (task.done == false) {
      task.doneTime = "";
    } else {
      task.doneTime = new Date().toUTCString().slice(0, -3);
    }
    CallAPI(`http://localhost:8080/tasks/${id}`, "PUT", task)
      .then((res) => {
        console.log(res);
        todoList.splice(index, 1, task);
        setTodoList([...todoList]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={clsx(styles.All)}>
      <h1>{tag !== "All" ? tag : "All"} Tasks</h1>
      <form id="form">
        <input
          placeholder={`Add a new task insdie ‘${
            tag !== "All" ? tag : "All"
          }’ category`}
          value={value.text}
          onChange={(e) => handleChangeText(e.target.value)}
        />
        <label for="tags">Choose a tag </label>
        <select
          name="tags"
          id="tags"
          onChange={(e) => handleChangeOption(e.target.value)}
        >
          <option value="Uncategorized">Uncategorized</option>
          <option value="Groceries">Groceries</option>
          <option value="Payments">Payments</option>
          <option value="College">College</option>
        </select>
        <button className={clsx(styles.btnSubmit)} onClick={handleSubmit}>
          ADD TODO
        </button>
      </form>
      <ul>
        {organize?.map((todo) => {
          return (
            <li key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBox(todo.id)}
                  checked={todo.done}
                />
                <Link to={`/TaskDetail/${todo.id}`}>
                  <p className={clsx(styles.content)}>
                    {todo.todo}
                    <span className={clsx(styles.tag)}>{todo.tag}</span>
                  </p>
                </Link>
                <span
                  onClick={(e) => handleDelete(e, todo.id)}
                  className={clsx(styles.remove)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default All;
