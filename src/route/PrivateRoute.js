import React from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state);
  // const dispatch = useDispatch();
  return (
    <Route
      {...rest}
      render={(props) =>
        user.auth.token === "" ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
