import React, { useState, useEffect } from "react"
import { TextInput } from "react-native"
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AsyncStorage
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
const { height } = Dimensions.get("screen")

const Confirm = ({ navigation }) => {
  const [search, setSearch] = useState("")
  const [rentRoll, setRentRoll] = useState([])
  const [filtered, setFiltered] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getToken()
    }
  }, [isFocused])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      let buildingno = await AsyncStorage.getItem("buildingno")
      if (value !== null) {
        getRentRoll(value, buildingno)
      }
    } catch (error) {}
  }

  const getRentRoll = (token, buildingNo) => {
    let config = {
      method: "get",
      url: `https://kepah-24275.botics.co/api/v1/resident?residence_building=${buildingNo}`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }

    axios(config)
      .then(response => {
        let rentRoll = response.data
        if (rentRoll && rentRoll.length > 0) {
          rentRoll.reverse()
          setRentRoll(rentRoll)
          setFiltered(rentRoll)
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    let filter = rentRoll.filter(val => {
      if (
        (search !== "" &&
          val.apartment_number &&
          `${val.apartment_number}`
            .toLowerCase()
            .includes(search.toLowerCase())) ||
        (search !== "" &&
          val.name &&
          val.name.toLowerCase().includes(search.toLowerCase()))
      ) {
        return val
      }
    })
    if (filter.length < 1 && search === "") {
      setFiltered(rentRoll)
    } else {
      setFiltered(filter)
    }
  }, [search])

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
            <Text style={styles.my_vehicle}>Rent Roll</Text>
          </View>
        </View>

        <View style={styles.my_vehicle_background}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 0,
              paddingRight: 0,
              alignItems: "center"
            }}
          >
            <TextInput
              keyboardType="default"
              placeholder="Full Name"
              style={{
                borderWidth: 1,
                borderColor: "#aeaeae",
                height: 40,
                width: 130,
                borderRadius: 5,
                fontSize: RFValue(12)
              }}
              onChangeText={setSearch}
            />
            <TextInput
              keyboardType="default"
              placeholder="Apt. Number"
              style={{
                borderWidth: 1,
                borderColor: "#aeaeae",
                height: 40,
                width: 130,
                borderRadius: 5,
                fontSize: RFValue(12)
              }}
              onChangeText={setSearch}
            />
            <View
              style={{
                backgroundColor: "#1a73e8",
                padding: 10,
                borderRadius: 5
              }}
            >
              <Image
                source={require("../../../assets/security-white-search.png")}
              />
            </View>
          </View>

          <View style={styles.vehicle_names_view}>
            <View>
              <View style={styles.vehicle_number_view}>
                <Text style={{ fontSize: RFValue(12), left: 5 }}>Name</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("VehicleOwnerProfile")}
            >
              <Text style={{ fontSize: RFValue(12) }}>Apt Number</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom_border} />

          {filtered.map((val, ind) => {
            return (
              <View key={ind}>
                <View style={styles.vehicle_names_view}>
                  <View>
                    <View style={styles.vehicle_number_view}>
                      <Text style={styles.vehicle_number}>
                        {val.name !== null ? val.name : "-"}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("VehicleOwnerProfile")}
                  >
                    <Text style={styles.view_more}>
                      {val.apartment_number !== null
                        ? val.apartment_number
                        : "-"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottom_border} />
              </View>
            )
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <View style={styles.btnView}>
          <Text style={styles.btnText}>SUBMIT </Text>
        </View>
      </TouchableOpacity>
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
  vehicle_names_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10
  },
  vehicle_number: {
    fontSize: RFValue(12),
    left: 5,
    color: "#1a73e8",
    textDecorationLine: "underline"
  },
  view_more: {
    color: "#1A73E8",
    textDecorationLine: "underline",
    fontSize: RFValue(12)
  },
  bottom_border: {
    borderWidth: 1,
    borderColor: "#eaeaea",
    marginTop: 10
  },

  bottomButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20
  },
  btnView: {
    backgroundColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold" }
})

export default Confirm
