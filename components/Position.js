import React, { Component } from "react";
import { View, Text } from "react-native";

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
      address: null
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

          var addressComponent = json.results[0].address_components;

          this.setState({
            address: addressComponent
          });

          console.log(addressComponent);
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
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
      </View>
    );
  }
}

export default CurrentPosition;