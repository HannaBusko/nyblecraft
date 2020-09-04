import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyAnYsY86_y6XONni38aVCoKty8ehA7icF4");

class CurrentPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      address: null,
      forecast: null
    };;
  }

  componentDidMount() {
    Geolocation.getCurrentPosition((position) => {
      {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
          console.log(json);
          this.setState({
            address: json.results[0].formatted_address
          });
        })
        let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=4bb26d063345b0b5f4a3ae9fa9e5c78c' + '&units=metric&lang=ru';
        fetch(url)
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log(data);
            let weather = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1);
            this.setState(
              {
                forecast: weather + ". Температура воздуха: "+ data.main.temp + " C." 
              });
          })
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
