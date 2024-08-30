import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAdminAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    const { token, loading } = useSelector((state) => state.admin);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        if (loading) {
          return;
        }

        if (!token) {
          router.push("/admin");
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [token, loading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAdminAuth;
