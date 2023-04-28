import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import clsx from "clsx";
import TaskRoute from "./TaskRoute";
import { NavLink } from "react-router-dom";
const categories = [
  { linkTo: "/", category: "All" },
  { linkTo: "Uncategorized", category: "Uncategorized" },
  { linkTo: "Groceries", category: "Groceries" },
  { linkTo: "College", category: "College" },
  { linkTo: "Payments", category: "Payments" },
];
function Menu() {
  return (
    <div className={clsx(styles.Menu)}>
      <ul>
        {categories.map((c) => (
          <li>
            <TaskRoute category={c.category} linkTo={c.linkTo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Menu;
