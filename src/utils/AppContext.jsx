import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();
AppContext.propTypes = {
  children: PropTypes.node,
};
function AppContext({ children }) {
  const inittalStateHistory =
    JSON.parse(localStorage.getItem("history_watch")) || [];
  const inittalStateCartusser =
    JSON.parse(localStorage.getItem("history_CartUser")) || [];
  const inittalStateGmailInfor =
    JSON.parse(localStorage.getItem("history_Gmail")) || [];
  const [Dataproduct, setDataproduct] = useState([]);
  const [history, sethistory] = useState(inittalStateHistory);
  const [cartuser, setcartuser] = useState(inittalStateCartusser);
  const [gmailinfor, setgmailinfor] = useState(inittalStateGmailInfor);
  // const [productDetail, setproductDetail] = useState({}), productDetail,setproductDetail,;

  const [number, setnumber] = useState(0);
  useEffect(() => {
    localStorage.setItem("history_watch", JSON.stringify(history));
    setnumber(history.length);
  }, [history]);

  useEffect(() => {
    localStorage.setItem("history_CartUser", JSON.stringify(cartuser));
  }, [cartuser]);

  useEffect(() => {
    localStorage.setItem("history_Gmail", JSON.stringify(gmailinfor));
  }, [gmailinfor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://657849fff08799dc8044ce22.mockapi.io/Productdata"
        );
        const result = await response.json();
        setDataproduct(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Throttle API requests by waiting for 1000 milliseconds before making a new request
    const fetchDataThrottled = setTimeout(fetchData, 1000);
    return () => clearTimeout(fetchDataThrottled); // Clear the timeout on component unmount
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          history,
          sethistory,
          cartuser,
          setcartuser,
          number,
          setnumber,
          Dataproduct,
          setDataproduct,
          gmailinfor,
          setgmailinfor,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

export default AppContext;
