// import React, { useEffect, useState } from "react";
// import { Image, View, ViewStyle } from "react-native";
// import { useAppContext } from "../../Universal/API/Context-API/AppContext";
// import FastImage from "react-native-fast-image";
// import { Button, Pressable, Text } from "native-base";
// import { webFont } from "../../Universal/API/API";
// import { AutoHeighImage, AutoWidthImage } from "../../Universal/Image/AutoWidthImage";
// import {  KKpolData } from "../../Universal/API/Context-API/AppProvider";


// export interface UnitProps {
//     unit : {
//         url: string
//         description: string
//         price: string | number
//         unit:  KKpolData
//     }
//     onPress?: () => any
// }


// const Unit: React.FC<UnitProps> = ({unit, onPress}) => {
//     const {isSmallVersion, isMediumVersion, scaleAll} = useAppContext()

//     const [isOnHover, setIsOnHover] = useState(false)

//     const shadowProps = {
//         shadowColor: 'black',
//         shadowOffset: {height: 0.3, width: 0.3},
//         shadowOpacity: 0.3,
//         shadowRadius: 10
//     } as ViewStyle
//     return (
//         <Pressable style={{
//             width: (isMediumVersion ?  '50%' : 
//                 (//isMediumVersion ? '33.3%' :  
//                     '25%')), //(isSmallVersion ? 230 : 440 ) * scaleAll,
//         }}  onPress={onPress}
//         onHoverIn={() => {setIsOnHover(true)}}
//         onHoverOut={() => {setIsOnHover(false)}}>
//         <View
       
//         style = {[{
//             backgroundColor: 'transparent',
//             width: '100%',
//             height: isSmallVersion ? 240 * scaleAll:400*scaleAll,
//             paddingTop: (isSmallVersion ? 15 : 42) * scaleAll,
//             paddingHorizontal: (isSmallVersion ? 10 : 79) * scaleAll,
//             paddingBottom: (isSmallVersion ? 15 : 65) * scaleAll,
//             borderWidth: 0.5,
//             borderColor: '#D9D9D9'
//         }, isOnHover ? shadowProps : {}]} pointerEvents="none">
//             {/* <FastImage
//                 source={{
//                     uri: unit.url
//                 }}
                
//                 style={
//                     {
//                         height: 193 * scaleAll,
//                         width: 'auto'
//                     }
//                 }
//             /> */}

//             {isSmallVersion ?
//             <AutoWidthImage source={{uri: unit.url}} scaleAll={scaleAll} height = {(isSmallVersion ?  100: 193) * scaleAll }/>
//             : <AutoWidthImage source={{uri: unit.url}} scaleAll={scaleAll} height = {(isSmallVersion ?  100: 193) * scaleAll }/>}
            
//             {/* <View style ={{flex: 1, flexDirection: 'column-reverse', backgroundColor: 'red'}}> */}
//                 <View style = {{flexDirection: 'column', flex: 1, justifyContent: 'space-between',}}>
//                     <Text style = {{
//                         // marginTop: (isSmallVersion ? 20 : 51) * scaleAll,
//                         width: '100%',
//                         textAlign: 'center',
//                         fontFamily: webFont('Inter'),
//                         fontWeight: '600',
//                         fontSize: (isSmallVersion ? 14 :20) * scaleAll,
//                         color: 'black'
//                     }}  noOfLines={3}>
//                         {unit.description}
//                     </Text>

//                     <Text style = {{
//                         // marginTop: (isSmallVersion ? 28 : 66) * scaleAll,
//                         width: '100%',
//                         textAlign: 'center',
//                         fontFamily: webFont('Inter'),
//                         fontWeight: '600',
//                         fontSize:  (isSmallVersion ? 14  :20) * scaleAll,
//                         color: 'black'
//                     }}>
//                         {unit.price}
//                     </Text>
//             </View>
//             {/* </View> */}

//         </View>
//         </Pressable>
        
//     )
// }

// export default Unit

// import React, { useState } from "react";
// import { View, ViewStyle } from "react-native";
// import { useAppContext } from "../../Universal/API/Context-API/AppContext";
// import { Pressable, Text } from "native-base";
// import { webFont } from "../../Universal/API/API";
// import { AutoWidthImage } from "../../Universal/Image/AutoWidthImage";
// import { KKpolData } from "../../Universal/API/Context-API/AppProvider";

// export interface UnitProps {
//     unit: {
//         url: string;
//         description: string;
//         price: string | number;
//         unit: KKpolData;
//     };
//     onPress?: () => any;
// }

// const Unit: React.FC<UnitProps> = ({ unit, onPress }) => {
//     const { isSmallVersion, isMediumVersion, scaleAll } = useAppContext();
//     const [isOnHover, setIsOnHover] = useState(false);

//     const shadowProps: ViewStyle = {
//         shadowColor: 'black',
//         shadowOffset: { height: 0.3, width: 0.3 },
//         shadowOpacity: 0.3,
//         shadowRadius: 10
//     };

//     const getWidth = () => {
//         if (isSmallVersion) return '100%';
//         if (isMediumVersion) return '50%';
//         return '33.3%';
//     };

//     return (
//         <Pressable
//             width={getWidth()}
//             onPress={onPress}
//             onHoverIn={() => setIsOnHover(true)}
//             onHoverOut={() => setIsOnHover(false)}
//         >
//             <View
//                 style={[{
//                     backgroundColor: 'transparent',
//                     width: '100%',
//                     height: isSmallVersion ? 220 * scaleAll : isMediumVersion ? 320 * scaleAll : 400 * scaleAll,
//                     paddingTop: (isSmallVersion ? 12 : isMediumVersion ? 30 : 42) * scaleAll,
//                     paddingHorizontal: (isSmallVersion ? 8 : isMediumVersion ? 40 : 79) * scaleAll,
//                     paddingBottom: (isSmallVersion ? 12 : isMediumVersion ? 50 : 65) * scaleAll,
//                     borderWidth: 0.5,
//                     borderColor: '#D9D9D9'
//                 }, isOnHover ? shadowProps : {}]}
//                 pointerEvents="none"
//             >
//                 <AutoWidthImage 
//                     source={{ uri: unit.url }} 
//                     scaleAll={scaleAll} 
//                     height={(isSmallVersion ? 90 : isMediumVersion ? 140 : 193) * scaleAll} 
//                 />
//                 <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
//                     <Text
//                         textAlign="center"
//                         fontFamily={webFont('Inter')}
//                         fontWeight="600"
//                         fontSize={(isSmallVersion ? 12 : isMediumVersion ? 16 : 20) * scaleAll}
//                         color="black"
//                         noOfLines={3}
//                     >
//                         {unit.description}
//                     </Text>
//                     <Text
//                         textAlign="center"
//                         fontFamily={webFont('Inter')}
//                         fontWeight="600"
//                         fontSize={(isSmallVersion ? 12 : isMediumVersion ? 16 : 20) * scaleAll}
//                         color="black"
//                     >
//                         {unit.price}
//                     </Text>
//                 </View>
//             </View>
//         </Pressable>
//     );
// };

// export default Unit;


import React, { useState } from "react";
import { useAppContext } from "../../Universal/API/Context-API/AppContext";
import { Pressable, VStack, Text, Box, View } from "native-base";
import { webFont } from "../../Universal/API/API";
import { AutoWidthImage } from "../../Universal/Image/AutoWidthImage";
import { KKpolData } from "../../Universal/API/Context-API/AppProvider";
import { ViewStyle } from "react-native";
import OstatkiDisplay from "../../UnitFull/OstatkiDisplay/OstatkiDisplay";

export const shadowPropsUnit: ViewStyle = {
    shadowColor: 'black',
    shadowOffset: { height: 1/2, width: 5/3 },
    shadowOpacity: 0.3,
    shadowRadius: 14
};
export interface UnitProps {
    unit: {
        url: string;
        description: string;
        price: string | number;
        unit: KKpolData;
    };
    onPress?: () => any;
}

const Unit: React.FC<UnitProps> = ({ unit, onPress }) => {
    const { isSmallVersion, isMediumVersion, scaleAll } = useAppContext();
    const [isOnHover, setIsOnHover] = useState(false);

    const getWidth = () => {
        if (isSmallVersion) return '50%';
        if (isMediumVersion) return '33.3%';
        return '25%';
    };

   
    return (
        <Pressable
            width={getWidth()}
            onPress={onPress}
            onHoverIn={() => setIsOnHover(true)}
            onHoverOut={() => setIsOnHover(false)}
        >
            <Box style={{position: 'absolute', zIndex: 1000, right: 10, top: 10}}>
                <OstatkiDisplay compact={true} scaleAll={scaleAll} ostatki={unit['unit']['ostatki']}/>
            </Box>
            <Box
                bg="white"
                width="100%"
                height={isSmallVersion ? 220 * scaleAll : isMediumVersion ? 320 * scaleAll : 400 * scaleAll}
                px={isSmallVersion ? 2 : isMediumVersion ? 5 : 8}
                py={isSmallVersion ? 3 : isMediumVersion ? 6 : 8}
                borderWidth={0.5}
                borderColor="gray.300"
                // shadow={isOnHover ? 7 : 0}
                style={[isOnHover ? shadowPropsUnit : {}]}
                alignItems="center"
                justifyContent="center"
            >
                 <View style = {{width: '100%', overflow: 'hidden', }}>
                    <AutoWidthImage 
                        source={{
                             uri: unit.url,
                             priority:'high'
                                
                            }} 
                        scaleAll={scaleAll} 
                        height={(isSmallVersion ? 90 : isMediumVersion ? 140 : 193) * scaleAll} 
                    />
                </View>
                <VStack flex={1} justifyContent="space-between" alignItems="center" mt={4}>
                    <Text
                        textAlign="center"
                        fontFamily={webFont('Inter')}
                        fontWeight="600"
                        maxWidth={'2/3'}
                        fontSize={(isSmallVersion ? 12 : isMediumVersion ? 14 : 16) * scaleAll}
                        color="black"
                        noOfLines={3}
                    >
                        {unit.description}
                    </Text>
                    <Text
                        textAlign="center"
                        fontFamily={webFont('Inter')}
                        fontWeight="600"
                        fontSize={(isSmallVersion ? 12 : isMediumVersion ? 14 : 16) * scaleAll}
                        color="black"
                        mt={2}
                    >
                        {unit.price}
                    </Text>
                </VStack>
            </Box>
        </Pressable>
    );
};

export default Unit;