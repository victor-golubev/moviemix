import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Breadcrumbs() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1); // возвращает на предыдущую страницу
  };

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        {"< Главная"}
      </Link>
      <a href="#" onClick={handleBack} className={styles.link}>
        {" < Назад"}
      </a>
    </nav>
  );
}

export default Breadcrumbs;
