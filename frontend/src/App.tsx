import { Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "./redux/slice/userSlice";

function App() {
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("accesstoken");
    axios
      .get("http://localhost:3000/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(login(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
    {isloading ? (
      <p> Loading... </p>
    ) : (
      <>
      <ToastContainer />
      <Route />
      </>
    )}
    </>
  );
}

export default App;
