import withAdminAuth from "../../components/adminComponents/withAdminAuth";
import AdminHeader from "../../components/adminComponents/AdminHeader";
import AdminSearchAPI from "../../components/adminComponents/AdminSearchAPI";

function AddGames() {
  return (
    <div>
      <AdminHeader />
      <AdminSearchAPI />
    </div>
  );
}

export default withAdminAuth(AddGames);
