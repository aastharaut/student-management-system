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
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(login(res.data.data)); //backend returns { success, data: user }
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
