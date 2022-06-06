import React, { useState, useEffect } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  TextInput,
  Alert
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
import axios from "axios"

const { width, height } = Dimensions.get("screen")

const ResidentPortal = ({ navigation, route }) => {
  const [rent_roll] = useState(route.params.rent_roll)
  const [violationTypes, setViolationtypes] = useState([])
  const [details, setDetails] = useState("")
  const [token, setToken] = useState("")
  const [buildingNo, setBuildingNo] = useState("")

  const [selectedViolation, selectViolation] = useState(null)

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      let buildingno = await AsyncStorage.getItem("buildingno")
      if (value !== null && buildingno !== null) {
        getViolationTypes(value)
        setToken(value)
        setBuildingNo(buildingno)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getViolationTypes = token => {
    var config = {
      method: "get",
      url: "https://kepah-24275.botics.co/api/v1/violation-type/",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }

    axios(config)
      .then(function (response) {
        setViolationtypes(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const createViolation = () => {
    var data = JSON.stringify({
      violation_type: selectedViolation.id,
      violation_sub_type: 1,
      details: details,
      assignee: rent_roll.id,
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
        console.log(JSON.stringify(response.data))
        Alert.alert(`${selectedViolation.name} sent`)
        selectViolation(null)
      })
      .catch(function (error) {
        Alert.alert(`${selectedViolation.name} not sent`)
        console.log(error)
      })
  }

  const martkCriminalTrespass = () => {
    var data = JSON.stringify({
      user_id: rent_roll.id,
      residence_building: Number(buildingNo),
      criminal_status: true
    })

    var config = {
      method: "post",
      url: `https://kepah-24275.botics.co/api/v1/criminal-status/?residence_building=${buildingNo}`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      data: data
    }

    axios(config)
      .then(function () {
        Alert.alert("Successfully marked")
      })
      .catch(function (error) {
        Alert.alert("Unsuccessfull please try again")
      })
  }

  useEffect(() => {
    getToken()
  }, [])
  return (
    <View>
      <View style={{ backgroundColor: "#e5e5e5" }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.screen_name}>
          <View style={styles.portal_view}>
            <Text style={{ fontSize: RFValue(18), marginTop: 30 }}>
              Personal Info
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.visitor_portal_background}>
            <View style={styles.visitor_view}>
              <View style={styles.inputViewMain}>
                <View style={styles.user_profile_photo}>
                  <View style={styles.user_photo_view}>
                    <Image
                      source={
                        rent_roll.profile_picture
                          ? {
                              uri: rent_roll.profile_picture
                            }
                          : require("../../../assets/profile.jpeg")
                      }
                      style={styles.profile_image}
                    />
                  </View>
                </View>
                <View style={styles.user_info_view}>
                  <Text style={styles.john_doe_visitor}>{rent_roll.name}</Text>
                  <Text style={{ fontSize: RFValue(13) }}>
                    {rent_roll.user_type}
                  </Text>

                  <Text style={{ fontSize: RFValue(13) }}>
                    {rent_roll.email}
                  </Text>

                  <Text style={{ fontSize: RFValue(13) }}>
                    {rent_roll.phone_number ? rent_roll.phone_number : ""}
                  </Text>
                </View>
              </View>

              <View>
                {!selectedViolation ? (
                  <View>
                    {violationTypes.length > 0
                      ? violationTypes.map((val, ind) =>
                          ind === 0 ? (
                            <TouchableOpacity
                              key={ind}
                              style={styles.informBtn}
                              onPress={() => selectViolation(val)}
                            >
                              <View style={styles.btnView3}>
                                <Text style={styles.btnText}>{val.name}</Text>
                              </View>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              key={ind}
                              style={styles.informBtn}
                              onPress={() => selectViolation(val)}
                            >
                              <View style={styles.btnView2}>
                                <Text style={styles.btnText2}>{val.name}</Text>
                              </View>
                            </TouchableOpacity>
                          )
                        )
                      : null}
                  </View>
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
                        onPress={() => selectViolation(null)}
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
                  onPress={martkCriminalTrespass}
                >
                  <View style={styles.btnView4}>
                    <Text style={styles.btnText2}>
                      Mark as criminal trespass
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.bottomButton}>
              <View style={styles.btnView}>
                <Text style={styles.btnText}>Go Back</Text>
              </View>
            </TouchableOpacity>
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
  screen_name: { backgroundColor: "#e5e5e5", height: 75 },

  inputViewMain: {
    top: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center"
  },
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
  btnView3: {
    backgroundColor: "#FB8787",
    // borderWidth: 1,
    // borderColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnView4: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
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
    zIndex: 0
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.7,
    // shadowRadius: 3.84,
    // elevation: 20
  },
  user_profile_photo: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignSelf: "center",
    // // marginTop: -25,
    // alignItems: "center"
  },
  user_photo_view: {
    height: 120,
    width: 120,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // marginTop: -50
  },
  profile_image: {
    height: 120,
    width: 120,
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
    justifyContent: "space-between",
    height: 120,
    marginTop: 20

    // alignItems: "center"
  },
  john_doe_visitor: {
    fontSize: RFValue(20),
    fontWeight: "bold"
  },
  logo_img: { height: height / 12, width: width / 4 + 30 }
})

export default ResidentPortal
