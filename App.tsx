import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppProvider from './Components/Universal/API/Context-API/AppProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
// import { Pressable } from 'react-native-web';

import Navigator from './Components/Navigator/Navigator';

import { PortalProvider } from 'react-native-alves-portal';

import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { DefaultTheme, PaperProvider, Provider } from 'react-native-paper';


import { MenuProvider } from 'react-native-popup-menu';
import { APIProvider } from './Components/Universal/API/API';

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      text: 'black'
  }
};

const App: React.FC = () => {
  return (
    <MenuProvider> {/* 👈 Ensure MenuProvider is wrapping everything */}
      <PortalProvider>  
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppProvider>
            <APIProvider>
            <NativeBaseProvider>
              <SafeAreaProvider>
                <BottomSheetModalProvider>
                  <PaperProvider theme={theme}>
                    <View style={{ flex: 1 }}>
                      <Animated.View style={{ flex: 1 }}>
                        <Navigator />
                      </Animated.View>
                    </View>
                  </PaperProvider>
                </BottomSheetModalProvider>
              </SafeAreaProvider>
            </NativeBaseProvider>
            </APIProvider>
          </AppProvider>
        </GestureHandlerRootView>
      </PortalProvider>
    </MenuProvider>
  );
};

export default App;

