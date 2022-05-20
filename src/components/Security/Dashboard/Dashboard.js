import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  AsyncStorage,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { RFValue } from "react-native-responsive-fontsize"
import pathUrl from "../../../config/path"
import Header from "../Header/Header"

const { width, height } = Dimensions.get("screen")

const ResidentPortal = ({ navigation }) => {
  const [username, setUsername] = useState("")

  const [token, setToken] = useState("")

  const [isModalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vehicle_number, setVehicleNumber] = useState("")
  const [photo, setPhoto] = useState("")
  const [image, setImage] = useState("")
  const [residence_building, setResidentBuildingNo] = useState("")
  const [profile_picture, setProfilePic] = useState(null)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getToken()
    }
  }, [isFocused])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      if (value !== null) {
        setToken(value)
        getUserDetails(value)
      }
    } catch (error) {}
  }

  const getUserDetails = token => {
    axios
      .get(`${pathUrl}/rest-auth/user/`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      .then(response => {
        let d = response.data
        setUsername(d.name)
        setResidentBuildingNo(d.residence_building)
        setProfilePic(d.profile_picture)
      })
      .catch(error => {})
  }

  const uploadPhoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo"
      },
      response => {
        setPhoto(response.uri)
        setImage({
          name: response.fileName,
          uri:
            Platform.OS === "android"
              ? response.uri
              : response.uri.replace("file://", ""),
          type: response.type
        })
      }
    )
  }

  const addParkingViolation = () => {
    setLoading(true)
    let data = new FormData()
    data.append("vehicle_number", vehicle_number)
    data.append("image", image)

    let config = {
      method: "post",
      url: "https://kepah-24275.botics.co/api/v1/illegal-parking/",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
        // ...data.getHeaders(),
      },
      data: data
    }
    axios(config)
      .then(s => {
        setModalVisible(false)
        setLoading(false)
        setPhoto("")
      })
      .catch(error => {
        setLoading(false)
        setPhoto("")
      })
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.screen_name}>
          <View style={styles.portal_view}>
            <Image
              source={require("../../../assets/bg-logo.png")}
              style={styles.logo_img}
            />

            <Text style={styles.resident_portal}>Dashboard</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.page_content}>
            <View style={styles.user_profile_img}>
              {!profile_picture ? (
                <Image
                  source={require("../../../assets/profile.jpeg")}
                  style={styles.profile_img}
                />
              ) : (
                <Image
                  source={{ uri: profile_picture }}
                  style={styles.profile_img}
                />
              )}
            </View>

            <View style={styles.user_content}>
              <View style={styles.user_name_view}>
                <Text style={styles.user_name}>{username}</Text>
              </View>
            </View>

            <View style={styles.all_btns_view}>
              <View style={{ width: "50%", padding: 5 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ListOfVehicles")}
                >
                  <View style={styles.maintenance_btn}>
                    <Text style={styles.btns_screens}>VEHICLE</Text>
                    <Text style={styles.btns_screens}>LOOKUP/ACTIONS</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SexOffenders")}
                >
                  <View style={styles.btns}>
                    <Text style={styles.btns_screens}>SEX OFFENDERS</Text>
                    <Text style={styles.btns_screens}>LIST</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("RentRoll")}
                  style={styles.report_illegally}
                >
                  <Text style={styles.all_btns_texts}>RENT ROLL</Text>
                  <Text style={styles.all_btns_texts}>LIST</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("ClosedIncidentReports")}
                  style={styles.report_illegally}
                >
                  <Text style={styles.all_btns_texts}>CASELOAAD</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: "50%", padding: 5 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SecurityIncidentReport")}
                  style={styles.violation_btn}
                >
                  <Text style={styles.all_btns_texts}>INCIDENT</Text>
                  <Text style={styles.all_btns_texts}>REPORTS</Text>
                  <View style={styles.quantity_violation}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>2</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SecurityCriminalTrespassList")
                  }
                  style={styles.add_vehicle}
                >
                  <Text style={styles.all_btns_texts}>CRIMINAL</Text>
                  <Text style={styles.all_btns_texts}>TRESPASS LIST</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PoliceContactInformation")
                  }
                >
                  <View style={styles.btns}>
                    <Text style={styles.btns_screens}>POLICE</Text>
                    <Text style={styles.btns_screens}>LIAISON</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Security")}
                >
                  <View style={styles.btns}>
                    <Text style={styles.btns_screens}>PROFILE</Text>
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
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  header: { backgroundColor: "#e5e5e5" },
  screen_name: { backgroundColor: "#e5e5e5", height: height / 3 },
  portal_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70%"
  },
  logo_img: { height: height / 13, width: width / 4 + 20 },
  resident_portal: {
    fontSize: RFValue(27),
    fontWeight: "bold",
    color: "#1A73E8",
    marginTop: 20
  },
  page_content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0
  },
  user_profile_img: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -35
  },
  profile_img: {
    borderRadius: 100,
    height: 130,
    width: 130,
    marginTop: -50,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center"
  },
  user_content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  user_name_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  user_name: { fontSize: RFValue(20), fontWeight: "bold" },
  edit_profile: {
    fontSize: RFValue(12),
    textDecorationLine: "underline",
    color: "#2E1070"
  },
  all_btns_view: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10
  },
  maintenance_btn: {
    backgroundColor: "#1A73E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    height: height / 13 + 10
  },
  btns_screens: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(12)
  },
  btns: {
    backgroundColor: "#1A73E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    height: height / 13 + 10,
    marginTop: 10
  },
  report_illegally: {
    backgroundColor: "#1A73E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    height: height / 13 + 10,
    marginTop: 10
  },
  all_btns_texts: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(12)
  },
  violation_btn: {
    backgroundColor: "#1A73E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    height: height / 13 + 10
  },
  quantity_violation: {
    position: "absolute",
    top: -12,
    right: -10,
    backgroundColor: "#ff0000",
    borderRadius: 20,
    height: 28,
    width: 28,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff"
  },
  add_vehicle: {
    backgroundColor: "#1A73E8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    height: height / 13 + 10,
    marginTop: 10
  }
})

export default ResidentPortal
