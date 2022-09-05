import { Route, Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "app/hooks";
import { selectUser } from "features/auth/authSlice";
import { FC } from "react";

function PrivateRoute({ component: Component }: { component: FC }) {
  const location = useLocation();
  console.log(location);
  const auth = useAppSelector(selectUser);
  return (
    <Route
      element={
        auth.user ? (
          <Component />
        ) : (
          <Navigate to="login" state={{ from: location.pathname }} />
        )
      }
    />
  );
}

export default PrivateRoute;
