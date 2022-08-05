import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-neat-date-picker";
import Events from "./Events";
import { Button, IconButton, TextInput } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import SettingOpenCircle from "./SettingOpenCircle";

const CustomDatePicker = ({ widgetTitle }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [title, setTitle] = useState();
  const [date, setDate] = useState(null);
  const [modal, showModal] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const retrieveToDoItems = async () => {
      let retrieveData = await AsyncStorage.getItem("Events");
      retrieveData = JSON.parse(retrieveData);
      if (retrieveData == null) setEvents([]);
      else setEvents(retrieveData);
    };
    retrieveToDoItems();
  }, []);

  const deleteEventItem = async (index) => {
    let itemsCopy = [...events];
    itemsCopy.splice(index, 1);
    await AsyncStorage.setItem("Events", JSON.stringify(itemsCopy));
    setEvents(itemsCopy);
  };

  const handleModal = () => {
    showModal(true);
    setTitle(null);
    setDate(null);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const handleAdd = async () => {
    if (date === null) {
      Alert.alert("You need to select a date");
    } else {
      showModal(false);
      let newData = [...events, { date: date, title: title }];
      await AsyncStorage.setItem("Events", JSON.stringify(newData));
      setEvents(newData);
      setTitle(null);
      setDate(null);
    }
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}> {widgetTitle}</Text>
        <IconButton
          icon="calendar-plus"
          onPress={handleModal}
          style={{
            right: moderateScale(15),
            marginBottom: moderateScale(-8),
            bottom: moderateScale(8),
          }}
        />
      </View>
      <Modal
        isVisible={modal}
        animationIn="bounceIn"
        animationOut="bounceOut"
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={() => showModal(false)}
        style={styles.modalBackground}
      >
        <View style={styles.modalHeader}>
          <TextInput
            label="Event Title"
            value={title}
            mode="outlined"
            onChangeText={(text) => setTitle(text)}
            style={{
              width: moderateScale(190),
              marginBottom: moderateScale(20),
            }}
          />
          {date === null ? (
            <Button
              mode="contained"
              icon="calendar-month"
              onPress={openDatePicker}
            >
              Select Date
            </Button>
          ) : (
            <Button
              mode="contained"
              icon="calendar-month"
              onPress={openDatePicker}
            >
              {date}
            </Button>
          )}
          <DatePicker
            isVisible={showDatePicker}
            mode={"single"}
            onCancel={onCancel}
            onConfirm={onConfirm}
            initialDate={new Date()}
          />
          <Button
            mode="contained"
            onPress={handleAdd}
            style={{
              position: "absolute",
              left: moderateScale(195),
              top: moderateScale(190),
            }}
          >
            Add
          </Button>
        </View>
      </Modal>
      {events != null ? (
        events.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index}>
              <Events
                date={item.date}
                title={item.title}
                deleteItem={deleteEventItem}
                index={index}
              />
            </TouchableWithoutFeedback>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 10,
  },
  title: {
    width: 200,
    height: 40,
    backgroundColor: "tomato",
    borderColor: "black",
    borderWidth: 4,
    marginBottom: 10,
  },
  date: {
    width: 200,
    height: 40,
    backgroundColor: "tomato",
    borderColor: "black",
    borderWidth: 4,
  },
  row: {
    flexDirection: "row",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    width: 140,
    height: 55,
    top: 190,
    left: 150,
    borderRadius: 20,
    backgroundColor: "#553AF6",
    position: "absolute",
  },
  modalHeader: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "80%",
    height: "30%",
    backgroundColor: "#FFF",
  },
});

export default CustomDatePicker;
