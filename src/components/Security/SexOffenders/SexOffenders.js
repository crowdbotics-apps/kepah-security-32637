import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
// import {Image} from 'native-base';
import React, { useEffect, useState } from "react"
import { TextInput } from "react-native"
import {
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
const { height } = Dimensions.get("screen")

const Confirm = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.keyboard_avoiding}
    >
      <View style={{ backgroundColor: "#e5e5e5" }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.my_vehicle_text_view}>
          <View style={styles.my_vehicle_view}>
            <Text style={styles.my_vehicle}>Sex Offenders</Text>
          </View>
        </View>

        <View style={styles.my_vehicle_background}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scroll_view: { height: height - 120, backgroundColor: "#fff" },
  my_vehicle_text_view: { backgroundColor: "#e5e5e5", height: 100 },
  my_vehicle_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  my_vehicle: {
    fontSize: RFValue(18),
    fontWeight: "600",
    marginTop: 40
  },
  my_vehicle_background: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 55
  },
  
})

export default Confirm
