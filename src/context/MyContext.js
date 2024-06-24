import { createContext, useEffect, useState } from "react";
import fetchUserApi from "../api/profile-api";

const userContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    const result = await fetchUserApi(1);
    console.log(result, "data fetch success");
    const { id, email, name, phone } = result?.data;
    return result?.status === 200
      ? setUser({
          ...user,
          id,
          name,
          email,
          phone,
          city: result?.data?.address?.city,
        })
      : alert("some thing went wrong..");
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};

export { ContextProvider, userContext };
