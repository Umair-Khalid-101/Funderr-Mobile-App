import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Text, View } from "../components/Themed";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { colors } from "../components/constants";
import UserContext from "../components/context/userContext";

const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

export default function TabOneScreen({ route, navigation }) {
  const navigate = useNavigation();
  const { campaign } = route.params;
  const [checkboxState, setCheckboxState] = React.useState(false);
  const { addDonation } = useContext(UserContext);

  // console.log("Campaign:(DonateForm)", campaign);

  const donationValidationSchema = yup.object().shape({
    walletAddress: yup
      .string()
      .required("Wallet Address is mandatory")
      .matches(/^0x[a-fA-F0-9]{40}$/g, "Please Provide a Valid Wallet Address"),
    amount: yup
      .string()
      .required("Amount is mandatory")
      .matches(
        /^(?!0+(?:\.0+)?$)\d+(?:\.\d+)?$/,
        "Please provide a Valid Amount"
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      walletAddress: campaign.walletAddress,
      amount: "0.001",
    },
    mode: "onChange",
    resolver: yupResolver(donationValidationSchema),
  });
  const onSubmit = async (data) => {
    if (checkboxState) {
      console.log(data);
      await Donate(data);
    } else {
      Alert.alert(
        "Terms&Conditions!",
        "Please Read and agree to the terms and conditions to proceed with the Donation!"
      );
    }
  };

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const Donate = React.useCallback(
    async (data) => {
      try {
        await connector.sendTransaction({
          data: "0x5", //goerli chain
          from: `${connector.accounts}`,
          to: `${data.walletAddress}`,
          value: `${data.amount * 1000000000000000000}`, // enter value
        });
        const donation = {
          from: `${connector.accounts}`,
          to: campaign.walletAddress,
          amount: `${data.amount * 1000000000000000000}`,
          campaignId: campaign._id,
        };
        // console.log("Donation:", donation);
        await addDonation(donation);
        navigation.navigate("LandingPage");
      } catch (e) {
        console.error(e);
      }
    },
    [connector]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate </Text>
      <View lightColor="#eee" darkColor="#eee" />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: 10,
              }}
            >
              Wallet Address
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.amount}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="walletAddress"
              rules={{ required: true }}
            />
            {errors.walletAddress && (
              <Text style={styles.error}>{errors.walletAddress.message}</Text>
            )}
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                marginTop: 5,
              }}
            >
              Amount
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.amount}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType={"numeric"}
                />
              )}
              name="amount"
              rules={{ required: true }}
            />
            {errors.amount && (
              <Text style={styles.error}>{errors.amount.message}</Text>
            )}
            <BouncyCheckbox
              size={30}
              fillColor={colors.primary}
              innerIconStyle={{ borderColor: colors.primary }}
              style={{ marginTop: 16 }}
              isChecked={checkboxState}
              text="Terms and Conditions"
              disableBuiltInState
              onPress={() => setCheckboxState(!checkboxState)}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                width: 300,
                marginTop: 10,
                color: colors.primary,
              }}
              numberOfLines={5}
            >
              Terms & Conditions state that the user agrees to donate the
              desired amount to the other person which cannot be returned back.
              It is the basic policy of website. Also, the amount shared on
              wrong address cannot be returned. Kindly make sure the given
              detail is correct.
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: colors.primary,
              borderWidth: 0,
              color: "#FFFFFF",
              borderColor: colors.primary,
              height: 40,
              width: 200,
              alignItems: "center",
              borderRadius: 30,
              marginLeft: 35,
              marginRight: 35,
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <Text style={styles.buttonTextStyle}>Donate</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: colors.primary,
    height: 40,
    width: 200,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    borderWidth: 1,
    borderColor: colors.primary,
    height: 40,
    width: 300,
    marginTop: "2%",
    borderRadius: 10,
    color: "black",
    padding: 10,
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    color: "red",
  },
});
