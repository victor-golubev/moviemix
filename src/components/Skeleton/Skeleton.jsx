import React from "react";
import styles from "./styles.module.css";

function Skeleton({ type = "card", count = 1 }) {
  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => {
        switch (type) {
          case "sliderCard":
            return (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.sliderCard}`}
              />
            );
          case "listCard":
            return (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.listCard}`}
              />
            );
          case "tabButton":
            return (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.tabButton}`}
              />
            );
          case "card":
          default:
            return (
              <div key={i} className={`${styles.skeleton} ${styles.card}`} />
            );
        }
      })}
    </>
  );
}

export default Skeleton;
