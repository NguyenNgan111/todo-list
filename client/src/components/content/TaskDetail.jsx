import clsx from "clsx";
import styles from "./TaskDetail.module.scss";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../App";
import { useParams } from "react-router-dom";
import CallAPI from "../../callAPI/Axios";
import axios from "axios";
// import Modal from "./Modal";
function TaskDetail(props) {
  const { id } = useParams();

  const [todoList, setTodoList] = useState({});
  // const [todoList, setTodoList] = useContext(TodoContext);
  // useEffect(() => {
  //   setTodoList(todoList.find((todo) => todo.id === id));
  // });
  useEffect(() => {
    console.log("api");
    CallAPI(`http://localhost:8080/tasks/${id}`, "GET", null)
      .then((res) => {
        console.log(res.data);
        // setTodoList(() => res.data.find((todo) => todo.id == id));
        setTodoList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const { data } = await CallAPI(
    //     `http://localhost:8080/tasks/${id}`,
    //     "PUT",
    //     todoList
    //   );
    //   setTodoList([...data]);
    //   console.log("dâta", data);
    // } catch (error) {
    //   console.log("huhu", error);
    // }
    CallAPI(`http://localhost:8080/tasks/${id}`, "PUT", todoList)
      .then((res) => {
        console.log(res);
        // Modal("successful!");
        setTodoList({ ...todoList });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={clsx(styles.TaskDetail)}>
      <h1>Task Detail</h1>
      <form>
        <label>
          Person Incharge
          <input
            type="text"
            value={todoList.personIncharge}
            name="personIncharge"
            onChange={(e) =>
              setTodoList({ ...todoList, personIncharge: e.target.value })
            }
          />
        </label>
        <label>
          Todo
          <input
            type="text"
            name="todo"
            value={todoList.todo}
            onChange={(e) => setTodoList({ ...todoList, todo: e.target.value })}
          />
        </label>
        <label for="tags">Tag</label>
        <select
          name="tags"
          id="tags"
          value={todoList.tag}
          onChange={(e) => setTodoList({ ...todoList, tag: e.target.value })}
        >
          <option value="Uncategorized">Uncategorized</option>
          <option value="Groceries">Groceries</option>
          <option value="Payments">Payments</option>
          <option value="College">College</option>
        </select>
        <label className={clsx(styles.checkBox)}>
          Done?
          <input
            className={clsx(styles.inputCheck)}
            type="checkbox"
            name="check"
            checked={todoList.done}
            onChange={(e) => {
              if (todoList.done === false) {
                todoList.doneTime = new Date().toUTCString().slice(0, -3);
              } else {
                todoList.doneTime = "";
              }
              setTodoList({ ...todoList, done: !todoList.done });
              console.log(todoList);
            }}
          />
        </label>
        <p className={clsx(styles.doneTime)}>
          Done Time: <span>{todoList.doneTime}</span>
        </p>
        <p className={clsx(styles.createdTimeStamp)}>
          Created Time Stamp: <span>{todoList.createdTimeStamp}</span>
        </p>
        <button
          onClick={(e) => handleSubmit(e)}
          className={clsx(styles.btnSubmit)}
        >
          SAVE
        </button>
      </form>
    </div>
  );
}
export default TaskDetail;
