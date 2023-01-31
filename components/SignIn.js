import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import * as yup from "yup";
import { Formik } from "formik";

import UserContext from "./context/userContext";
import { colors } from "./constants";

export default function SignIn() {
  const navigation = useNavigation();
  const { login } = useContext(UserContext);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <AntDesign
          style={styles.backicon}
          name="arrowleft"
          size={28}
          color={colors.primary}
          onPress={() => navigation.navigate("MainPage")}
        />
        <Text
          style={{
            color: colors.primary,
            fontSize: 40,
            fontWeight: "bold",
            marginLeft: "10%",
          }}
        >
          Funderr
        </Text>
        <Text
          style={{
            color: colors.primary,
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: "10%",
          }}
        >
          Log In to Funderr
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            // console.log(values);
            login(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 18,
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              >
                Email
              </Text>
              <TextInput
                name="email"
                style={styles.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 18,
                  marginTop: "5%",
                  marginLeft: "10%",
                }}
              >
                Password
              </Text>
              <TextInput
                name="password"
                style={styles.email}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
              <TouchableOpacity
                style={styles.signupbuttoncontainer}
                onPress={handleSubmit}
              >
                <Text style={styles.signupbutton}>Sign In</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        {/* <Text
        style={{
          color: colors.primary,
          fontWeight: "bold",
          fontSize: 15,
          margin: "10%",
        }}
      >
        Or Sign In with{" "}
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: "37%",
          bottom: 75,
          width: "10%",
        }}
      >
        <AntDesign name="google" size={35} color=colors.primary />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.primary,
          fontWeight: "bold",
          fontSize: 15,
          marginLeft: "10%",
          bottom: "7%",
        }}
      >
        Or Sign In with{" "}
      </Text>
      <TouchableOpacity
        style={{
          marginLeft: "37%",
          bottom: 80,

          width: "10%",
        }}
      >
        <AntDesign name="facebook-square" size={35} color=colors.primary />
      </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 80,
  },

  backicon: {
    marginLeft: 10,
    alignSelf: "flex-start",
    bottom: 40,
  },
  email: {
    marginLeft: "10%",
    borderWidth: 1,
    borderColor: colors.primary,
    height: 40,
    width: "75%",
    marginTop: "2%",
    borderRadius: 10,
    color: "black",
    padding: 10,
  },
  signupbuttoncontainer: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "13%",
    marginTop: "5%",
  },
  signupbutton: {
    color: "white",
  },
  errors: {
    fontSize: 10,
    color: "red",
    marginLeft: 45,
    marginTop: 5,
  },
});
