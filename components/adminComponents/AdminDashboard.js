import React from "react";
import AdminConnectScreen from "./AdminConnectScreen";
import styles from "../../styles/AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.mainContainer}>
      <AdminConnectScreen />
    </div>
  );
};

export default AdminDashboard;
