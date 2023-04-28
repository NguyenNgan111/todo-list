import "./App.css";
import TodoPage from "./components";
import { createContext, useState, useEffect } from "react";
import CallAPI from "./callAPI/Axios";
export const TodoContext = createContext();
function App() {
  const [todo, setTodos] = useState([]);
  const callAPI = () => {
    console.log("api");
    CallAPI("http://localhost:8080/tasks", "GET", null)
      .then((res) => {
        setTodos(() => res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => callAPI(), []);
  return (
    <TodoContext.Provider value={[todo, setTodos]}>
      <div className="App">
        <TodoPage />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
