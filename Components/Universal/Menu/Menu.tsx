import { CircleX, Cross, MapPinned, Phone, PhoneOutgoing } from "lucide-react-native";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Text, Pressable, Dimensions, StyleSheet } from "react-native";
import { Portal } from "react-native-alves-portal";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import PressableWrapp from "../Buttons/PressableReact/PressableWrapp";
import { useAppContext } from "../API/Context-API/AppContext";
import { webFont } from "../API/API";
import Dash from "react-native-dash-2";

export interface MenuHandle {
    setMenuItems: (x: React.ReactElement<any>) => any,
    openMenu: ({x, y, width, height}:{x: number, y: number, width: number, height: number}) => void;
    closeMenu: () => void;
    setHeaderText: (x: string) => any
}


export interface MenuProps {
    enableHeader?: boolean,
    customHeader?: React.ReactElement<any>
}
const Menu = React.forwardRef<MenuHandle, MenuProps>(({
    enableHeader = true,
    customHeader
}, ref) => {
    const {currentHeight, currentWidth} = useAppContext()
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [renderKey, setRenderKey] = useState(0); // Force re-render
    const menuRef = useRef<View>(null);

    const [menuItems, setMenuItems] = useState(
       <></>
    )

    // Animation values
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(10);

    // Store pending position until menu is rendered
    const pendingPosition = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

    const closeMenu =  () => {
        opacity.value = withTiming(0, { duration: 150 }, () => {
            setVisible(false);
        });
        translateY.value = withTiming(10, { duration: 150 });
    }
    useImperativeHandle(ref, () => ({
        setMenuItems,
        openMenu: ({x, y, width, height}) => {
            console.log("Opening menu...");
            pendingPosition.current = { x, y, width, height };
            setRenderKey((prev) => prev + 1); // Update key to force re-render
            setVisible(true);
        },
        closeMenu: closeMenu,
        setHeaderText
    }));

    // Measure menu AFTER it becomes visible and has been rendered
    useEffect(() => {
        if (visible && pendingPosition.current && menuRef.current) {
            setTimeout(() => {
                menuRef.current?.measure((_fx, _fy, menuWidth, menuHeight) => {
                    const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
                    let { x, y, width, height } = pendingPosition.current!;

                    let newX = x - menuWidth - 10; // Default left
                    let newY = Math.max( y - menuHeight, 0)

                    console.log('newY', newY)

                    if (newX < 0) {
                        newX = x + width + 10; // Move right if no space
                    }
                    if (newX + menuWidth > screenWidth) {
                        newX = screenWidth - menuWidth - 10; // Prevent overflow
                    }
                    if (newY + menuHeight > screenHeight) {
                        newY = y - menuHeight - 100; // Move up if needed
                    }

                    setPosition({ x: newX, y: newY });

                    // Start animation
                    opacity.value = withTiming(1, { duration: 200 });
                    translateY.value = withTiming(0, { duration: 200 });
                });
            }, 0);
        }
    }, [renderKey]); // Depend on `renderKey` to ensure re-render before measuring

    // Animated style
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
        const handleOutsidePress = (event: any) => {
            console.log("Click detected"); // Debugging log
    
            if (!menuRef.current) return;
    
            menuRef.current.measure((x, y, width, height) => {
                console.log("Menu Position:", x, y, width, height);
                const { pageX, pageY } = event.nativeEvent;
                console.log("Touch Position:", pageX, pageY);
    
                const isInside =
                    pageX >= x &&
                    pageX <= x + width &&
                    pageY >= y &&
                    pageY <= y + height;
    
                if (!isInside) {
                    console.log("Outside Click - Closing Menu");
                    closeMenu();
                }
            });
        };
    
        if (visible) {
            console.log("Adding event listener");
            setTimeout(() => {
                // Ensure React Native handles touches
                const rootView = menuRef.current?.root;
                rootView?.setNativeProps({ onTouchStart: (event) => {
                    handleOutsidePress(event)
                    console.log('click')
                } });
            }, 100);
        }
    }, [visible]);
    

    const [headerText, setHeaderText] = useState('')
    return (
        
            visible && (
                // <Pressable style={[StyleSheet.absoluteFill, {zIndex: 1999000}]} onPress={closeMenu}>
                    <Animated.View
                        ref={menuRef}
                        key={renderKey} // Force re-render when `renderKey` updates
                        style={[
                            {
                                zIndex: 1000000,
                                position: "absolute",
                                left: position.x,
                                top: position.y,
                                backgroundColor: "white",
                                
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 4,
                                elevation: 3,
                            },
                        
                            animatedStyle,
                        ]}
                    >
                        {enableHeader && <MenuHeader text={headerText} onPress={closeMenu}/>}
                            <View style = {{padding: 10,}}>
                            {menuItems}
                            </View>
                    </Animated.View>
                    // </Pressable>
                )
               
        
    
    );
});

export default React.memo(Menu);


interface MenuHeaderProps{
    text: string,
    onPress: () => any
}

const MenuHeader:React.FC<MenuHeaderProps> = React.memo(({text, onPress}) => {

    return (
        <View>
        <View style ={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontFamily: webFont('Roboto'), fontSize: 16, fontWeight: '600' }}>{text}</Text>
            <PressableWrapp onPress={onPress}>
                <CircleX fill={'#bababa'} color={'white'} size ={25}/>
            </PressableWrapp>
        </View>
        <Dash 
            style={{
                width: '100%',
                height: 1
            }}
            dashColor="#bababa" //"#bababa'"
            dashLength={3}
            dashGap={3}
            dashThickness={1}
        />
        {/* <View style ={{height: 0.2, width: '100%', backgroundColor: '#bababa' }}/> */}
        </View>
    )
})