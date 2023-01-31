import { useNavigation } from "@react-navigation/native";
import React from "react";
import { createContext, useState } from "react";
import { Alert } from "react-native";

const UserContext = createContext(null);

const BaseUrl = "http://192.168.43.154:3001/funderr";
let Usertoken;

export function UserProvider({ children }) {
  //NAVIGATOR
  const navigation = useNavigation();

  // STATES
  const [token, setToken] = useState(null);
  const [userdata, setUserData] = useState(null);
  const [verifiedCampaigns, setVerifiedCampaigns] = useState();
  const [categoryCampaigns, setCategoryCampaigns] = useState();
  const [myCampaigns, setMyCampaigns] = useState();
  const [myFavCampaigns, setMyFavCampaigns] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
        Alert.alert("Success!", "Logged In Successfully", [
          {
            text: "Ok",
            onPress: () => navigation.navigate("LandingPage"),
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Failed!", "Wrong Email or Password", [
          {
            text: "Ok",
            onPress: () => {},
          },
        ]);
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
        Alert.alert("Success!", "Signed Up Successfully", [
          {
            text: "Ok",
            onPress: () => navigation.navigate("SignIn"),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Failed!", "User Already Exists!", [
          {
            text: "Ok",
            onPress: () => {},
          },
        ]);
      });
  };

  // 3- CREATE CAMPAIGN
  const createCampaign = async (data) => {
    setIsLoading(true);
    await fetch(`${BaseUrl}/createcampaign`, {
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 4- EDIT/UPDATE CAMPAIGN
  const editCampaign = async (data, id) => {
    await fetch(`${BaseUrl}/editcampaign/${id}`, {
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 5- EDIT/UPDATE PROFILE
  const editProfile = async (data, id) => {
    await fetch(`${BaseUrl}/updatemobileprofile/${id}`, {
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 6- PUSH NOTIFICATION(CAMPAIGN CREATION)
  const sendNotification = async (data, id) => {
    let message = `You created a new campaign: ${data.title}`;
    let status = "unread";
    let user = id;
    const notification = {
      message,
      status,
      user,
    };
    await fetch(`${BaseUrl}/pushNotification`, {
      body: JSON.stringify(notification),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 7- MARK NOTIFICATIONS AS READ
  const markAsRead = async (id) => {
    await fetch(`${BaseUrl}/markasread/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 8- ADD DONATIONS
  const addDonation = async (data) => {
    await fetch(`${BaseUrl}/adddonation`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        verifiedCampaigns,
        setVerifiedCampaigns,
        categoryCampaigns,
        setCategoryCampaigns,
        createCampaign,
        isLoading,
        setIsLoading,
        myCampaigns,
        setMyCampaigns,
        editCampaign,
        myFavCampaigns,
        setMyFavCampaigns,
        editProfile,
        sendNotification,
        markAsRead,
        addDonation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
