import React from "react";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserContext = createContext(null);

const BaseUrl = "http://192.168.43.154:3001/funderr";
let Usertoken;

export function UserProvider({ children }) {
  // NAVIGATOR
  const navigation = useNavigation();

  // STATES
  const [token, setToken] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [signUpSuccessfull, setsignUpSuccessfull] = useState(true);
  const [loginSuccessfull, setLoginSuccessfull] = useState(true);
  const [verifiedCampaigns, setVerifiedCampaigns] = useState();
  const [categoryCampaigns, setCategoryCampaigns] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        // console.log(data);
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
        // console.log(data);
        const newUser = data;
        setUserData(newUser);
        setLoginSuccessfull(true);
      })
      .catch((error) => {
        console.log(error);
        setLoginSuccessfull(false);
      });
  };

  // 2- SIGNUP
  const registerUser = async (values) => {
    await fetch(`${BaseUrl}/mobileregister`, {
      body: values,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setsignUpSuccessfull(true);
      })
      .catch((err) => {
        console.log(err);
        setsignUpSuccessfull(false);
      });
  };

  // 3- CREATE CAMPAIGN
  const createCampaign = async (data) => {
    await fetch(`${BaseUrl}/createcampaign`, {
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        token,
        userdata,
        setToken,
        setUserData,
        login,
        registerUser,
        signUpSuccessfull,
        loginSuccessfull,
        verifiedCampaigns,
        setVerifiedCampaigns,
        categoryCampaigns,
        setCategoryCampaigns,
        createCampaign,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
