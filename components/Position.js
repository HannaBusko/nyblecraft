import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import AsyncStorage from '@react-native-community/async-storage';

Geocoder.init("AIzaSyAnYsY86_y6XONni38aVCoKty8ehA7icF4");

function formatDate(date) {
  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + addZero(date.getHours()) + ":" + addZero(date.getUTCMinutes());
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

class CurrentPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      address: null,
      forecast: null,
    };;
  }


  componentDidMount() {
    Geolocation.getCurrentPosition(async (position) => {
      {
        let url =
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4bb26d063345b0b5f4a3ae9fa9e5c78c&units=metric&lang=ru`;

        var dataStore = {
          date: formatDate(new Date()),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: "",
          weather: ""
        }

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        let result = await Promise.all([
          Geocoder.from(position.coords.latitude, position.coords.longitude),
          fetch(url).then(response => {
            return response.json()
          })
        ]);

        let json = result[0];
        let data = result[1];

        let weather = data.weather[0]?.description[0]?.toUpperCase() + data.weather[0]?.description?.substring(1) + ". Температура воздуха: " + data.main?.temp + " C.";
        this.setState(
          {
            address: json.results[0]?.formatted_address,
            forecast: weather
          });

        let city = json.plus_code?.compound_code?.split(" ").splice(1);
        dataStore.city = city.join(" ");
        dataStore["weather"] = weather;

        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key');
          let store = !!jsonValue ? JSON.parse(jsonValue) : jsonValue;
          let newStore;
          if (!Array.isArray(store))
            newStore = [dataStore];
          else {
            store.unshift(dataStore);
            newStore = store;
          }
          await AsyncStorage.setItem('@storage_Key', JSON.stringify(newStore));
        } catch (e) {
          console.log(e);
        }
      }
    }, (error) => {
      this.setState({ error: error.message }),
        console.log(error.code, error.message);
    }, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 100000
    });
  }
  render() {
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center", height: 400 }}
      >
        {this.state.error ? < Text > Error : {
          this.state.error} </Text> : null}
        <Text>Широта: {this.state.latitude}</Text>
        <Text>Долгота: {this.state.longitude}</Text>
        <Text>Адрес: {this.state.address}</Text>
        <Text>Погода: {this.state.forecast}</Text>

      </View>
    );
  }
}

export default CurrentPosition;  
