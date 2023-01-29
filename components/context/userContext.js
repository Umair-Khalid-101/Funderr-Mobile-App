import React from "react";
import { createContext, useState } from "react";

const UserContext = createContext(null);

const BaseUrl = "http://192.168.43.154:3001/funderr";
let Usertoken;

export function UserProvider({ children }) {
  // STATES
  const [token, setToken] = useState(null);
  const [userdata, setUserData] = useState(null);

  // FUNCTIONS

  // 1- LOGIN
  const login = async (values) => {
    await fetch(`${BaseUrl}/auth`, {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Usertoken = data;
        // console.log(Usertoken);
        setToken(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch(`${BaseUrl}/currentuser`, {
      headers: {
        "x-auth-token": Usertoken,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = data;
        setUserData(newUser);
      });
  };

  return (
    <UserContext.Provider
      value={{ token, userdata, setToken, setUserData, login }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
