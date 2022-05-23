import React, { useEffect, useState } from "react"
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Header from "../Header/Header"
import axios from "axios"

const { height } = Dimensions.get("screen")

const PoliceContactInformation = ({ navigation }) => {
  const [policeLiasionInformation, setPoliceLiasionInformation] = useState(null)
  const getPoliceLiasionInformation = (token, buildingNo) => {
    var config = {
      method: "get",
      url: `https://kepah-24275.botics.co/api/v1/police-liaison?residence_building=${buildingNo}`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      }
    }

    axios(config)
      .then(function (response) {
        alert()
        console.log(
          "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=response.data.slice(response.data.length, 1)",
          response.data.slice(response.data.length, 1)
        )
        setPoliceLiasionInformation(
          response.data.slice(response.data.length, 1)
        )
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      const buildingNo = await AsyncStorage.getItem("buildingno")
      if (value !== null) {
        getPoliceLiasionInformation(value, buildingNo)
      }
    } catch (error) {}
  }
  useEffect(() => {
    getToken()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.main}>
        <Header navigation={navigation} />

        <View style={{ height: "90%" }}>
          <View style={styles.security_logo_main_view}>
            <View />
            <View style={styles.white_borders_view}>
              <View style={styles.logo_borders}>
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: 180,
                    width: 180,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    borderRadius: 200,
                    position: "absolute",
                    top: -80,
                    borderColor: "#E9F1FD",
                    borderWidth: 4
                  }}
                >
                  <Image
                    source={require("../../../assets/security-profile.png")}
                  />
                </View>
                <View style={styles.request_recieved_view}>
                  <Text style={styles.request_security_service}>
                    Police Contact Information
                  </Text>
                  <View style={styles.security_bottom_border} />

                  <View
                    style={{
                      top: 30,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: RFValue(13),
                          fontWeight: "bold"
                        }}
                      >
                        Email
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(13),
                          textDecorationLine: "underline"
                        }}
                      >
                        AskUSCP@uscp.gov
                      </Text>
                    </View>
                    <View
                      style={{ top: 20, display: "flex", flexDirection: "row" }}
                    >
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: RFValue(13),
                          fontWeight: "bold"
                        }}
                      >
                        Phone:
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(13)
                        }}
                      >
                        911
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.back_touchable}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <View style={styles.go_back_view}>
                <View style={styles.btnView}>
                  <Text style={styles.btnText}>GO BACK</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    height: height,
    width: "100%",
    backgroundColor: "#efefef"
  },
  btnView: {
    backgroundColor: "#1a73e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: RFValue(14) },
  security_logo_main_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "90%"
  },
  security_report: { fontSize: RFValue(18), fontWeight: "bold", top: -15 },
  logo: {
    fontSize: RFValue(35),
    fontWeight: "bold",
    top: 20,
    color: "#1a73e8"
  },
  white_borders_view: { padding: 20, width: "100%" },
  logo_borders: {
    backgroundColor: "#fff",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 19,
    height: 330,
    top: 50,

    shadowOffset: {
      height: 0,
      width: 1
    },
    elevation: 2
  },
  request_recieved_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  request_security_service: { fontSize: RFValue(18), marginTop: 10 },
  recieved_logged: { fontSize: RFValue(18) },
  security_bottom_border: {
    borderWidth: 1,
    marginTop: 20,
    width: 300,
    borderColor: "#eaeaea"
  },
  report_has_been_sent: { fontSize: RFValue(18), marginTop: 20 },
  management_feedback: { fontSize: RFValue(18), marginTop: 5 },
  back_touchable: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  go_back_view: { width: "100%", marginTop: 30 }
})

export default PoliceContactInformation
