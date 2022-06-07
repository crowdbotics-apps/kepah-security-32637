import React, { useState, useEffect } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  AsyncStorage,
  TextInput
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
import axios from "axios"

const { width, height } = Dimensions.get("screen")

const ResidentPortal = ({ navigation, route }) => {
  const [vehicleInformation] = useState(route.params.vehicle)
  const [inform, setInform] = useState(false)
  const [details, setDetails] = useState("")
  const [token, setToken] = useState("")
  const [buildingNo, setBuildingNo] = useState("")

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      let buildingno = await AsyncStorage.getItem("buildingno")
      if (value !== null && buildingno !== null) {
        setToken(value)
        setBuildingNo(buildingno)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  const openContact = () => {
    if (vehicleInformation.reporter_details.phone_number) {
      Linking.openURL(`tel:${vehicleInformation.reporter_details.phone_number}`)
    } else {
      Alert.alert("Phone number not found.")
    }
  }

  const createViolation = () => {
    var data = JSON.stringify({
      violation_type: 1,
      violation_sub_type: 1,
      details: details,
      assignee: vehicleInformation.reporter_details.id,
      residence_building: buildingNo,
      due_date: new Date()
    })

    var config = {
      method: "post",
      url: "https://kepah-24275.botics.co/api/v1/violation/",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      data: data
    }

    axios(config)
      .then(function (response) {
        Alert.alert(`Sent to informer successfully`)
        setInform(false)
      })
      .catch(function (error) {
        Alert.alert(`Sending unsuccessfull, Try again`)
        console.log(error)
        setInform(false)
      })
  }

  return (
    <View>
      <View style={{ backgroundColor: "#e5e5e5" }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.screen_name}>
          <View style={styles.portal_view}>
            <Image
              source={require("../../../assets/bg-logo.png")}
              style={styles.logo_img}
            />

            <Text style={{ fontSize: RFValue(18), marginTop: 30 }}>
              {vehicleInformation.vehicle_number}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.visitor_portal_background}>
            <View style={styles.user_profile_photo}>
              <View style={styles.user_photo_view}>
                <Image
                  source={
                    vehicleInformation.reporter_details.profile_picture
                      ? {
                          uri: vehicleInformation.reporter_details
                            .profile_picture
                        }
                      : require("../../../assets/profile.jpeg")
                  }
                  style={styles.profile_image}
                />
              </View>
            </View>
            <View style={styles.visitor_view}>
              <View style={styles.inputViewMain}>
                <View style={styles.user_info_view}>
                  <Text style={styles.john_doe_visitor}>
                    {vehicleInformation.reporter_details.name}
                  </Text>
                  <Text style={{ fontSize: RFValue(13) }}>
                    {vehicleInformation.reporter_details.user_type}
                  </Text>
                  <TouchableOpacity onPress={() => openContact()}>
                    <Text
                      style={{
                        fontSize: RFValue(12),
                        color: "#1a73e8",
                        textDecorationLine: "underline"
                      }}
                    >
                      Contact
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                {!inform ? (
                  <TouchableOpacity
                    style={styles.informBtn}
                    onPress={() => {
                      setInform(true)
                      // Alert.alert("Message sent to reporter ")
                      // navigation.navigate("Dashboard")
                    }}
                  >
                    <View style={styles.btnView2}>
                      <Text style={styles.btnText2}>INFORM USER OF ACTION</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <TextInput
                      //   keyboardType="text"
                      placeholder="Enter details"
                      onChangeText={text => setDetails(text)}
                      multiline={true}
                      style={{
                        backgroundColor: "#e5e5e5",
                        height: 50,
                        width: "90%",
                        borderRadius: 5,
                        padding: 10
                      }}
                    />

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.informBtn, { width: "50%" }]}
                        onPress={() => setInform(false)}
                      >
                        <View style={styles.btnView2}>
                          <Text style={styles.btnText2}>CANCEL</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.informBtn, { width: "50%" }]}
                        onPress={createViolation}
                      >
                        <View style={styles.btnView}>
                          <Text style={styles.btnText}>SUBMIT</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() =>
                    navigation.navigate("VehicleAction", {
                      vehicle_id: vehicleInformation.id
                    })
                  }
                >
                  <View style={styles.btnView}>
                    <Text style={styles.btnText}>
                      PROCEED WITH VEHICLE ACTION
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef"
  },
  screen_name: { backgroundColor: "#e5e5e5", height: height / 3 },

  inputViewMain: { top: 10 },
  createPass: { fontSize: RFValue(12), color: "#131313" },
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
    width: "80%",
    flex: 1,
    color: "#131313"
  },
  bottomButton: { paddingLeft: 15, paddingRight: 15, paddingBottom: 10 },
  informBtn: { paddingLeft: 15, paddingRight: 15, paddingBottom: 10 },
  btnView: {
    backgroundColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  btnView2: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },

  btnText2: { color: "#1a73e8", fontWeight: "bold" },
  scroll_view: { height: height - 60 },
  visitor_portal_view: { backgroundColor: "#e5e5e5", height: height / 4 },
  portal_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70%"
  },
  visitors_portal: {
    fontSize: RFValue(18),
    fontWeight: "bold"
  },
  visitor_portal_background: {
    backgroundColor: "#fff",
    height: height / 2 + 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 20
  },
  user_profile_photo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -25,
    alignItems: "center"
  },
  user_photo_view: {
    height: 150,
    width: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50
  },
  profile_image: {
    height: 140,
    width: 140,
    bottom: 0,
    position: "absolute",
    borderRadius: 70
  },
  visitor_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: height / 2 - 70
  },
  user_info_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  john_doe_visitor: {
    fontSize: RFValue(20),
    fontWeight: "bold"
  },
  logo_img: { height: height / 12, width: width / 4 + 30 }
})

export default ResidentPortal
