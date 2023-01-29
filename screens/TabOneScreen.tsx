import React from 'react';
import { StyleSheet, TouchableOpacity , TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const navigate = useNavigation()
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      walletAddress: "",
      amount: "",
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
    await Donate(data)
  };
  
  const onChange = (arg: { nativeEvent: { text: any; }; }) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const Donate = React.useCallback(async (data) => {
    try {
      await connector.sendTransaction({
       data: '0x5', //goerli chain
       from: `${connector.accounts}`,
       to:    `${data.walletAddress}`,
       value: `${data.amount * 1000000000000000000}`, // enter value
     });
   } catch (e) {
     console.error(e);
   }
   navigation.navigate("CardDetails")
  }, [connector]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate </Text>
      <View  lightColor="#eee" darkColor="#eee" />
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
          color: "#242F9B",
          fontSize: 18,
          marginTop: 10
          
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
      <Text
        style={{
          color: "#242F9B",
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
          keyboardType={'numeric'}
          />
        )}
        name="amount"
        rules={{ required: true }}
      />
    </View>
    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.buttonStyle}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {    
    borderWidth: 1,
    borderColor: "#242F9B",
    height: 40,
width:200,
    marginTop: "2%",
    borderRadius: 10,
    color:"white"
  },
});
