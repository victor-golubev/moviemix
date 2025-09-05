import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const performSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    performSearch();
  };

  return (
    <div className={styles.header}>
      <div className={`container ${styles.header_container}`}>
        <Link to={"/"} className={styles.logo}>
          Movie<span>mix</span>
        </Link>

        <div className={styles.searchWrapper}>
          <input
            className={styles.input}
            type="text"
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Поиск фильмов..."
          />
          <button className={styles.button} onClick={handleClick}>
            Поиск
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
