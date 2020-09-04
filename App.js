import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './components/Navigation';


export default function App() {
  return (
    <NavigationContainer>
    <MyTabs />
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef",
    flexDirection: "column"
  },
  childContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    backgroundColor: "cyan",
    width: "100%"
  }
});