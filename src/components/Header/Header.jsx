import styles from "./styles.module.css";
import { useState } from "react";

function Header() {
  const [searchValue, setSearchValue] = useState("");

  const performSearch = () => {
    if (searchValue.trim() !== "") {
      console.log(searchValue);
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
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleClick}>Поиск</button>
    </div>
  );
}

export default Header;
