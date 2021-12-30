import React, { useState } from "react"
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"

const { width, height } = Dimensions.get("screen")

const ResidentPortal = ({ navigation }) => {
  const [requestType, setRequestType] = useState("")
  const [pressed, setPressed] = useState(false)

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

            <Text
              style={{
                fontSize: RFValue(18),
                marginTop: 20,
                fontWeight: "bold"
              }}
            >
              Jeep - 235DDC123
            </Text>
            <Text style={{ fontSize: RFValue(18), marginTop: 5 }}>
              Vehicle Action
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.visitor_portal_background}>
            <View style={styles.user_profile_photo}>
              <View style={styles.user_photo_view}>
                <Image
                  source={require("../../../assets/profile.jpeg")}
                  style={styles.profile_image}
                />
              </View>
            </View>
            <View style={styles.visitor_view}>
              <View style={styles.inputViewMain}>
                <View style={styles.user_info_view}>
                  <Text style={styles.john_doe_visitor}>Rodney Jones</Text>
                  <Text style={{ fontSize: RFValue(13) }}>Resident</Text>
                </View>

                <View style={{ padding: 15 }}>
                  <View>
                    <Text style={styles.createPass}>Vehicle Action:</Text>
                    <TouchableOpacity
                      style={styles.inputView}
                      onPress={() => setPressed(true)}
                    >
                      <Text>
                        {requestType !== ""
                          ? requestType
                          : setRequestType("Select type...")}
                      </Text>
                      <View>
                        <Image
                          style={styles.dropdownImg}
                          source={require("../../../assets/security-dropdown.png")}
                        />
                      </View>
                    </TouchableOpacity>

                    {pressed ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: 70,
                          position: "absolute",
                          width: "100%"
                        }}
                      >
                        <View
                          nestedScrollEnabled={true}
                          style={{
                            backgroundColor: "#E9F1FD",
                            position: "absolute",
                            zIndex: Platform.OS === "android" ? 10 : 0,
                            width: "100%",
                            padding: 10,
                            borderRadius: 5
                          }}
                        >
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                setPressed(false)
                                setRequestType("Booted")
                              }}
                              style={{ width: "100%" }}
                            >
                              <Text>Booted</Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: "#fff",
                                marginTop: 10
                              }}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                setPressed(false)
                                setRequestType("Towed/Tow Warning Issued")
                              }}
                              style={{ width: "100%" }}
                            >
                              <Text style={{ marginTop: 10 }}>
                                Towed/Tow Warning Issued
                              </Text>
                            </TouchableOpacity>

                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: "#fff",
                                marginTop: 10
                              }}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                setPressed(false)
                                setRequestType("Demaged")
                              }}
                              style={{ width: "100%" }}
                            >
                              <Text style={{ marginTop: 10 }}>Demaged</Text>
                            </TouchableOpacity>

                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: "#fff",
                                marginTop: 10
                              }}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                setPressed(false)
                                setRequestType("Flat Tire")
                              }}
                              style={{ width: "100%" }}
                            >
                              <Text style={{ marginTop: 10 }}>Flat Tire</Text>
                            </TouchableOpacity>

                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: "#fff",
                                marginTop: 10
                              }}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                setPressed(false)
                                setRequestType("Remove Your Car")
                              }}
                              style={{ width: "100%" }}
                            >
                              <Text style={{ marginTop: 10 }}>
                                Remove Your Car
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.informBtn}
                  onPress={() => navigation.navigate("ResidentPortal")}
                >
                  <View style={styles.btnView2}>
                    <Text style={styles.btnText2}>INFORM USER OF ACTION </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bottomButton}
                  onPress={() => navigation.navigate("ResidentPortal")}
                >
                  <View style={styles.btnView}>
                    <Text style={styles.btnText}>
                      PROCEED WITH VEHICLE ACTION{" "}
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
    backgroundColor: "#E9F1FD",
    width: "100%",
    alignItems: "center",
    padding: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between"
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
    height: height / 2
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
