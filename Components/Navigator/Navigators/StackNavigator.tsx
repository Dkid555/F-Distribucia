import React from "react";
import { NavigatorProps } from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import TopNavigator from "../TopNavigator/TopNavigator";
import { optionsFunction } from "../Navigator";
import ScreenWrapper from "../TopNavigator/ScreenWrapper/ScreenWrapper";
import HomeScreen from "../../HomeScreen/HomeScreen";
import Warehouse from "../../Warehouse/Warehouse";
import Brands from "../../Brands/Brands";
import WhereToBuy from "../../WhereToBuy/WhereToBuy";
import Contacts from "../../Contacts/Contacts";



const Stack = createStackNavigator();



const StackNavigator: React.FC<NavigatorProps> = ({navigationRef, refSlideOutMenu}) => {


    return (
        <Stack.Navigator
        screenOptions={{
          header: (props) => <TopNavigator {...props} navigation={navigationRef} optionButtons={optionsFunction({ navigation: navigationRef, variant: 'top' })} refSlideOutMenu={refSlideOutMenu} />,

        }}
      >
        <Stack.Screen
          name="Home"
          options={{ animationEnabled: false }}
        >
          {(props) => (
            <ScreenWrapper {...props}>
              <HomeScreen {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Warehouse"
          options={{ animationEnabled: false }}
        >
          {(props) => (
            <ScreenWrapper {...props}>
              <Warehouse {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Brands"
          options={{ animationEnabled: false }}
        >
          {(props) => (
            <ScreenWrapper {...props}>
              <Brands {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>

        <Stack.Screen
          name='WhereToBuy'
          options={{ animationEnabled: false, }}
        >
          {(props) => (
            <ScreenWrapper {...props}>
              <WhereToBuy {...props} />
            </ScreenWrapper>
          )}

        </Stack.Screen>

        <Stack.Screen
          name='Contacts'
          options={{ animationEnabled: false, }}
        >
          {(props) => (
            <ScreenWrapper {...props}>
              <Contacts {...props} />
            </ScreenWrapper>
          )}

        </Stack.Screen>
      </Stack.Navigator>
    )
} 

export default React.memo(StackNavigator)