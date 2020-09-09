import React from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text,Button } from 'react-native';

import {
  Cell,
  Section,
  TableView,
} from 'react-native-tableview-simple';

const Stack = createStackNavigator();

const DetailsScreen = ({route, navigation })=> {
  const { data } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{data.date + " " + data.city + "(" + data.latitude + " " + data.longitude + ")"}</Text>
      <Text>{data.weather }</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

class TableScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      stateArray: []
    };;
  }

  componentDidMount() {
    try {
      const getLog = async () => {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        return !!jsonValue ? JSON.parse(jsonValue) : jsonValue;
      }
      getLog().then((stateArray) => {
        this.setState(
          {
            isReady: true,
            stateArray: stateArray
          });
      });
    }
    catch (e) {
      console.log(e);
    }

  }
  render() {
    return (
      
          <TableView style={{ flex: 1 }}>
            <Section>
              {
                !this.state.isReady ? 'Loading.....' : this.state.stateArray?.map((row, i) => (
                  //console.log(row)
                  <Cell
                    title={row.date + " " + row.city + "(" + row.latitude + " " + row.longitude + ")"}
                    key={i}
                    accessory="DisclosureIndicator"
                    onPress={() => this.props.navigation.navigate('Details',{
                      data: row 
                    })} />
                ))
              }
            </Section>
          </TableView>

    );
  }
}

function TableBlock() {
  return (
      <Stack.Navigator initialRouteName="Table">
        <Stack.Screen name="Table" component={TableScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
}

export default TableBlock;
