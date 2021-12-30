import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as firebase from "firebase"
import React from "react"
import { StyleSheet } from "react-native"
import { Provider } from "react-redux"
import SecurityLogin from "./src/components/Security/SecurityLogin/SecurityLogin"
import SelectProperty from "./src/components/Security/SelectProperty/SelectProperty"
import Security from "./src/components/Security/Security/Security"
import Dashboard from "./src/components/Security/Dashboard/Dashboard"
import ListOfVehicles from "././src/components/Security/ListOfVehicles/ListOfVehicles"
import VehicleOwnerProfile from "././src/components/Security/VehicleOwnerProfile/VehicleOwnerProfile"
import SecurityIncidentReport from "././src/components/Security/SecurityIncidentReport/SecurityIncidentReport"
import ReportSecurity from "././src/components/Security/ReportSecurity/ReportSecurity"
import VehicleAction from "././src/components/Security/VehicleAction/VehicleAction"
import ReportLogo from "././src/components/Security/ReportSecurity/ReportLogo"
import PoliceContactInformation from "././src/components/Security/PoliceContactInformation/PoliceContactInformation"
import ClosedIncidentReports from "././src/components/Security/ClosedIncidentReports/ClosedIncidentReports"
import SecurityCriminalTrespassList from "././src/components/Security/SecurityCriminalTrespassList/SecurityCriminalTrespassList"
import SuggestNewCriminalTrespass from "././src/components/Security/SecurityCriminalTrespassList/SuggestNewCriminalTrespass"
import RentRoll from "././src/components/Security/RentRoll/RentRoll"
import StartNewMsg from "././src/components/Security/StartNewMsg/StartNewMsg"
import SecurityConversation from "././src/components/Security/SecuritySendMsg/SecurityConversation"
import SexOffenders from "././src/components/Security/SexOffenders/SexOffenders"

import { store } from "./src/store/index"

var firebaseConfig = {
  apiKey: "AIzaSyCwxLuImsB3NxwOb73OYFSq17zdZVvOuz0",
  authDomain: "attraction-6c456.firebaseapp.com",
  databaseURL: "https://attraction-6c456.firebaseio.com",
  projectId: "attraction-6c456",
  storageBucket: "attraction-6c456.appspot.com",
  messagingSenderId: "703890433565",
  appId: "1:703890433565:web:a337eb8bb35dc0c22ec8f4"
}
firebase.initializeApp(firebaseConfig)

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.main}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="SecurityLogin" component={SecurityLogin} />
          <Stack.Screen name="SelectProperty" component={SelectProperty} />
          <Stack.Screen name="Security" component={Security} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ListOfVehicles" component={ListOfVehicles} />
          <Stack.Screen
            name="VehicleOwnerProfile"
            component={VehicleOwnerProfile}
          />
          <Stack.Screen
            name="SecurityIncidentReport"
            component={SecurityIncidentReport}
          />

          <Stack.Screen name="ReportSecurity" component={ReportSecurity} />
          <Stack.Screen name="VehicleAction" component={VehicleAction} />
          <Stack.Screen name="ReportLogo" component={ReportLogo} />
          <Stack.Screen
            name="PoliceContactInformation"
            component={PoliceContactInformation}
          />
          <Stack.Screen
            name="ClosedIncidentReports"
            component={ClosedIncidentReports}
          />
          <Stack.Screen
            name="SecurityCriminalTrespassList"
            component={SecurityCriminalTrespassList}
          />
          <Stack.Screen
            name="SuggestNewCriminalTrespass"
            component={SuggestNewCriminalTrespass}
          />
          <Stack.Screen name="RentRoll" component={RentRoll} />
          <Stack.Screen name="StartNewMsg" component={StartNewMsg} />
          <Stack.Screen
            name="SecurityConversation"
            component={SecurityConversation}
          />
          <Stack.Screen name="SexOffenders" component={SexOffenders} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  main: { backgroundColor: "#fff" }
})

export default App
