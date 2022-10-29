import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCount } from "../features/notes/notesSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <header className="Header">
      <h1>Notes App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/note">Note</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
          <button
            onClick={() => {
              dispatch(increaseCount());
            }}
          >
            {count}
          </button>
        </ul>
      </nav>
    </header>
  );
};
