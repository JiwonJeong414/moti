import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootContext } from "../config/RootContext";
import {
  NotoSans_400Regular,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

const SettingModal = ({ navigation }) => {
  const { onboarded, setOnboard, colorTheme, textTheme } =
    React.useContext(RootContext);
  const [settingVisible, setSettingVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const chooseColorPressed = () => {
    navigation.navigate("Choose Colors");
    setSettingVisible(false);
  };

  const deleteUsername = async () => {
    await AsyncStorage.removeItem("Name");
    setSettingVisible(false);
    setTimeout(() => {
      setOnboard(false);
    }, 700);
  };

  const chooseTextPress = () => {
    navigation.navigate("Text Color");
    setSettingVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSettingVisible(true)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: moderateScale(20),
          headerStyle: {
            height: 80,
          },
        }}
      >
        <Entypo
          name="dots-three-horizontal"
          size={moderateScale(45)}
          color={textTheme.text}
          style={{
            right: moderateScale(15),
            marginBottom: moderateScale(10),
            bottom: moderateScale(5),
          }}
        />
        <Modal
          isVisible={settingVisible}
          animationIn="bounceIn"
          animationOut="bounceOut"
          onBackdropPress={() => setSettingVisible(false)}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <View style={[styles.modalBackground, { flexDirection: "column" }]}>
            <View style={styles.modalHeader}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "NotoSans_400Regular",
                  fontSize: moderateScale(20),
                }}
              >
                Settings
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={deleteUsername}>
              <View style={[styles.item, { marginTop: moderateScale(35) }]}>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>Edit Name</Text>
                </View>
                <View style={styles.circular}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={chooseColorPressed}>
              <View style={[styles.item, { marginTop: moderateScale(15) }]}>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>Background Colors</Text>
                </View>
                <View style={styles.circular}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={chooseTextPress}>
              <View style={[styles.item, { marginTop: moderateScale(15) }]}>
                <View style={styles.itemLeft}>
                  <View style={styles.square}></View>
                  <Text style={styles.itemText}>Text Colors</Text>
                </View>
                <View style={styles.circular}></View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: moderateScale(140),
  },
  modalHeader: {
    position: "absolute",
    width: "100.4%",
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    top: moderateScale(0),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    backgroundColor: "black",
  },
  modalBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    width: moderateScale(260),
    height: moderateScale(280),
    backgroundColor: "#FFF",
  },
  item: {
    backgroundColor: "white",
    padding: moderateScale(14),
    borderColor: "black",
    borderWidth: moderateScale(3),
    width: moderateScale(210),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: moderateScale(22),
    height: moderateScale(22),
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: moderateScale(4),
    marginRight: moderateScale(13),
  },
  itemText: {
    maxWidth: "80%",
    fontFamily: "NotoSans_400Regular",
  },
  circular: {
    width: moderateScale(11),
    height: moderateScale(11),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
  },
});

export default SettingModal;
