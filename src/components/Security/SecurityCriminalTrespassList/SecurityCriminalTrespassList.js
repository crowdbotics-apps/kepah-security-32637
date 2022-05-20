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
const { height } = Dimensions.get("screen")

const Confirm = ({ navigation }) => {
  const [criminalTrespass, setCriminalTrespass] = useState([1])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getToken()
    }
  }, [isFocused])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      const buildingno = await AsyncStorage.getItem("buildingno")
      if (value !== null) {
        getCriminalTrespass(value, buildingno)
      }
    } catch (error) {}
  }

  const getCriminalTrespass = (token, buildingno) => {
    axios
      .get(
        `https://kepah-24275.botics.co/api/v1/criminal-status/?residence_building=${buildingno}`,
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        let criminalTrespass = response.data
        if (criminalTrespass && criminalTrespass.length > 0) {
          criminalTrespass.reverse()
          setCriminalTrespass(criminalTrespass)
        }
      })
      .catch(error => {
        console.log("-", error)
      })
  }

  // const getCriminalTrespass = token => {
  //   let config = {
  //     method: "get",
  //     url: "https://kepah-24275.botics.co/api/v1/criminal-status?residence_building=1",
  //     headers: {
  //       Authorization: "token d1a3b644b435c70d39dbdf20964d9955510eef76",
  //       "Content-Type": "application/json"
  //     }
  //   }

  //   axios(config)
  //     .then(response => {
  // let criminalTrespass = response.data
  // if (criminalTrespass && criminalTrespass.length > 0) {
  //   criminalTrespass.reverse()
  //   setCriminalTrespass(criminalTrespass)
  // }
  //     })
  //     .catch(error => {})
  // }

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
            <Text style={{ fontSize: RFValue(17), fontWeight: "bold" }}>
              John Doe
            </Text>

            <Text style={styles.my_vehicle}>
              Criminal Trespass List ({criminalTrespass.length})
            </Text>
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
              placeholder="Secrch by Name..."
            />
            <Image source={require("../../../assets/security-search.png")} />
          </View>
          {criminalTrespass.map((val, ind) => {
            return (
              <View style={styles.msg_conversation_1} key={ind}>
                <View style={styles.conversation_view}>
                  <View style={styles.user_conversation}>
                    <View>
                      <Image
                        source={
                          val.user_details && val.user_details.profile_picture
                            ? {
                                uri: val.user_details.profile_picture
                              }
                            : require("../../../assets/profile.jpeg")
                        }
                        style={styles.user_profile_image}
                      />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                      <Text style={styles.user_name}>
                        {val.user_details && val.user_details.name !== null
                          ? val.user_details.name
                          : "-"}
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(12),
                          marginTop: 5,
                          color: "#848484"
                        }}
                      >
                        Added by: {val.marked_by}
                      </Text>
                      {val.user_details && (
                        <Text
                          style={{
                            fontSize: RFValue(12),
                            marginTop: 5,
                            color: "#848484"
                          }}
                        >
                          Added:
                          {new Date(val.user_details.date_joined).getDate()}/
                          {new Date(val.user_details.date_joined).getMonth()}/
                          {new Date(val.user_details.date_joined).getFullYear()}
                          <Text style={{ marginLeft: 40 }}>
                            {new Date(val.user_details.date_joined).getHours()}/
                            {new Date(
                              val.user_details.date_joined
                            ).getMinutes()}
                          </Text>
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate("SuggestNewCriminalTrespass")}
      >
        <View style={styles.btnView}>
          <Text style={styles.btnText}>ADD NEW </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboard_avoiding: {
    backgroundColor: "#fff"
  },
  scroll_view: { height: height - 120, backgroundColor: "#fff" },
  my_vehicle_text_view: { backgroundColor: "#e5e5e5", height: 100 },
  my_vehicle_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  my_vehicle: {
    fontSize: RFValue(17),
    fontWeight: "600"
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
  msg_conversation_1: {
    backgroundColor: "#E9F1FD",
    marginTop: 10,
    padding: 20,
    borderRadius: 10
  },
  conversation_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  user_conversation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  user_profile_image: {
    borderRadius: 80,
    height: 65,
    width: 65
  },
  user_name: { fontSize: RFValue(13), marginTop: -10 },
  user_msg_conversation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },

  bottomButton: {
    // marginTop: 20,
    // // marginBottom: 20,
    width: "95%",
    alignSelf: "center",
    // position: "absolute",
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
