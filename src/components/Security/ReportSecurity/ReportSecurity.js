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
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native"
import RadioButton from "react-native-radio-button"
import { RFValue } from "react-native-responsive-fontsize"
import DatePickerModal from "../../../features/DatePicker/index"
import Header from "../Header/Header"
import ImagePicker from "react-native-image-crop-picker"

const { height } = Dimensions.get("screen")

const SecurityReport = ({ navigation }) => {
  const [serviceOptions, getServiceOptions] = useState([])
  const [_serviceOption, setServiceOptions] = useState({ name: "", id: "" })

  const [token, setToken] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const [incident_summary, setIncident_summary] = useState("Incident")
  const [report_date, setReport_date] = useState("")
  const [report_time, setReport_time] = useState("")
  const [witness_name, setWitness_name] = useState("")
  const [witness_phone, setWitness_phone] = useState("")
  const [selected, setSelected] = useState("yes")
  const [emergency_person_name, setEmergency_person_name] = useState("")
  const [agency_name, setAgency_name] = useState("")
  const [vehicle_number, setVehicle_number] = useState("")
  const [police_call, setPoliceCall] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [image_1, setImage_1] = useState(null)
  const [image_2, setImage_2] = useState(null)

  const [residence_building, setResidentBuildingNo] = useState("")

  const [incidentTypeText, setIncidentTypeText] = useState("Select type")

  const [incidentType, setIncidentType] = useState(false)

  const [timerText, setTimerText] = useState("Select type")

  const [timerType, setTimerType] = useState(false)

  const [timings] = useState([
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM"
  ])

  useEffect(() => {
    getToken()
  }, [])

  const submit = () => {
    setSubmitting(true)
    var data = new FormData()
    data.append("incident_type", _serviceOption.id)
    data.append("incident_summary", incident_summary)
    data.append("report_date", report_date)
    data.append("report_time", report_time)
    data.append("witness_name", witness_name)
    data.append("witness_phone", witness_phone)
    data.append("police_call", police_call)
    data.append("emergency_person_name", emergency_person_name)
    data.append("agency_name", agency_name)
    data.append("vehicle_number", vehicle_number)
    data.append("residence_building", 1)
    data.append("image_1", image_1)
    data.append("image_2", image_2)

    let config = {
      method: "post",
      url: "https://kepah-24275.botics.co/api/v1/security-report/",
      headers: {
        Authorization: `token ${token}`
      },
      data: data
    }

    axios(config)
      .then(() => {
        setSubmitting(false)
        navigation.navigate("ReportLogo")
      })
      .catch(() => {
        setSubmitting(false)
      })
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      if (value !== null) {
        getUserDetails(token)
        setToken(value)
        getReportTypes(value)
      }
    } catch (error) {}
  }
  const getReportTypes = token => {
    var config = {
      method: "get",
      url: "https://kepah-24275.botics.co/api/v1/incident-report-type/",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }

    axios(config)
      .then(function (response) {
        getServiceOptions(response.data)
      })
      .catch(function () {})
  }

  const getUserDetails = token => {
    axios
      .get(`https://kepah-24275.botics.co/rest-auth/user/`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      .then(response => {
        let d = response.data
        setResidentBuildingNo(
          d.residence_building.length > 0
            ? `${d.residence_building[0].id}`
            : null
        )
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 2
    }).then(images => {
      images.map((val, ind) => {
        if (ind === 0) {
          setImage_1({
            name: val.filename,
            uri:
              Platform.OS === "android"
                ? val.sourceURL
                : val.sourceURL.replace("file://", ""),
            type: val.mime
          })
        }
        if (ind === 1) {
          setImage_2({
            name: val.filename,
            uri:
              Platform.OS === "android"
                ? val.sourceURL
                : val.sourceURL.replace("file://", ""),
            type: val.mime
          })
        }
      })
    })
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    var _date_ = date.getDate()
    var month = date.getMonth() + 1 // Since getMonth() returns month from 0-11 not 1-12
    var year = date.getFullYear()
    setReport_date(`${year}-${month}-${_date_}`)
    hideDatePicker()
  }

  const showTimePicker = () => {
    setTimePickerVisibility(true)
  }

  const hideTimePicker = () => {
    setTimePickerVisibility(false)
  }

  const handleTimeConfirm = time => {
    var _time =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    setReport_time(`${_time}`)
    hideTimePicker()
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
            <Text style={styles.security_report}>Security Report</Text>
            <Text style={styles.incident}>Incident #01234567</Text>
          </View>
        </View>

        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.security_main_inputs}>
            <View style={styles.inputs_view}>
              <View style={styles.date_time}>
                <TouchableOpacity onPress={showDatePicker} style={styles.date}>
                  <Text style={styles.createPass}>Date:</Text>
                  <View style={styles.inputView}>
                    <View
                      style={styles.input}
                      onChangeText={setReport_date}
                      value={report_date}
                      keyboardType="numeric"
                    >
                      <Text>{report_date}</Text>
                    </View>
                    <View>
                      <Image
                        style={{ left: -10 }}
                        source={require("../../../assets/security-calendar.png")}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.date}>
                  <Text style={styles.createPass}>Time:</Text>

                  <TouchableOpacity
                    style={styles.accountView}
                    // onPress={() => setTimerType(!timerType)}
                    onPress={showTimePicker}
                  >
                    <Text style={styles.input}>{report_time}</Text>
                    <View>
                      <Image
                        style={styles.more}
                        source={require("../../../assets/security-dropdown.png")}
                      />
                    </View>
                  </TouchableOpacity>
                  {timerType ? (
                    <View
                      style={{
                        zIndex: 0,
                        position: "absolute",
                        width: "100%",
                        left: 10,
                        top: 70
                      }}
                    >
                      <ScrollView style={{ height: 200 }}>
                        <View>
                          <View style={{ width: "100%" }}>
                            <ScrollView
                              nestedScrollEnabled={true}
                              style={styles.dropdown_scroll_view}
                            >
                              {timings.map((val, ind) => {
                                return (
                                  <View key={ind}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setTimerType(!timerType)
                                        setTimerText(true)
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Text style={{ marginTop: 10 }}>
                                        {val}
                                      </Text>
                                    </TouchableOpacity>
                                    <View
                                      style={styles.border_bottom_security}
                                    />
                                  </View>
                                )
                              })}
                            </ScrollView>
                          </View>
                          <View style={styles.border_bottom} />
                        </View>
                      </ScrollView>
                    </View>
                  ) : null}
                </View>
              </View>

              <View style={styles.all_security_inputs}>
                <View style={styles.accountTop}>
                  <Text style={styles.cardNum}>Incident Type</Text>

                  <TouchableOpacity
                    style={styles.accountView}
                    onPress={() => setIncidentType(!incidentType)}
                  >
                    <Text style={styles.input}>
                      {_serviceOption.id !== ""
                        ? _serviceOption.name
                        : "Select type:"}
                    </Text>
                    <View>
                      <Image
                        style={styles.more}
                        source={require("../../../assets/security-dropdown.png")}
                      />
                    </View>
                  </TouchableOpacity>
                  {incidentType ? (
                    <View>
                      <View>
                        <View>
                          <View style={{ width: "100%" }}>
                            <ScrollView
                              nestedScrollEnabled={true}
                              style={styles.dropdown_scroll_view}
                            >
                              {serviceOptions.map((val, ind) => {
                                return (
                                  <View key={ind}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setServiceOptions(val)
                                        setIncidentType(!incidentType)
                                        setIncidentTypeText(true)
                                      }}
                                      style={{ width: "100%" }}
                                    >
                                      <Text style={{ marginTop: 10 }}>
                                        {val.name}
                                      </Text>
                                    </TouchableOpacity>
                                    <View
                                      style={styles.border_bottom_security}
                                    />
                                  </View>
                                )
                              })}
                            </ScrollView>
                          </View>
                          <View style={styles.border_bottom} />
                        </View>

                        {/* );
                          })} */}
                      </View>
                    </View>
                  ) : null}
                </View>

                <View style={styles.accountTop}>
                  <Text style={styles.cardNum}>Incident Summary:</Text>

                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder=""
                      placeholderTextColor="black"
                      numberOfLines={5}
                      multiline={true}
                      onChangeText={setIncident_summary}
                    />
                  </View>
                </View>

                <TouchableOpacity onPress={() => uploadPhoto()}>
                  <View style={styles.addButton}>
                    <View
                      style={image_1 ? styles.addViewSelected : styles.addView}
                    >
                      <Text
                        style={
                          image_1 ? styles.addTextSelected : styles.addText
                        }
                      >
                        {image_1 ? "PHOTO ADDED" : "ADD PHOTO/VIDEO (OPTIONAL)"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={{ marginTop: 10 }}>
                  <Text style={styles.createPass}>
                    Potential Witnesses Name::
                  </Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.input}
                      onChangeText={setWitness_name}
                      value={witness_name}
                    />
                  </View>
                </View>

                <View style={styles.accountTop}>
                  <Text style={styles.cardNum}>Potential Witnesses Phone:</Text>

                  <View style={styles.accountView}>
                    <TextInput
                      style={styles.input}
                      onChangeText={setWitness_phone}
                      value={witness_phone}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={{}}>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: RFValue(12) }}>Police Call:</Text>
                    <View style={styles.yes_no_options}>
                      <TouchableOpacity
                        style={styles.radio_touchable}
                        onPress={() => {
                          setSelected("yes")
                          setPoliceCall(true)
                        }}
                      >
                        <RadioButton
                          onPress={() => {
                            setSelected("yes")
                            setPoliceCall(true)
                          }}
                          animation={"bounceIn"}
                          outerColor={"#1A73E8"}
                          innerColor={"#1A73E8"}
                          size={8}
                          isSelected={selected === "yes" ? true : false}
                          activeColor="1A73E8"
                          boxActiveBgColor="#1A73E8"
                        />
                        <Text style={{ marginLeft: 10 }}>Yes</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.radio_touchable}
                        onPress={() => {
                          setSelected("no")
                          setPoliceCall(false)
                        }}
                      >
                        <RadioButton
                          onPress={() => {
                            {
                              setSelected("no")
                              setPoliceCall(false)
                            }
                          }}
                          animation={"bounceIn"}
                          isSelected={selected === "no" ? true : false}
                          outerColor={"#1A73E8"}
                          innerColor={"#1A73E8"}
                          size={8}
                          // data={selected}
                          activeColor="#1A73E8"
                          boxActiveBgColor="#1A73E8"
                        />
                        <Text style={{ marginLeft: 10 }}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {police_call ? (
                    <View>
                      <View style={styles.accountTop}>
                        <Text style={styles.cardNum}>
                          Police or Emergency Person Name:
                        </Text>

                        <View style={styles.accountView}>
                          <TextInput
                            style={styles.input}
                            onChangeText={setEmergency_person_name}
                            value={emergency_person_name}
                          />
                        </View>
                      </View>
                      <View style={styles.security_agency}>
                        <View style={styles.agency_report_view}>
                          <Text style={styles.createPass}>Agency Name:</Text>
                          <View style={styles.inputView}>
                            <TextInput
                              style={styles.input}
                              onChangeText={setAgency_name}
                              value={agency_name}
                            />
                          </View>
                        </View>
                        <View style={styles.badge_vehicle}>
                          <Text style={styles.createPass}>
                            Badge/Vehicle Number:
                          </Text>
                          <View style={styles.inputView}>
                            <TextInput
                              style={styles.input}
                              onChangeText={setVehicle_number}
                              value={vehicle_number}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.Explain}>
                      <Text style={styles.cardNum}>Explain why not:</Text>

                      <View style={styles.textAreaContainer}>
                        <TextInput
                          style={styles.textAreaExplain}
                          underlineColorAndroid="transparent"
                          placeholder=""
                          placeholderTextColor="black"
                          numberOfLines={10}
                          multiline={true}
                        />
                      </View>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  disabled={submitting}
                  style={styles.bottomButton}
                  onPress={() => submit()}
                >
                  <View>
                    <View style={styles.btnView}>
                      <Text style={styles.btnText}>
                        {submitting ? (
                          <Text>SUBMITTING</Text>
                        ) : (
                          <Text>SUBMIT</Text>
                        )}
                      </Text>
                      {submitting ? <ActivityIndicator color="white" /> : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <DatePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <DatePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef"
    // marginBottom: 20
  },
  email: { fontSize: 18, marginTop: 5 },

  createPass: { fontSize: RFValue(12), color: "#131313" },
  cardNum: {
    fontSize: RFValue(12),
    color: "#131313"
  },
  selectType: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E9F1FD",
    width: "100%",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
    justifyContent: "space-between"
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E9F1FD",
    width: "100%",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5
  },

  inputView2: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E9F1FD",
    width: "100%",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    borderRadius: 7,
    marginTop: 5,
    justifyContent: "space-between"
  },
  input: {
    width: "100%",
    flex: 1,
    color: "#131313",
    fontSize: RFValue(12)
  },
  showPass: { width: 16, height: 10, marginRight: 10, left: 5 },
  password: { fontSize: 12, color: "#131313", marginTop: 10 },

  dateView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E9F1FD",
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
    backgroundColor: "#E9F1FD",
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
    backgroundColor: "#E9F1FD",
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
  bottomButton: { marginTop: 20, marginBottom: 50 },
  btnView: {
    backgroundColor: "#1A73E8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  textAreaContainer: {
    borderColor: "#E9F1FD",
    backgroundColor: "#E9F1FD",
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
    borderColor: "#1A73E8"
  },
  addViewSelected: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "green"
  },
  addText: { color: "#1A73E8", fontWeight: "bold" },
  addTextSelected: { color: "green", fontWeight: "bold" },
  scroll_view: { height: height - 60 },
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
    elevation: 20
  },
  inputs_view: { padding: 10, paddingBottom: 50, marginTop: 20 },
  date_time: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  date: { width: "50%", padding: 10 },
  all_security_inputs: { paddingLeft: 10, paddingRight: 10, zIndex: -1000 },
  pressed_incident_type: {
    width: "100%",
    zIndex: Platform.OS === "android" ? 10 : 0,
    top: 65,
    position: "absolute"
  },
  dropdown_scroll_view: {
    backgroundColor: "#E9F1FD",
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
  }
})

export default SecurityReport
