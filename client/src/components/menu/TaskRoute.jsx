import { NavLink } from "react-router-dom";

function TaskRoute({ category, linkTo }) {
  return (
    <div>
      <NavLink
        to={linkTo}
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "#EA5959" : "",
          };
        }}
      >
        {category}
      </NavLink>
    </div>
  );
}
export default TaskRoute;
