import React from "react";
import styles from "./Modal.module.css";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modal}>{children}</div>;
};
