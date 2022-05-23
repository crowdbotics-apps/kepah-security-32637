import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
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
  View
} from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { RFValue } from "react-native-responsive-fontsize"
import pathUrl from "../../../config/path"
import Header from "../Header/Header"
const { height } = Dimensions.get("screen")

const ResidentPortal = ({ navigation }) => {
  const [profile_picture, setProfile_picture] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [id, setId] = useState("")
  const [loggingIn, setLoggingIn] = React.useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      if (value !== null) {
        setToken(value)
        getUserDetails(value)
      }
    } catch (error) {
      // Error retrieving data
    }
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
        setId(d.id)
        setEmail(d.email)
        setUsername(d.username)
        setPhone_number(d.phone_number)
        setProfile_picture(d.profile_picture)
      })
      .catch(error => {})
  }

  const updateDetails = () => {
    setLoggingIn(true)

    const formData = new FormData()

    formData.append("profile_picture", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: profile_picture
    })

    axios({
      method: "PATCH",
      url: `${pathUrl}/api/v1/user/${id}/`,
      data: formData,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        updateUserInfo()
      })
      .catch(error => {
        setLoggingIn(false)
      })
  }

  const updateUserInfo = () => {
    axios
      .patch(
        `${pathUrl}/api/v1/user/${id}/`,
        { name: username, phone_number: phone_number },
        {
          headers: {
            Authorization: `token ${token}`
          }
        }
      )
      .then(() => {
        setLoggingIn(false)
        navigation.navigate("Dashboard")
      })
      .catch(() => {
        setLoggingIn(false)
      })
  }

  const uploadProfilePicture = () => {
    launchImageLibrary(
      {
        mediaType: "photo"
      },
      response => {
        setProfile_picture(response.uri)
      }
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height "}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <Header navigation={navigation} />
      </View>

      <ScrollView style={styles.ScrollView}>
        <View style={styles.residentView}>
          <View style={styles.mainPageName}>
            <Text style={styles.resident}>Security</Text>
            <Text style={styles.msgForUser}>Please upload your photo.</Text>
          </View>
        </View>

        <View style={{ backgroundColor: "#e5e5e5" }}>
          <View style={styles.pageContent}>
            <TouchableOpacity
              style={styles.upload_photo_touchable}
              onPress={() => uploadProfilePicture()}
            >
              <View
                style={
                  profile_picture && profile_picture !== ""
                    ? styles.plusview_main_profilepic
                    : styles.plusview_main
                }
              >
                <Image
                  source={
                    profile_picture && profile_picture !== ""
                      ? { uri: profile_picture }
                      : require("../../../assets/security-profile.png")
                  }
                  style={
                    profile_picture && profile_picture !== ""
                      ? styles.profile_pic
                      : {
                          height: 120,
                          width: 90,
                          position: "absolute",
                          bottom: 0
                        }
                  }
                />

                <View style={styles.plus_view}>
                  <View style={styles.plus_view_2}>
                    <Image
                      source={require("../../../assets/security-plus.png")}
                      style={styles.plus_img}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.profile_user_name}>
              <View style={styles.user_name_view}>
                <Text style={styles.user_name}>{username}</Text>
              </View>
            </View>

            <View style={styles.inputViewMain}>
              <View>
                <Text style={styles.email}>Email:</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.password}>Phone:</Text>

                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setPhone_number(text)}
                    value={phone_number}
                  />
                </View>
              </View>

              {/* <View>
                <Text style={styles.password}>Address:</Text>

                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setResidence_building(text)}
                    value={residence_building}
                  />
                </View>
              </View> */}
            </View>

            <View style={styles.logo_view}>
              <View style={styles.logoTextView}>
                <Text style={styles.logoText}>LOGO</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={updateDetails}
            >
              <View style={styles.btnView}>
                <Text style={styles.btnText}>CONFIRM </Text>
                {loggingIn ? <ActivityIndicator color="white" /> : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
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

  inputViewMain: { padding: 15 },
  email: { fontSize: RFValue(12), color: "#131313" },
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
  input: {
    width: "80%",
    flex: 1,
    color: "#131313"
  },
  showPass: { width: 16, height: 10, marginRight: 10, left: 5 },
  password: { fontSize: RFValue(12), color: "#131313", marginTop: 10 },
  logoTextView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  eyeDot: {
    borderWidth: 1,
    width: 1,
    height: 1,
    position: "absolute",
    left: 12,
    top: 4
  },
  logoText: { color: "#1a73e8", fontSize: RFValue(40), fontWeight: "bold" },
  bottomButton: { padding: 15, width: "100%", bottom: 10 },
  btnView: {
    backgroundColor: "#1a72e8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  plusview_main: {
    backgroundColor: "white",
    padding: 20,
    height: 150,
    width: 150,
    marginTop: -80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#1a73e8"
  },

  plusview_main_profilepic: {
    backgroundColor: "white",
    height: 150,
    width: 150,
    marginTop: -80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80
  },

  profile_pic: {
    height: 150,
    width: 150,
    position: "absolute",
    borderRadius: 140
  },
  header: { backgroundColor: "#e5e5e5" },
  ScrollView: { height: height - 60 },
  residentView: { backgroundColor: "#e5e5e5", height: height / 5 },
  mainPageName: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  resident: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#1a73e8"
  },
  msgForUser: {
    fontSize: RFValue(10),
    color: "#FF0000",
    marginTop: 2
  },
  pageContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0
  },
  upload_photo_touchable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    top: 10
  },
  plus_view: {
    position: "absolute",
    right: 0,
    top: 20
  },
  plus_view_2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A73E8",
    borderRadius: 20,
    height: 28,
    width: 28,
    borderWidth: 2,
    borderColor: "#fff"
  },
  plus_img: { height: 16, width: 16 },
  profile_user_name: {
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
  user_name: { fontSize: RFValue(23), fontWeight: "bold" },
  logo_view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height / 10 + 40
  }
})

export default ResidentPortal
