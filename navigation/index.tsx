import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import MainPage from "../components/MainPage";
import SignIn from "../components/SignIn";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SignUp from "../components/SignUp";
import { UserProvider } from "../components/context/userContext";
import LandingPage from "../components/LandingPage";
import Drawer from "../components/Drawer";
import CategoryCampaigns from "../components/category/Tech";
import Profile from "../components/Profile";
import MyCampaigns from "../components/UserData/MyCampaigns";
import MyFavCampaigns from "../components/UserData/MyFavCampaigns";
import HowItWorks from "../components/UserData/HowItWorks";
import ContactUs from "../components/DrawerComponents/ContactUs";
import NewCampaign from "../components/NewCampaign";
import EditCampaign from "../components/EditCampaign";
import CardDetails from "../components/UserData/CardDetails";
import EditProfile from "../components/UserData/EditProfile";
import Notifications from "../components/Notifications";
import RaisedDonations from "../components/RaisedDonations";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "light" ? DefaultTheme : DarkTheme}
      // theme={colorScheme === "light" ? DarkTheme : DefaultTheme}
    >
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tech"
        component={CategoryCampaigns}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyCampaigns"
        component={MyCampaigns}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyFavCampaigns"
        component={MyFavCampaigns}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewCampaign"
        component={NewCampaign}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditCampaign"
        component={EditCampaign}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardDetails"
        component={CardDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RaisedDonations"
        component={RaisedDonations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Donate"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
