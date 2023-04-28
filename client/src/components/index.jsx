import * as Content from "./content/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/index";
import clsx from "clsx";
import styles from "./index.module.scss";
function TodoPage() {
  return (
    <BrowserRouter>
      <div className={clsx(styles.TodoPage)}>
        <Menu />
        <Routes>
          {/* <Route path="*" element={<Content.All tag="All" />} /> */}
          <Route path="*" element={<Content.All tag="All" />} />
          <Route path="Groceries" element={<Content.All tag="Groceries" />} />
          <Route path="College" element={<Content.All tag="College" />} />
          <Route path="Payments" element={<Content.All tag="Payments" />} />
          <Route
            path="Uncategorized"
            element={<Content.All tag="Uncategorized" />}
          />
          <Route path={`TaskDetail/:id`} element={<Content.TaskDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default TodoPage;
