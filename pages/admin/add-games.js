import { useState } from "react";
import withAdminAuth from "../../components/adminComponents/withAdminAuth";
import AdminHeader from "../../components/adminComponents/AdminHeader";
import AdminControlPannel from "../../components/adminComponents/AdminControlPannel";
import AdminSearchAPI from "../../components/adminComponents/AdminSearchAPI";
import AdminUpdateBDD from "../../components/adminComponents/AdminUpdateBDD";

function AddGames() {
  const [activeTab, setActiveTab] = useState("add"); // Valeur par défaut

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <AdminHeader />
      <AdminControlPannel onTabChange={handleTabChange} />
      {activeTab === "add" && <AdminSearchAPI />}
      {activeTab === "update" && <AdminUpdateBDD />}
    </div>
  );
}

export default withAdminAuth(AddGames);
