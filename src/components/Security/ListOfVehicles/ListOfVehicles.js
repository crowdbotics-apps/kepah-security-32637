import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
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
  TouchableOpacity,
  View,
  Image
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
const { height, width } = Dimensions.get("screen")

const Confirm = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([])
  const isFocused = useIsFocused()
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    if (isFocused) {
      getFromAsyncStorage()
      getVehicles()
    }
  }, [isFocused])

  const getFromAsyncStorage = async () => {
    try {
      let token = await AsyncStorage.getItem("token")
      let buildingno = await AsyncStorage.getItem("buildingno")
      if (token !== null && buildingno !== null) {
        getVehicles(buildingno, token)
      }
    } catch (error) {
      console.log("-", error)
    }
  }

  const getVehicles = (buildingno, token) => {
    let config = {
      method: "get",
      url: `https://kepah-24275.botics.co/api/v1/illegal-parking/?residence_building=${buildingno}`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }

    axios(config)
      .then(response => {
        let vehicles = response.data
        if (vehicles && vehicles.length > 0) {
          vehicles.reverse()
          setVehicles(vehicles)
          setFiltered(vehicles)
          console.log(response)
        }
      })
      .catch(error => {})
  }

  useEffect(() => {
    let filter = vehicles.filter(val => {
      if (search !== "" && val.vehicle_number.includes(search)) {
        return val
      }
    })
    if (filter.length < 1 && search === "") {
      setVehicles(vehicles)
    } else {
      setVehicles(filter)
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
            <Image
              source={require("../../../assets/bg-logo.png")}
              style={styles.logo_img}
            />
            <Text style={styles.my_vehicle}>List of Vehicles</Text>
          </View>
        </View>

        <View style={styles.my_vehicle_background}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#aeaeae",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
              height: 40
            }}
          >
            <TextInput
              keyboardType="web-search"
              placeholder="Secrch by Name/Tag Number"
              onChange={e => setSearch(e.target.value)}
            />
            <Image source={require("../../../assets/security-search.png")} />
          </View>
          {vehicles.map((val, ind) => {
            return (
              <View key={ind}>
                <View style={styles.vehicle_names_view}>
                  <View>
                    <View style={styles.vehicle_number_view}>
                      <Text style={styles.vehicle_serial_no}>{ind + 1}.</Text>
                      <Text style={styles.vehicle_number}>
                        {val.vehicle_number !== null ? val.vehicle_number : "_"}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("VehicleOwnerProfile", {
                        vehicle: val
                      })
                    }
                  >
                    <Text style={styles.view_more}>View more</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.bottom_border} />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  email: { fontSize: 18, marginTop: 5 },

  createPass: { fontSize: 12, color: "#131313" },
  cardNum: {
    fontSize: RFValue(12),
    color: "#131313"
  },
  amount: {
    fontSize: RFValue(12),
    color: "#131313",
    left: 10
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EAE7F1",
    width: "100%",
    alignItems: "center",
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5
  },
  input: {
    width: "100%",
    flex: 1,
    color: "#131313",
    fontSize: RFValue(12),
    left: 10
  },
  showPass: { width: 16, height: 10, marginRight: 10, left: 5 },
  password: { fontSize: 12, color: "#131313", marginTop: 10 },
  eyeDot: {
    borderWidth: 1,
    width: 1,
    height: 1,
    position: "absolute",
    left: 12,
    top: 4
  },
  dateView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EAE7F1",
    width: "25%",
    alignItems: "center",
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
    justifyContent: "center"
  },
  yearView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EAE7F1",
    width: "35%",
    alignItems: "center",
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5
  },
  accountView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EAE7F1",
    width: "100%",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5
  },
  more: {
    width: 10,
    height: 7,
    marginRight: 10,
    left: 5
  },
  accountTop: {
    marginTop: 10
  },
  bottomButton: { width: "100%", bottom: 40, padding: 20, height: 60 },
  btnView: {
    backgroundColor: "#2E1070",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center"
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: RFValue(14) },

  btnCancel: {
    backgroundColor: "#fff",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    width: "48%",
    borderColor: "#2e1070",
    borderWidth: 1,
    alignItems: "center"
  },
  btnCancelText: {
    color: "#2e1070",
    fontWeight: "bold",
    fontSize: RFValue(14)
  },
  keyboard_avoiding: {
    backgroundColor: "#fff"
  },
  scroll_view: { height: height - 120, backgroundColor: "#fff" },
  my_vehicle_text_view: { backgroundColor: "#e5e5e5", height: 200 },
  my_vehicle_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: 10
  },
  my_vehicle: {
    fontSize: RFValue(18),
    fontWeight: "600",
    marginTop: 40
  },
  vehicle_inportion: {
    fontSize: RFValue(15),
    marginTop: 5
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
  my_vehicle_height: { padding: 20, height: height / 2 + 120 },
  vehicle_names_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10
  },
  vehicle_number_view: { display: "flex", flexDirection: "row" },
  vehicle_serial_no: { fontSize: RFValue(12) },
  vehicle_number: { fontSize: RFValue(12), left: 5 },
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
  vehicles_number_delete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10
  },
  logo_img: { height: height / 15, width: width / 4 + 30, marginTop: -20 }
})

export default Confirm
