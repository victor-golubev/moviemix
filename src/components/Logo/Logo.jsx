import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Logo() {
  return (
    <Link to={"/"} className={styles.logo}>
      Movie<span>mix</span>
    </Link>
  );
}
