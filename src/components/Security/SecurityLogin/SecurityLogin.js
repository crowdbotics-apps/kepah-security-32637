import axios from "axios"
import React, { useEffect } from "react"
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { connect } from "react-redux"
import pathUrl from "../../../config/path"

const Welcome = ({ navigation }) => {
  const [username, setUsername] = React.useState("zubair_12")
  const [password, setPassword] = React.useState("zub123456")

  const [loggingIn, setLoggingIn] = React.useState(false)

  useEffect(() => {
    AsyncStorage.clear()
  }, [])

  const login = () => {
    setLoggingIn(true)
    axios
      .post(`${pathUrl}/api/v1/login/`, {
        username: username,
        password: password
      })
      .then(response => {
        saveTokenandUid(response.data.token, response.data.user.id)
      })
      .catch(error => {
        setLoggingIn(false)
      })
  }

  const saveTokenandUid = async (token, id) => {
    setLoggingIn(false)

    try {
      await AsyncStorage.setItem("token", token)
      await AsyncStorage.setItem("user_id", JSON.stringify(id))
      navigation.navigate("SelectProperty")
    } catch (error) {
      console.log("=-=", error)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-150}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.main}>
            <View style={{ top: 70 }}>
              <View style={styles.logoTextView}>
                <Text style={styles.logoText}>LOGO</Text>
              </View>

              <View style={styles.welcomeView}>
                <Text style={styles.welcome}>Welcome John</Text>
                <Text style={styles.name}>John Doe </Text>
                <Text style={styles.email}>john@website.com</Text>
              </View>
            </View>

            <View style={styles.inputViewMain}>
              <View>
                <View>
                  <Text style={styles.createPass}>Email:</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setUsername(text)}
                      value={username}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.password}>Password:</Text>

                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setPassword(text)}
                      value={password}
                      secureTextEntry={true}
                    />

                    <View>
                      <Text style={styles.eyeDot} />
                      <Image
                        style={styles.showPass}
                        source={require("../../../assets/Vector.png")}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.forgotView}>
                  <Text style={styles.forgotPass}>Forgot pssword?</Text>
                  <Text style={styles.resetNow}>Reset now</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => login()}
            >
              <View style={styles.btnView}>
                <Text style={styles.btnText}>SAVE</Text>
                {loggingIn ? <ActivityIndicator color="white" /> : null}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  logoView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  logo: { width: 150 },
  welcomeView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  welcome: { fontSize: RFValue(30) },
  name: { fontSize: RFValue(25), fontWeight: "700", marginTop: 20 },
  visitor: { fontSize: RFValue(25), fontWeight: "700" },

  email: { fontSize: RFValue(18), marginTop: 5 },
  inputViewMain: { padding: 15 },
  createPass: { fontSize: 12, color: "#131313" },
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
    color: "#131313",
    fontSize: RFValue(12)
  },
  showPass: { width: 16, height: 10, marginRight: 10, left: 5 },
  password: { fontSize: RFValue(12), color: "#131313", marginTop: 10 },
  logoTextView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logoText: { color: "#1A73E8", fontSize: RFValue(40), fontWeight: "bold" },
  bottomButton: { padding: 15, bottom: 0, width: "100%" },
  btnView: {
    backgroundColor: "#1A73E8",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    width: "100%"
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  eyeDot: {
    borderWidth: 1,
    width: 1,
    height: 1,
    position: "absolute",
    left: 12,
    top: 4
  },
  scroll: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column"
  },
  forgotView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10
  },
  resetNow: {
    fontSize: RFValue(12),
    color: "#1A73E8",
    textDecorationLine: "underline"
  },
  forgotPass: { fontSize: RFValue(12) },
  go_back_login: {
    left: -10,
    position: "absolute",
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: -10,
    flexDirection: "row"
  }
})

const mapStateToProps = state => {
  return {
    authObj: state
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
