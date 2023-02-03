import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import UserContext from "./context/userContext";
import { colors } from "./constants";
const { height, width } = Dimensions.get("window");
import Loader from "./Loader";

export default function SignUp() {
  const { registerUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const placeHolder =
    "http://res.cloudinary.com/dfmhxmauj/image/upload/v1670337910/axqfk5lkxf09qsbhpspr.jpg";

  const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmpassword: yup
      .string()
      .required("Confrim Password is required")
      .oneOf([yup.ref("password")], "Passwords does not match"),
    name: yup
      .string()
      .required("Name is Required")
      .min(3, "Name must be 3 characters"),
  });

  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signUpValidationSchema),
  });
  const onSubmit = async (data) => {
    if (image) {
      const fData = new FormData();
      const ext = image?.uri.split(".").pop();
      const filename = `${data.name}.${ext}`;
      fData.append("name", data.name);
      fData.append("email", data.email);
      fData.append("password", data.password);
      fData.append("role", "user");
      fData.append("file", {
        uri: image.uri, // the file URI
        name: filename, // the file name
        type: `image/${ext}`, // the file type
      });
      setIsLoading(true);
      await registerUser(fData);
      setIsLoading(false);
    } else {
      const fData = new FormData();
      fData.append("name", data.name);
      fData.append("email", data.email);
      fData.append("password", data.password);
      fData.append("role", "user");
      fData.append("picture", placeHolder);
      setIsLoading(true);
      await registerUser(fData);
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log("image",result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  let source;
  if (!image) {
    source = { uri: placeHolder };
  } else {
    source = image;
  }

  return (
    <>
      {!isLoading && (
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
                marginTop: 10,
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
              Sign Up to Funderr
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: "2%",
                marginLeft: "10%",
              }}
            >
              Name
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.email}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errors}>{errors.name.message}</Text>
            )}
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: "2%",
                marginLeft: "10%",
              }}
            >
              Email
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.email}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errors}>{errors.email.message}</Text>
            )}
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: "2%",
                marginLeft: "10%",
              }}
            >
              Password
            </Text>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.email}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errors}>{errors.password.message}</Text>
            )}
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: "2%",
                marginLeft: "10%",
              }}
            >
              Confirm Password
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.email}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  secureTextEntry
                />
              )}
              name="confirmpassword"
            />
            {errors.confirmpassword && (
              <Text style={styles.errors}>
                {errors.confirmpassword.message}
              </Text>
            )}
            <Image
              source={source}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: "10%",
                marginTop: "2%",
              }}
            />
            <TouchableOpacity style={styles.imagebutton} onPress={pickImage}>
              <Text style={{ color: colors.primary }}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupbuttoncontainer}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.signupbutton}>Sign Up</Text>
            </TouchableOpacity>
            {/* <Text
          style={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: 15,
            margin: "10%",
          }}
        >
          Or Sign Up with{" "}
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
          Or Sign Up with{" "}
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
      )}
      {isLoading && <Loader title="Signing Up..." />}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },

  backicon: {
    marginTop: 40,
    marginLeft: 10,
  },
  email: {
    marginLeft: "10%",
    borderWidth: 1,
    borderColor: colors.primary,
    height: 40,
    width: "75%",
    marginTop: "2%",
    borderRadius: 10,
    padding: 10,
  },
  signupbuttoncontainer: {
    backgroundColor: colors.primary,
    height: "7%",
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
  imagebutton: {
    width: 130,
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.primary,
  },
  errors: {
    fontSize: 10,
    color: "red",
    marginLeft: 45,
    marginTop: 5,
  },
});
