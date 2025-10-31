import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import SearchForm from "../SearchForm/SearchForm";
import styles from "./styles.module.css";

function Header() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={`container ${styles.header_container}`}>
        <Logo />

        <SearchForm
          onSearch={(query) => navigate(`/search/${encodeURIComponent(query)}`)}
        />
      </div>
    </div>
  );
}

export default Header;
