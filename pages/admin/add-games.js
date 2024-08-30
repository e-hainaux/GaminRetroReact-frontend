import withAdminAuth from "../../components/adminComponents/withAdminAuth";
import AdminHeader from "@/components/adminComponents/AdminHeader";

function AddGames() {
  return (
    <div>
      <AdminHeader />
    </div>
  );
}

export default withAdminAuth(AddGames);
