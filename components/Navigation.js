import React from 'react';  
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import CurrentPosition from "./Position";
import Media from "./Media";

const Tab = createMaterialTopTabNavigator();

const MyTabs=()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={CurrentPosition} />
      <Tab.Screen name="Tab2" component={Media} />
    </Tab.Navigator>
  );
}

export default MyTabs;