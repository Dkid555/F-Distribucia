// import React, { useEffect, useImperativeHandle, useState } from "react"
// import { useAppContext } from "../../../Universal/API/Context-API/AppContext"
// import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
// import {  Pressable, StyleSheet, Text, View } from "react-native"
// import { PressableWrap } from "../../../Universal/Buttons/PressableColorWrap/PressableColorWrap"
// import { CloseIcon } from "native-base"
// import { LeftSideButton } from "../Buttons/LeftSideButton"
// export interface hanldeSlideOutMenu {
//     setDoAnimation: (x: boolean) => any 
//     getEnabled: () => boolean
// }
// export interface option{
//     text: string,
//     onPress: () => any
// }
// export interface SlideOutMenuProps {
//     options: option[]
// }

// const SlideOutMenu:React.FC<SlideOutMenuProps> = React.forwardRef<hanldeSlideOutMenu,SlideOutMenuProps> (({options}, ref) => {
//     const {currentHeight, currentWidth, scaleAll} = useAppContext()

//     const translateX =  useSharedValue(-currentWidth/2);

//     const opacity = useSharedValue(0)
//     const animatedStyle = useAnimatedStyle(
//         () => ({
//             transform: [{translateX: translateX.value}]
//         })
//     )

//     const animatedStyleopacity = useAnimatedStyle(
//         () => ({
//             opacity: opacity.value
//         })
//     )

//     useEffect(() => {
//         // cancelAnimation(translateX)
//         // translateX.value = -currentWidth/2

//         setDoAnimation(false)
//     },[currentWidth])

//     const [doAnimation, setDoAnimation] = useState(false)

//     useImperativeHandle(ref, () => ({
//         setDoAnimation,
//         getEnabled: () => doAnimation
//     }))

//     const [Enabled, setEnable] = useState(false)

//     useEffect(() => {
//         if(doAnimation){
//             setEnable(true)
//             translateX.value = withTiming(0, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease)
//             })
//             opacity.value = withTiming(1, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease)
//             })
//         }else {
//             cancelAnimation(translateX)
//             cancelAnimation(opacity)
//             translateX.value = withTiming(-currentWidth/2, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease)
                
//             }, () => {
//                 runOnJS(setEnable)(false)
//             })
//             opacity.value = withTiming(0, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease)
//             })
//         }
        
//     },[doAnimation])
//     const [closeColor, setCloseColor] = useState('black')
//     return (
//         Enabled && 
//             <View style = {[StyleSheet.absoluteFill, {zIndex: 1000000}]}>
//                 <Animated.View style = {[StyleSheet.absoluteFill,{backgroundColor: 'rgba(0,0,0,0.3)'}, animatedStyleopacity]} >
//                     <Pressable  style = {{flex: 1}} onPress = {() => {
//                         setDoAnimation(false)
//                     }}/>
//                 </Animated.View>
//                 <Animated.View  style = {[{backgroundColor: '#F9F9F9',  width: currentWidth / 2, height: currentHeight}, animatedStyle]}>
//                 <View>
//                     <PressableWrap onPress={() => {
//                         setDoAnimation(false)
//                     }}style={{alignSelf: 'flex-end'}} setColor={setCloseColor}>
//                         <View style = {{marginVertical: 30, marginRight: 20 * scaleAll, }}>
//                             <CloseIcon color={closeColor}/>
//                         </View>
//                     </PressableWrap>
//                     {options && options.map(option => {
//                         return (<LeftSideButton scaleAll={scaleAll} text={option.text}/>)
//                     }) }
//                     </View>
//                 </Animated.View>
//             </View>
        
//     )
// })


// export default SlideOutMenu


// import React, { useEffect, useImperativeHandle, useState } from "react";
// import { useAppContext } from "../../../Universal/API/Context-API/AppContext";
// import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { PressableWrap } from "../../../Universal/Buttons/PressableColorWrap/PressableColorWrap";
// import { CloseIcon, ScrollView } from "native-base";
// import { LeftSideButton } from "../Buttons/LeftSideButton";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";

// export interface hanldeSlideOutMenu {
//     setDoAnimation: (x: boolean) => any;
//     getEnabled: () => boolean;
// }
// export interface option {
//     text: string;
//     onPress: () => any;
//     onHoverIn: () => any,
//     onHoverOut: () => any
// }
// export interface SlideOutMenuProps {
//     options: option[];
// }

// const SlideOutMenu: React.FC<SlideOutMenuProps> = React.forwardRef<hanldeSlideOutMenu, SlideOutMenuProps>(({ options }, ref) => {
//     const { currentHeight, currentWidth, scaleAll, isWeb, setLeftSlideOut } = useAppContext();

   
//     const translateX = useSharedValue(-currentWidth / 2);
//     const opacity = useSharedValue(0);

//     const animatedStyle = useAnimatedStyle(() => ({
//         transform: [{ translateX: translateX.value }],
//     }));

//     const animatedStyleOpacity = useAnimatedStyle(() => ({
//         opacity: opacity.value,
//     }));

//     useEffect(() => {
//         setDoAnimation(false);
//     }, [currentWidth]);

//     const [doAnimation, setDoAnimation] = useState(false);

//     useImperativeHandle(ref, () => ({
//         setDoAnimation,
//         getEnabled: () => doAnimation,
//     }));

//     const [enabled, setEnabled] = useState(false);

//     useEffect(() => {
//         setLeftSlideOut(doAnimation)
//         if (doAnimation) {
//             setEnabled(true);
//             translateX.value = withTiming(0, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease),
//             });
//             opacity.value = withTiming(1, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease),
//             });
//         } else {
//             if(!isWeb){
//                 cancelAnimation(translateX);
//                 cancelAnimation(opacity);
//             }
//             translateX.value = withTiming(-currentWidth / 2, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease),
//             }, () => {
//                 runOnJS(setEnabled)(false);
//             });
//             opacity.value = withTiming(0, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease),
//             });
//         }
//     }, [doAnimation]);

//     const [closeColor, setCloseColor] = useState("black");

//     const panGesture = Gesture.Pan()
//         .onUpdate((event) => {
//             if (event.translationX < 0) {
//                 translateX.value = event.translationX;
//             }
//         })
//         .onEnd((event) => {
//             if (event.translationX < -50) {
//                 setDoAnimation(false);
//             } else {
//                 translateX.value = withTiming(0, {
//                     duration: 200,
//                     easing: Easing.out(Easing.ease),
//                 });
//             }
//         });

//     return (
//         enabled && (
//             <View style={[StyleSheet.absoluteFill, { zIndex: 1000000 }]}>
//                 <Animated.View
//                     style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.3)" }, animatedStyleOpacity]}
//                 >
//                     <Pressable
//                         style={{ flex: 1 }}
//                         onPress={() => {
//                             setDoAnimation(false);
//                         }}
//                     />
//                 </Animated.View>
//                 <GestureDetector gesture={panGesture}>
//                     <Animated.View
//                         style={[{ backgroundColor: "#F9F9F9", maxWidth: currentWidth / 2.2, height: currentHeight }, animatedStyle]}
//                     >
//                         <View>
//                             <PressableWrap
//                                 onPress={() => {
//                                     setDoAnimation(false);
//                                 }}
//                                 style={{ alignSelf: "flex-end",}}
//                                 setColor={setCloseColor}
                                
//                             >
//                                 <View style={{ marginVertical: 30, marginRight: 20 * scaleAll }}>
//                                     <CloseIcon color={closeColor}  />
//                                 </View>
//                             </PressableWrap>
//                             <ScrollView style={{height: currentHeight -60 - 30 }} showsVerticalScrollIndicator = {false}>
//                             {options &&
//                                 options.map((option, index) => (
//                                     <LeftSideButton key={index} scaleAll={scaleAll} text={option.text} onPress={() => {
//                                         option.onPress()
//                                     }}/>
//                                 ))}
//                             </ScrollView>
//                         </View>
//                     </Animated.View>
//                 </GestureDetector>
//             </View>
//         )
//     );
// });

// export default SlideOutMenu;


import React, { useEffect, useImperativeHandle, useState } from "react";
import { useAppContext } from "../../../Universal/API/Context-API/AppContext";
import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Pressable, StyleSheet, View } from "react-native";
import { PressableWrap } from "../../../Universal/Buttons/PressableColorWrap/PressableColorWrap";
import { CloseIcon, ScrollView } from "native-base";
import { LeftSideButton } from "../Buttons/LeftSideButton";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export interface hanldeSlideOutMenu {
    setDoAnimation: (x: boolean) => any;
    getEnabled: () => boolean;
}
export interface option {
    text: string;
    onPress: () => any;
    onHoverIn?: () => any;
    onHoverOut?: () => any;
}
export interface SlideOutMenuProps {
    options: option[];
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = React.forwardRef<hanldeSlideOutMenu, SlideOutMenuProps>(({ options }, ref) => {
    const { currentHeight, currentWidth, scaleAll, isWeb, setLeftSlideOut } = useAppContext();
    
    // Adjust menu width based on screen size
    const menuWidth = currentWidth > 800 ? currentWidth * 0.35 : currentWidth * 0.5;
    
    const translateX = useSharedValue(-menuWidth);
    const opacity = useSharedValue(0);
    const [doAnimation, setDoAnimation] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [closeColor, setCloseColor] = useState("black");

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedStyleOpacity = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    useEffect(() => {
        setDoAnimation(false);
    }, [currentWidth]);

    useImperativeHandle(ref, () => ({
        setDoAnimation,
        getEnabled: () => doAnimation,
    }));


    const duration = 350
    useEffect(() => {
        setLeftSlideOut(doAnimation);
        if (doAnimation) {
            setEnabled(true);
            translateX.value = withTiming(0, { duration: duration, easing: Easing.inOut(Easing.ease) });
            opacity.value = withTiming(1, { duration: duration, easing: Easing.inOut(Easing.ease) });
        } else {
            if (!isWeb) {
                cancelAnimation(translateX);
                cancelAnimation(opacity);
            }
            translateX.value = withTiming(-menuWidth, { duration: duration, easing: Easing.inOut(Easing.ease) }, () => {
                runOnJS(setEnabled)(false);
            });
            opacity.value = withTiming(0, { duration: duration, easing: Easing.inOut(Easing.ease) });
        }
    }, [doAnimation]);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        })
        .onEnd((event) => {
            if (event.translationX < -50) {
                setDoAnimation(false);
            } else {
                translateX.value = withTiming(0, { duration: duration, easing: Easing.out(Easing.ease) });
            }
        });

    return (
        enabled && (
            <View style={[StyleSheet.absoluteFill, { zIndex: 1000000 }]}>
                {/* Background Overlay */}
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.3)" }, animatedStyleOpacity]}
                >
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={() => setDoAnimation(false)}
                    />
                </Animated.View>

                {/* Slide Menu */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={[{
                            backgroundColor: "#F9F9F9",
                            width: menuWidth,
                            height: currentHeight,
                            paddingHorizontal: 10,
                        }, animatedStyle]}
                    >
                        <View>
                            {/* Close Button */}
                            <PressableWrap
                                onPress={() => setDoAnimation(false)}
                                style={{ alignSelf: "flex-end" }}
                                setColor={setCloseColor}
                            >
                                <View style={{ marginVertical: 30, marginRight: 20 * scaleAll }}>
                                    <CloseIcon color={closeColor} />
                                </View>
                            </PressableWrap>

                            {/* Options List */}
                            <ScrollView style={{ height: currentHeight - 90 }} showsVerticalScrollIndicator={false}>
                                {options.map((option, index) => (
                                    <LeftSideButton key={index} text={option.text} onPress={() => {
                                        setDoAnimation(false)
                                        option.onPress()
                                    }} />
                                ))}
                            </ScrollView>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        )
    );
});

export default React.memo(SlideOutMenu);
