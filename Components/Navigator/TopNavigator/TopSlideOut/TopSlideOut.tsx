// import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
// import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
// import { useAppContext } from "../../../Universal/API/Context-API/AppContext";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { Pressable, View } from "native-base";
// import { StyleSheet } from "react-native";
// import { hanldeSlideOutMenu } from "../SlideOutMenu/SlideOutMenu";
// import { debounce } from "lodash";
// import { sleep } from "../../../Universal/API/API";




// interface TopSlideOutProps {
//     children?: any,
//     height?: number
// }

// export interface handleTopSlideOut extends hanldeSlideOutMenu {
//     isHovered: boolean
// }

// const TopSlideOut = React.forwardRef<handleTopSlideOut, TopSlideOutProps>(({ children, height = 300 }, ref) => {
//     const { currentHeight, currentWidth, isWeb } = useAppContext();

//     const translateY = useSharedValue(-300);
//     const opacity = useSharedValue(0);

//     const animatedStyle = useAnimatedStyle(() => ({
//         transform: [{ translateY: translateY.value }],
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
//         isHovered: isHovered
//     }));

//     const [enabled, setEnabled] = useState(false);

//     const [queueOfAnimation, setQueue] = useState<any[]>([])

//     const debouceAnimation = debounce(async (doAnimation: boolean) => {
//         if (doAnimation) {
//             setEnabled(true);
            
//             cancelAnimation(translateY);
//             cancelAnimation(opacity);
            
//             await sleep(100)
//             translateY.value = withTiming(0, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease),
//             });
//             opacity.value = withTiming(1, {
//                 duration: 300,
//                 easing: Easing.inOut(Easing.ease),
//             });
            
//         } else {
//             console.log('cancel')
            
//             cancelAnimation(translateY);
//             cancelAnimation(opacity);
            
                
//             await sleep(100)
//             translateY.value = withTiming(-300, {
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
//     }, 400, {
//         leading: true,
//         trailing: false
//     })
//     useEffect(() => {
//         if(refX.current){
//             refX.current = null
//         }
//         refX.current =  debouceAnimation(doAnimation)},
//     //    setQueue(prev => [...prev, debouceAnimation(doAnimation)])}, 
       
//        [doAnimation]);
    
//     const refX = useRef<any>(null)
//     useEffect(() => {
//         if(refX.current){
//             refX.current = null
//         }
//         if(queueOfAnimation.length> 0){
//             refX.current = queueOfAnimation.pop()
//         }
//     }, [queueOfAnimation])

//     const [isHovered, setHovered] = useState(false)




//     useEffect(() => {
//         if(!isHovered){
//             setDoAnimation(false)
//         }
//     }, [isHovered])
//     return (
//         enabled &&<Pressable style={[StyleSheet.absoluteFill, { zIndex: 1000000 }]} 
//         onHoverIn={() => {setHovered(true)}} 
//         onHoverOut={() => {setHovered(false)}}>
//             <Animated.View
//                 style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.3)" }, animatedStyleOpacity]}
//             >
//                 <Pressable
//                     style={{ flex: 1 }}
//                     onPress={() => {
//                         setDoAnimation(false);
//                     }}
//                 />
//             </Animated.View>
//             {/* <GestureDetector gesture={panGesture}> */}
//                 <Animated.View
//                     style={[{ backgroundColor: "#F9F9F9", width: '100%', height: height }, animatedStyle]}
//                 >
//                     {children}
//                 </Animated.View>
//             {/* </GestureDetector> */}
//         </Pressable>
//     )
// })


// export default TopSlideOut


import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAppContext } from "../../../Universal/API/Context-API/AppContext";
import { Pressable, View } from "native-base";
import { StyleSheet } from "react-native";
import { debounce } from "lodash";
import { sleep } from "../../../Universal/API/API";

interface TopSlideOutProps {
    children?: any;
    height?: number;
    onHoverOut: () => any
}

export interface handleTopSlideOut {
    isHovered: () =>  boolean;
    setDoAnimation: (val: boolean) => void;
    getEnabled: () => boolean;
}

const TopSlideOut = React.forwardRef<handleTopSlideOut, TopSlideOutProps>(({ onHoverOut,children, height = 300 }, ref) => {
    const { currentWidth, isSmallVersion, isMediumVersion } = useAppContext();
    
    const translateY = useSharedValue(-height);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const animatedStyleOpacity = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const [doAnimation, setDoAnimation] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [isHovered, setHovered] = useState(false);

    useImperativeHandle(ref, () => ({
        setDoAnimation: (x) => {
            debouncedAnimation(x)
        },
        getEnabled: () => doAnimation,
        isHovered: () => isHovered
    }));

    useEffect(() => {
        debouncedAnimation(false);
    }, [currentWidth]);

    const debouncedAnimation = 
        async (animate: boolean) => {
            cancelAnimation(translateY);
            cancelAnimation(opacity);

           
            if (animate) {
                console.log('starting', animate)
                setEnabled(true);
                await sleep(50);
                if(translateY.value != 0){
                    translateY.value = withTiming(0, {
                        duration: 300,
                        easing: Easing.inOut(Easing.ease),
                    });
                    opacity.value = withTiming(1, {
                        duration: 300,
                        easing: Easing.inOut(Easing.ease),
                    });
                }
                
            } else {
                await sleep(50);
                translateY.value = withTiming(-height, {
                    duration: 300,
                    easing: Easing.inOut(Easing.ease),
                }, () => {
                    runOnJS(setEnabled)(false);
                });
                opacity.value = withTiming(0, {
                    duration: 300,
                    easing: Easing.inOut(Easing.ease),
                });
            }
        }
    ;

    // useEffect(() => {
    //     debouncedAnimation(doAnimation);
    // }, [doAnimation]);

    // useEffect(() => {
    //     if (!isHovered) {
    //         // setTimeout()
    //         setDoAnimation(false);
    //     }
    // }, [isHovered]);

    return (
        (
             enabled && !isMediumVersion && !isSmallVersion && <Pressable
                style={[StyleSheet.absoluteFill, { zIndex: 1000000 }]}
                onHoverIn={() => setHovered(true)}
                onHoverOut={() => {if(onHoverOut)onHoverOut();setHovered(false); }}
            >
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.3)" }, animatedStyleOpacity]}
                >
                    <Pressable style={{ flex: 1 }} onPress={() => setDoAnimation(false)} />
                </Animated.View>
                <Animated.View style={[{ backgroundColor: "#F9F9F9", width: "100%", height }, animatedStyle]}>
                    {children}
                </Animated.View>
            </Pressable>
        )
    );
});

export default TopSlideOut;

