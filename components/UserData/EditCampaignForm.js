import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import MyDatePicker from "../DatePicker";
import CategoryPicker from "../category/CategoryPicker";
import UserContext from "../context/userContext";
import Loader from "../Loader";
import { colors } from "../constants";

export default function EditCampaignForm({ route }) {
  const { userdata, editCampaign } = useContext(UserContext);
  const { campaign } = route.params;
  console.log("EditCampaign:", campaign);
  let startdate = new Date().toISOString().slice(0, 10);

  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState("Art");
  const [isLoading, setIsLoading] = useState(false);

  const placeHolder =
    "http://res.cloudinary.com/dfmhxmauj/image/upload/v1670337910/axqfk5lkxf09qsbhpspr.jpg";

  const campaignValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is Required")
      .min(3, "Title must be 3 characters"),
    walletAddress: yup
      .string()
      .required("Wallet Address is mandatory")
      .matches(/^0x[a-fA-F0-9]{40}$/g, "Please Provide a Valid Wallet Address"),
    campaignGoal: yup
      .number()
      .min(1)
      .typeError("Campaign Goal is mandatory. It must be a number")
      .required("Campaign Goal is mandatory"),
    description: yup.string().required("Description is mandatory"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: campaign,
    mode: "onChange",
    resolver: yupResolver(campaignValidationSchema),
  });
  const onSubmit = async (data) => {
    const fData = new FormData();
    data.enddate = selectedDate;
    data.category = category;
    data.posterName = userdata.name;
    data.posterPic = userdata.picture;
    data.postedBy = userdata._id;
    data.startdate = startdate;
    data.permission = "pending";
    fData.append("title", data.title);
    fData.append("description", data.description);
    fData.append("startdate", data.startdate);
    fData.append("enddate", data.enddate);
    fData.append("campaignGoal", data.campaignGoal);
    fData.append("category", data.category);
    fData.append("permission", data.permission);
    fData.append("posterName", data.posterName);
    fData.append("posterPic", data.posterPic);
    fData.append("postedBy", data.postedBy);
    fData.append("walletAddress", data.walletAddress);

    const remaining = daysLeft(selectedDate);

    if (remaining < 1) {
      Alert.alert("Invalid End Date", "Please select a valid date");
    } else if (!image) {
      data.picture = placeHolder;
      fData.append("picture", data.picture);
      setIsLoading(true);
      await editCampaign(fData, campaign._id);
      setIsLoading(false);
      navigation.navigate("Drawer");
    } else if (image) {
      const ext = image?.uri.split(".").pop();
      const filename = `${data.name}.${ext}`;
      fData.append("file", {
        uri: image.uri, // the file URI
        name: filename, // the file name
        type: `image/${ext}`, // the file type
      });
      setIsLoading(true);
      await editCampaign(fData, campaign._id);
      setIsLoading(false);
      navigation.navigate("Drawer");
    }
  };

  const daysLeft = (date) => {
    const now = new Date();
    const futureDate = new Date(date);
    const timeDiff = futureDate.getTime() - now.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  let source;
  if (!image) {
    source = { uri: campaign.picture };
  } else {
    source = image;
  }

  return (
    <>
      {!isLoading && (
        <>
          <ScrollView style={styles.container}>
            <View>
              <AntDesign
                style={styles.backicon}
                name="arrowleft"
                size={30}
                color={colors.primary}
                onPress={() => navigation.navigate("MyCampaigns")}
              />
              <Image
                style={{
                  width: 300,
                  height: 250,

                  top: 7,
                  alignSelf: "center",
                }}
                source={require("../../assets/landingpage.png")}
              />
            </View>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: "2%",
                marginLeft: "10%",
              }}
            >
              Title
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    marginLeft: "10%",
                    borderWidth: 1,
                    borderColor: colors.primary,
                    height: 40,
                    width: "75%",
                    marginTop: "2%",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="title"
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
            <MyDatePicker setDate={setSelectedDate} />
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginLeft: "10%",
              }}
            >
              Wallet Address
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    marginLeft: "10%",
                    borderWidth: 1,
                    borderColor: colors.primary,
                    height: 40,
                    width: "75%",
                    marginTop: "2%",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="walletAddress"
            />
            {errors.walletAddress && (
              <Text style={styles.error}>{errors.walletAddress.message}</Text>
            )}
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginLeft: "10%",
              }}
            >
              Campaign Goal
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    marginLeft: "10%",
                    borderWidth: 1,
                    borderColor: colors.primary,
                    height: 40,
                    width: "75%",
                    marginTop: "2%",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType={"numeric"}
                />
              )}
              name="campaignGoal"
            />
            {errors.campaignGoal && (
              <Text style={styles.error}>{errors.campaignGoal.message}</Text>
            )}
            <CategoryPicker setCategory={setCategory} />
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginLeft: "10%",
              }}
            >
              Description
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    marginLeft: "10%",
                    borderWidth: 1,
                    borderColor: colors.primary,
                    height: 140,
                    width: "75%",
                    marginTop: "2%",
                    borderRadius: 10,
                    padding: 10,
                    textAlignVertical: "top",
                  }}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="description"
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description.message}</Text>
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
              style={{
                backgroundColor: colors.primary,
                height: 50,
                borderRadius: 50,
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "13%",
                marginTop: "5%",
                marginBottom: 30,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                {isLoading ? "Please Wait...." : "Edit Campaign"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
      {isLoading && <Loader title="Updating Campaign..." />}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backicon: {
    marginTop: 40,
    marginLeft: 15,
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "13%",
    color: "red",
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
});
