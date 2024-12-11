import { useNavigate, useLocation } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtenemos la ubicación actual

  const home = () => {
    navigate("/artists");
  };

  const profile = () => {
    navigate("/profile");
  };

  const search = () => {
    navigate("/search");
  };

  return (
    <nav>
      <a
        onClick={home}
        className={location.pathname === "/artists" ? "active" : ""}
      >
        Home
      </a>
      <a
        onClick={search}
        className={location.pathname === "/search" ? "active" : ""}
      >
        Search
      </a>
      <a
        onClick={profile}
        className={location.pathname === "/profile" ? "active" : ""}
      >
        Profile
      </a>
    </nav>
  );
};

export default Nav;
