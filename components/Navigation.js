import React from 'react';  
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import CurrentPosition from "./Position";
import TableBlock from "./Table";

const Tab = createMaterialTopTabNavigator();

const MyTabs=()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={CurrentPosition} />
      <Tab.Screen name="Tab2" component={TableBlock} />
    </Tab.Navigator>
  );
}

export default MyTabs;