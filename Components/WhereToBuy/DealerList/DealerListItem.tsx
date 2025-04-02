// // import { MapPin } from "lucide-react-native";
// // import React from "react";
// // import { Pressable, Text, View } from "react-native";
// // import { dealer } from "../Interfaces/Interface";


// // export interface DealerListItem {
// //     id: number,
// //     dealer: dealer,
// //     scaleAll: number
// //     onPressDealer?: ({
// //         id,
// //         dealer
// //     }: onPressDealerProps) => any
// // }

// // export interface onPressDealerProps {id: number, dealer: dealer}

// // export interface handleDealerListItem {
// //     selected: () => any
// // }

// // const DealerListItem: React.FC<DealerListItem> = React.forwardRef<handleDealerListItem, DealerListItem>(({
// //     id, dealer, scaleAll, onPressDealer
// // }, ref) => {




// //     return(
// //         <Pressable 
// //             onPress={() => {if(onPressDealer) onPressDealer(
// //                 {
// //                     dealer: dealer,
// //                     id: id
// //                 }
// //             )}}
// //         key={id} style={{
// //             paddingVertical: 12,
// //             paddingHorizontal: 16,
// //             backgroundColor: '#fff',
// //             borderRadius: 10,
// //             marginBottom: 10,
// //             shadowColor: '#000',
// //             shadowOpacity: 0.1,
// //             shadowOffset: { width: 0, height: 2 },
// //             shadowRadius: 4,
// //             elevation: 3
// //         }}>
// //             <>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
// //                 <MapPin color={'#000'} size={20} />
// //                 <Text style={{ fontSize: 16 * scaleAll, fontWeight: 'bold', marginLeft: 8 }}>
// //                     {dealer.name}
// //                 </Text>
// //             </View>
// //             <Text style={{ fontSize: 14 * scaleAll, color: '#666' }}>{dealer.address}</Text>

// //             {dealer.phoneNumbers.length > 0 && (
// //                 <Text style={{ fontSize: 14 * scaleAll, color: '#007BFF', marginTop: 4 }}>
// //                     📞 {dealer.phoneNumbers.join(", ")}
// //                 </Text>
// //             )}

// //             {dealer.webSites.length > 0 && (
// //                 <Text style={{ fontSize: 14 * scaleAll, color: '#007BFF', marginTop: 4 }}>
// //                     🌐 {dealer.webSites.join(', ')}
// //                 </Text>
// //             )}

// //             {dealer.workTime.length > 0 && (
// //                 <Text style={{ fontSize: 12 * scaleAll, color: '#28a745', marginTop: 4 }}>
// //                     🕒 {dealer.workTime.join(" | ")}
// //                 </Text>
// //             )}
// //             </>
// //         </Pressable>
// //     )
// // })

// // export default DealerListItem

// import { MapPin } from "lucide-react-native";
// import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
// import { Pressable, Text, View } from "react-native";
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
// import { dealer } from "../Interfaces/Interface";
// import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
// import { Portal } from "react-native-alves-portal";
// import { useAppContext } from "../../Universal/API/Context-API/AppContext";

// export interface DealerListItem {
//     id: number;
//     dealer: dealer;
//     scaleAll: number;
//     onPressDealer?: ({ id, dealer }: onPressDealerProps) => any;
// }

// export interface onPressDealerProps {
//     id: number;
//     dealer: dealer;
//     position: { x: number; y: number; width: number; height: number };
// }

// export interface handleDealerListItem {
//     selected: () => void;
// }

// const DealerListItem: React.FC<DealerListItem> = React.forwardRef<handleDealerListItem, DealerListItem>(
//     ({ id, dealer, scaleAll, onPressDealer,  }, ref) => {
//         const backgroundColor = useSharedValue("#fff");

//         const { currentWidth, isMediumVersion, isTooBigVersion, isSmallVersion } = useAppContext()
//         // Define animated style
//         const animatedStyle = useAnimatedStyle(() => ({
//             backgroundColor: backgroundColor.value,
//         }));

//         // Function to revert background color after 5 seconds
//         const resetColor = () => {
//             backgroundColor.value = withTiming("#fff", { duration: 300 });
//         };

//         // Handle selection and auto-revert
//         const selectItem = () => {
//             backgroundColor.value = withTiming("#f0f8ff", { duration: 300 }); // Light blue when selected

//             // Revert back after 5 seconds
//             setTimeout(() => {
//                 runOnJS(resetColor)();
//             }, 5000);
//         };

//         // Expose selectItem via ref
//         useImperativeHandle(ref, () => ({
//             selected: selectItem,
//         }));

//         const [position, setPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

//         // Store position on mount
//         useEffect(() => {
//             if (!itemRef.current) return;

//             requestAnimationFrame(() => {
//                 itemRef.current?.measure((x, y, width, height, pageX, pageY) => {
//                     setPosition({ x: pageX, y: pageY, width, height });
//                 });
//             });
//         }, [currentWidth]);
//         const itemRef = useRef<View>(null);

//         return (

//             <Pressable
//                 onPress={() => {
//                     itemRef.current?.measureInWindow((x, y, width, height, ) => {
//                         setPosition({ x: x, y: y, width, height });

//                         if (onPressDealer && position) {
//                             onPressDealer({ dealer, id, position: { x: x, y: y, width, height } });
//                         }
//                     });

//                     selectItem(); // Trigger animation on press
//                 }}
//                 key={id}
//             >
//                 <Animated.View
//                     ref={itemRef}
//                     style={[
//                         {
//                             paddingVertical: 12,
//                             paddingHorizontal: 16,
//                             borderRadius: 10,
//                             marginBottom: 10,
//                             shadowColor: "#000",
//                             shadowOpacity: 0.1,
//                             shadowOffset: { width: 0, height: 2 },
//                             shadowRadius: 4,
//                             elevation: 3,
//                         },
//                         animatedStyle,
//                     ]}
//                 >
//                     <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
//                         <MapPin color={"#000"} size={20} />
//                         <Text style={{ fontSize: 16 * scaleAll, fontWeight: "bold", marginLeft: 8 }}>
//                             {dealer.name}
//                         </Text>
//                     </View>
//                     <Text style={{ fontSize: 14 * scaleAll, color: "#666" }}>{dealer.address}</Text>

//                     {dealer.phoneNumbers.length > 0 && (
//                         <Text style={{ fontSize: 14 * scaleAll, color: "#007BFF", marginTop: 4 }}>
//                             📞 {dealer.phoneNumbers.join(", ")}
//                         </Text>
//                     )}

//                     {dealer.webSites.length > 0 && (
//                         <Text style={{ fontSize: 14 * scaleAll, color: "#007BFF", marginTop: 4 }}>
//                             🌐 {dealer.webSites.join(", ")}
//                         </Text>
//                     )}

//                     {dealer.workTime.length > 0 && (
//                         <Text style={{ fontSize: 12 * scaleAll, color: "#28a745", marginTop: 4 }}>
//                             🕒 {dealer.workTime.join(" | ")}
//                         </Text>
//                     )}
//                 </Animated.View>
//             </Pressable>
//         );
//     }
// );

// export default DealerListItem;


import { MapPin } from "lucide-react-native";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { dealer } from "../Interfaces/Interface";
import { useAppContext } from "../../Universal/API/Context-API/AppContext";

export interface DealerListItem {
    id: number;
    dealer: dealer;
    scaleAll: number;
    onPressDealer?: ({ id, dealer, position }: onPressDealerProps) => any;
}

export interface onPressDealerProps {
    id?: number;
    dealer: dealer;
    position: { x: number; y: number; width: number; height: number };
}

export interface handleDealerListItem {
    selected: () => void;
}

const DealerListItem: React.FC<DealerListItem> = React.forwardRef<handleDealerListItem, DealerListItem>(
    ({ id, dealer, scaleAll, onPressDealer }, ref) => {
        const backgroundColor = useSharedValue("#fff");
        const { currentWidth, isSmallVersion, isMediumVersion, isTooBigVersion } = useAppContext();

        // **Mobile Adaptation Scaling**
        const textScale = scaleAll * (isSmallVersion ? 0.9 : isTooBigVersion ? 1.1 : 1);
        const paddingScale = isSmallVersion ? 0.85 : isTooBigVersion ? 1.15 : 1;
        const iconSize = 20 * textScale;
        const touchableMinHeight = isSmallVersion ? 50 : 60; // Ensure tap area is large on small screens

        // **Animated Style**
        const animatedStyle = useAnimatedStyle(() => ({
            backgroundColor: backgroundColor.value,
        }));

        const resetColor = () => {
            backgroundColor.value = withTiming("#fff", { duration: 300 });
        };

        const selectItem = () => {
            backgroundColor.value = withTiming("#f0f8ff", { duration: 300 });
            setTimeout(() => {
                runOnJS(resetColor)();
            }, 5000);
        };

        useImperativeHandle(ref, () => ({
            selected: selectItem,
        }));

        const [position, setPosition] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
        const itemRef = useRef<View>(null);

     

        return (
            <Pressable
                onPress={() => {
                    itemRef.current?.measureInWindow((x, y, width, height) => {
                        setPosition({ x, y, width, height });

                        if (onPressDealer && position) {
                            onPressDealer({ dealer, id, position: { x, y, width, height } });
                        }
                    });

                    selectItem();
                }}
                key={id}
                style={{ minHeight: touchableMinHeight }} // Ensure better tap area
            >
                <Animated.View
                    ref={itemRef}
                    style={[
                        {
                            paddingVertical: 12 * paddingScale,
                            paddingHorizontal: 16 * paddingScale,
                            borderRadius: 10,
                            marginBottom: 10 * paddingScale,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 4,
                            elevation: 3,
                        },
                        animatedStyle,
                    ]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 * paddingScale }}>
                        <MapPin color={"#000"} size={iconSize} />
                        <Text style={{ fontSize: 16 * textScale, fontWeight: "bold", marginLeft: 8 * paddingScale }}>
                            {dealer.name}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14 * textScale, color: "#666" }}>{dealer.address}</Text>

                    {dealer.phoneNumbers.length > 0 && (
                        <Text style={{ fontSize: 14 * textScale, color: "#007BFF", marginTop: 4 * paddingScale }}>
                            📞 {dealer.phoneNumbers.join(", ")}
                        </Text>
                    )}

                    {dealer.webSites.length > 0 && (
                        <Text style={{ fontSize: 14 * textScale, color: "#007BFF", marginTop: 4 * paddingScale }}>
                            🌐 {dealer.webSites.join(", ")}
                        </Text>
                    )}

                    {dealer.workTime.length > 0 && (
                        <Text style={{ fontSize: 12 * textScale, color: "#28a745", marginTop: 4 * paddingScale }}>
                            🕒 {dealer.workTime.join(" | ")}
                        </Text>
                    )}
                </Animated.View>
            </Pressable>
        );
    }
);

export default React.memo(DealerListItem);
