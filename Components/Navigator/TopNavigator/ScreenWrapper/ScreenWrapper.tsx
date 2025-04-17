import React from "react";
import {useWindowDimensions} from 'react-native';
import { Box, ScrollView, View} from "native-base";
import { heightOfTopNav } from "../TopNavigator";
import { useAppContext } from "../../../Universal/API/Context-API/AppContext";


const ScreenWrapper: React.FC<any> = ({ children,  route }) => {    
    console.log("ScreenWrapper route params:", route?.params);
    const {isSmallVersion} = useAppContext();
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    
    
    return (
        <Box
            // safeArea={true}
            style={{
                position: 'relative',
                // flex: 1,  // Full height
                paddingTop: heightOfTopNav(isSmallVersion),
                height: (windowHeight) ? windowHeight  : '100vh', 
                
                width: windowWidth ?? '100vw',

                // ensure parity between rn.web and rn.native regarding requiring a scrollview in order to have scrolling
                overflow: 'hidden',
                backgroundColor: 'white' //"#F9F9F9",
            }}
        >   
            
            <ScrollView

                scrollEnabled={route.name != 'Brands'}
                nestedScrollEnabled={true}
                contentContainerStyle={{ 
                    // flexGrow: 1,  // Ensure ScrollView content stretches
                    flex: 1,
                    
                    height: windowHeight// - 40 - 30,  // Prevent extra space in ScrollView
                }}
                // showsVerticalScrollIndicator={false}
                bounces={false}  // Optional: disable bouncing effect
            >
              
                {children}
            </ScrollView>            
            {/* <Footer /> */}
        </Box>
    );
};

export default React.memo(ScreenWrapper)

