import { Link } from "react-router-dom";

export const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};
