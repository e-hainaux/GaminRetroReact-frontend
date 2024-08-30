import React from "react";

import { Provider } from "react-redux";
import store from "../../redux/store";
import AdminDashboard from "../../components/adminComponents/AdminDashboard";

function Index() {
  return (
    <Provider store={store}>
      <div>
        <AdminDashboard />
      </div>
    </Provider>
  );
}

export default Index;
