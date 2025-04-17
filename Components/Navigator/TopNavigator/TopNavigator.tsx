import { View } from "native-base"
import React, { RefObject, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useAppContext } from "../../Universal/API/Context-API/AppContext"
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";
import TopButton from "./Buttons/TopButton";
import MenuButton from "./Buttons/MenuButton";
import { hanldeSlideOutMenu, option } from "./SlideOutMenu/SlideOutMenu";
import ImageWithAspectRatio from "../../Universal/Image/ImageWithAspectRatio";
import { handleTopSlideOut } from "./TopSlideOut/TopSlideOut";
import { handleSearchBarTop } from "../../Universal/searchBars/SeacrhBarTop";
import { NavigationHomeWithReset } from "../../Universal/API/API";
import { StackHeaderProps } from "@react-navigation/stack";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { transform } from "lodash";

// somewhere in your app


interface TopNavigatorProps extends StackHeaderProps {
    // navigation: any,
    refSlideOutMenu: RefObject<hanldeSlideOutMenu>,
    refTopSlideOut: RefObject<handleTopSlideOut>
    optionButtons: option[]
}
export const heightOfTopNav = (isSmallVersion: boolean) => {
    return isSmallVersion ? 60 : 80
}

export interface handleTopNavigator {
    buttonHovered: () => {
        [key: string]: boolean
    }
}
const TopNavigator: React.FC<TopNavigatorProps> = React.forwardRef<handleTopNavigator, TopNavigatorProps>(({ navigation, route, refSlideOutMenu, optionButtons }, ref) => {
    
    
   
    
    const { scaleAll, currentWidth, isMediumVersion, isSmallVersion } = useAppContext()



    const [enableslideOut, setSlide] = useState(false)
    const [buttonHovered, setButtonHovered] = useState<{ [key: string]: boolean }>({})

    useImperativeHandle(ref, () => ({
        buttonHovered: () => buttonHovered
    }))

    const [enableSearch, setEnableSearch] = useState(false)

    const refSearchBarTop = useRef<handleSearchBarTop>(null)


    const opacity = useSharedValue(1)

    const translateY = useSharedValue(0)

    useEffect(() => {
        // console.log(route)
        // opacity.value = withTiming(
                
        //    ( route.name === "Warehouse" ? 0
        //     : 1), {duration: 250, easing: Easing.inOut(Easing.ease)}, () => {
               
        //     })
            translateY.value = withTiming(
                
                ( route.name === "Warehouse" ? -100
                 : 0), {duration: 450, easing: Easing.inOut(Easing.ease)}, () => {
                    runOnJS(setEnable)( route.name != "Warehouse")
                 })
    }, [
        route
    ])

    const heightAnimStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,//[{translateY: height.value}]
        // height: translateY.value,
        top: translateY.value//
    }))

    const [enable, setEnable] = useState(true)

    return (
        enable && <Animated.View style={[{
            width: '100%',
            overflow: 'hidden'
        }, heightAnimStyle]}>
            <Pressable
                
                style={{ width: '100%', 
                position: 'fixed',
                height: heightOfTopNav(isSmallVersion), 
                zIndex: 6, backgroundColor: '#F9F9F9', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    width:
                        ((isSmallVersion) ? 60 : 40) * scaleAll, height: '100%'
                }}>
                    </View>

                {/* <YourComponent/> */}
                <View style={[(isSmallVersion) ? StyleSheet.absoluteFill : {},
                (isSmallVersion) ? { justifyContent: 'center', alignItems: 'center', zIndex: 3 } : {}]} pointerEvents='box-none'>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        NavigationHomeWithReset({
                            navigation, data: {}
                        })
                    }}>
                        <ImageWithAspectRatio
                            aspectRatio={1}
                            minHeight={isMediumVersion ? 40 * scaleAll : (isSmallVersion) ? 30 * scaleAll : 50 * scaleAll}
                            source={{
                                uri: require('./../../../assets/Images/F-Distribution.png'),
                                priority: 'high'
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {!isSmallVersion && <>
                    <View style={{ width: currentWidth < 1590 ? 80 * scaleAll : 124 * scaleAll }} />
                    {optionButtons.map(button => {
                        return (
                            <TopButton

                                scaleAll={scaleAll}
                                minWidth={
                                    currentWidth < 1590 ? 224 : 262
                                }
                                text={button.text}
                                onPress={button.onPress}
                                onHoverIn={() => {
                                    console.log(button.text)
                                    setButtonHovered(prev => ({ ...prev, [button.text]: true }))
                                    if (button.onHoverIn) button.onHoverIn()
                                }}
                                onHoverOut={() => {
                                    setButtonHovered(prev => ({ ...prev, [button.text]: false }))

                                    if (button.onHoverOut) button.onHoverOut()
                                }}
                            />
                        )
                    })}
                </>}
                {/* <View style={{ flex: 1, flexDirection: 'row-reverse', marginRight: 40 * scaleAll }}>
                    <PressableWrap onPress={() => { refSearchBarTop.current?.enable() }}>
                        <Search size={(isMediumVersion ? 22 : 25) * scaleAll} />
                    </PressableWrap>
                </View> */}

                {/* Rolling SearchBarTop */}
                {/* {<SearchBarTop ref={refSearchBarTop} onClose={() => { }} navigation={navigation} />} */}
            </Pressable>
        </Animated.View>

    )
})







export default React.memo(TopNavigator)