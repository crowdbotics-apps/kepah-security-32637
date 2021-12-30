import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  AsyncStorage,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
const { height } = Dimensions.get("screen")

const SecurityReport = ({ navigation }) => {
  const [incidentId, setIncidentId] = useState(null)
  const [all, setAll] = useState(true)
  const [manage, setManage] = useState(false)
  const [police, setPolice] = useState(false)
  const [previousIncidentList, setPreviousIncidentList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ])
  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      if (value !== null) {
        getSecurityList(value)
      }
    } catch (error) {}
  }

  const getSecurityList = token => {
    console.log("==---===")
    var config = {
      method: "get",
      url: "https://kepah-24275.botics.co/api/v1/security-report/",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }

    axios(config)
      .then(response => {
        console.log(response.data)
        setPreviousIncidentList(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ backgroundColor: "#e5e5e5" }}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.scroll_view}>
        <View style={styles.security}>
          <View style={styles.resport_content}>
            <Text style={styles.security_report}>Incident Reports List</Text>
          </View>
        </View>

        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            {all ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  width: 90,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
                onPress={() => {
                  setManage(false)
                  setPolice(false)
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#1a73e8" }}>
                  All
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(26, 115, 232, 0.4)",
                  width: 90,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
                onPress={() => {
                  setManage(false)
                  setAll(true)
                  setPolice(false)
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#fff" }}>All</Text>
              </TouchableOpacity>
            )}

            {manage ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  width: 90,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
                onPress={() => {
                  setAll(false)
                  setManage(true)
                  setPolice(false)
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#1a73e8" }}>
                  Manage
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(26, 115, 232, 0.4)",
                  width: 90,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
                onPress={() => {
                  setAll(false)
                  setManage(true)
                  setPolice(false)
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  Manage
                </Text>
              </TouchableOpacity>
            )}

            {police ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  width: 90,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
                onPress={() => {
                  setAll(false)
                  setPolice(false)
                  setManage(false)
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#1a73e8" }}>
                  Police
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(26, 115, 232, 0.4)",
                  width: 90,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
                onPress={() => {
                  setAll(false)
                  setPolice(true)
                  setManage(false)
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  Police
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.all_security_inputs}>
            {previousIncidentList.map((val, ind) => {
              return (
                <View style={styles.accountTop} key={ind}>
                  <View
                    style={{
                      backgroundColor: "#E9F1FD",
                      padding: 15,
                      borderRadius: 10
                    }}
                  >
                    <TouchableOpacity
                      style={styles.list_view}
                      onPress={() =>
                        setIncidentId(incidentId === val ? null : val)
                      }
                    >
                      <View style={styles.flex}>
                        <Text
                          style={{ fontWeight: "bold", fontSize: RFValue(15) }}
                        >
                          Incident Report Type#1
                        </Text>
                      </View>
                      <View>
                        <View>
                          <Text style={{ fontSize: 11 }}>10.12.21 13:10</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {incidentId === val ? (
                      <View>
                        <View style={styles.incidentType_secondview} />
                        <View>
                          <View>
                            <View onPress={() => {}} style={{ width: "100%" }}>
                              <View>
                                <View>
                                  <View
                                    style={{
                                      marginTop: 10,
                                      display: "flex",
                                      flexDirection: "row"
                                    }}
                                  >
                                    <Text style={styles.title_text}>
                                      Incident Report Number:
                                    </Text>
                                    <Text
                                      style={{
                                        marginLeft: 5,
                                        fontSize: RFValue(12),
                                        color: "#1a73e8",
                                        textDecorationLine: "underline"
                                      }}
                                    >
                                      #121212121
                                    </Text>
                                  </View>

                                  <View style={styles.title}>
                                    <Text style={styles.title_text}>
                                      Date & Time:
                                    </Text>
                                    <Text style={{ fontSize: RFValue(12) }}>
                                      04/05/22 12:55PM
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      marginTop: 10
                                    }}
                                  >
                                    <Text style={styles.title_text}>
                                      Incident Report Details:
                                    </Text>
                                    <Text style={{ fontSize: RFValue(12) }}>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Aenean quis erat eget mi
                                      imperdiet mattis. Quisque luctus.
                                    </Text>
                                  </Text>

                                  <View style={styles.title}>
                                    <Text style={styles.title_text}>
                                      Status:
                                    </Text>
                                    <Text style={{ fontSize: RFValue(12) }}>
                                      Filed (By Police)
                                    </Text>
                                  </View>

                                  <View style={styles.title}>
                                    <Image
                                      source={require("../../../assets/security-back.jpg")}
                                      style={{
                                        height: 100,
                                        width: 60,
                                        borderRadius: 8
                                        // left: i === 0 ? 0 : 10,
                                      }}
                                    />

                                    <Image
                                      source={require("../../../assets/security-back.jpg")}
                                      style={{
                                        height: 100,
                                        width: 60,
                                        borderRadius: 8,
                                        left: 10
                                      }}
                                    />

                                    <Image
                                      source={require("../../../assets/security-back.jpg")}
                                      style={{
                                        height: 100,
                                        width: 60,
                                        borderRadius: 8,
                                        left: 20
                                      }}
                                    />

                                    <Image
                                      source={require("../../../assets/security-back.jpg")}
                                      style={{
                                        height: 100,
                                        width: 60,
                                        borderRadius: 8,
                                        left: 30
                                      }}
                                    />
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                    <View style={styles.bottom_border} />
                  </View>
                </View>
              )
            })}
          </View>
        </View>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate("ReportSecurity")}
        >
          <View style={styles.btnView}>
            <Text style={styles.btnText}>SUBMIT </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef"
  },

  dateView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EAE7F1",
    width: "25%",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,

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
  Explain: {
    marginTop: 10
  },
  bottomButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    alignSelf: "center"
  },
  btnView: {
    backgroundColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  textAreaContainer: {
    borderColor: "#EAE7F1",
    backgroundColor: "#EAE7F1",
    borderWidth: 1,
    padding: 5,

    borderRadius: 7,
    marginTop: 5
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    fontSize: RFValue(12),
    textAlignVertical: "top"
  },
  textAreaExplain: {
    height: 120,
    justifyContent: "flex-start",
    fontSize: RFValue(12),
    textAlignVertical: "top"
  },
  addButton: { marginTop: 15, width: "100%" },
  addView: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2E1070"
  },
  addText: { color: "#2E1070", fontWeight: "bold" },
  scroll_view: { backgroundColor: "#fff", height: height - 60 },
  security: { backgroundColor: "#e5e5e5", height: height / 9 },
  resport_content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  security_report: {
    fontSize: RFValue(18),
    fontWeight: "bold"
  },
  incident: {
    fontSize: RFValue(13),
    marginTop: 5
  },
  security_main_inputs: {
    backgroundColor: "#fff",
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
    height: height,
    elevation: 20
  },
  inputs_view: { padding: 10, paddingBottom: 50, marginTop: 20 },
  date_time: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  date: { width: "50%", padding: 10 },
  all_security_inputs: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: -1000
  },
  pressed_incident_type: {
    width: "100%",
    zIndex: Platform.OS === "android" ? 10 : 0,
    top: 65,
    position: "absolute"
  },
  dropdown_scroll_view: {
    backgroundColor: "#EAE7F1",
    borderRadius: 7,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  border_bottom_security: {
    borderWidth: 1,
    width: "100%",
    marginTop: 10,
    borderColor: "#fff"
  },
  yes_no_options: { display: "flex", flexDirection: "row" },
  radio_touchable: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 20
  },
  security_agency: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  agency_report_view: {
    width: "50%",
    marginTop: 10,
    paddingRight: 10
  },
  badge_vehicle: {
    width: "50%",
    marginTop: 10,
    paddingLeft: 10
  },
  list_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  type_view: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10
  },
  incidentType_secondview: {
    borderWidth: 1,
    width: "100%",
    borderColor: "#fff",
    marginTop: 10
  },
  title: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  title_text: {
    fontWeight: "bold",
    fontSize: RFValue(12)
  }
})

export default SecurityReport
