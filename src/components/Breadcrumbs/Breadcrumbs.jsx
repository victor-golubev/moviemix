import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Breadcrumbs() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        {"Главная"}
      </Link>
      <p className={styles.arrow}>{">"}</p>
      <a href="#" onClick={handleBack} className={styles.link}>
        {"Назад"}
      </a>
    </nav>
  );
}

export default Breadcrumbs;
