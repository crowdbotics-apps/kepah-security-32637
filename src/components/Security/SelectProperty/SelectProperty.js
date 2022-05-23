import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { connect } from "react-redux"

const Welcome = ({ navigation }) => {
  const [requestType, setRequestType] = useState(null)
  const [pressed, setPressed] = useState(false)
  const [loggingIn] = React.useState(false)

  const confirmBuilding = async () => {
    try {
      await AsyncStorage.setItem("buildingno", `${requestType}`)
      navigation.navigate("Dashboard")
    } catch (e) {}
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
                  <Text style={styles.createPass}>Select Property:</Text>
                  <TouchableOpacity
                    style={styles.inputView}
                    onPress={() => {
                      setPressed(!pressed)
                    }}
                  >
                    <Text>
                      {requestType
                        ? `Property Name #${requestType}`
                        : "Select Property"}
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
                        marginTop: 10
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
                              setRequestType(1)
                            }}
                            style={{ width: "100%" }}
                          >
                            <Text>Property Name #1</Text>
                          </TouchableOpacity>
                          {/* <View
                            style={{
                              borderWidth: 1,
                              borderColor: "#fff",
                              marginTop: 10
                            }}
                          /> */}
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={confirmBuilding}
              disabled={requestType ? false : true}
            >
              <View style={styles.btnView}>
                <Text style={styles.btnText}>CONTINUE</Text>
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
    justifyContent: "space-between",
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
