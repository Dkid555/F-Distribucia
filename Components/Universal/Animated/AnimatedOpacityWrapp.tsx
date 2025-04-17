import React, { useEffect, useImperativeHandle, useState } from "react";
import { Animated, ViewStyle } from "react-native";
import { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


interface AnimatedOpacityWrappProps {
    style?: ViewStyle,
    children?: any
    callBackOnEnable?: () => any, callBackOnDisable?: () => any
}

export interface handleAnimatedOpacityWrapp {
    enable: () => any,
    disable: () => any
}

const AnimatedOpacityWrapp: React.FC<AnimatedOpacityWrappProps> = React.forwardRef<handleAnimatedOpacityWrapp, AnimatedOpacityWrappProps>
    (({ style = {}, children = null, callBackOnEnable, callBackOnDisable }, ref) => {

        const opacity = useSharedValue(0)

        const animatedStyle = useAnimatedStyle(() => ({
            opacity: opacity.value
        }))

        const [isEnabled, setEnabled] = useState(true)


        const callBack = () => {
            if (isEnabled && callBackOnEnable) {
                callBackOnEnable()
            } else if (!isEnabled && callBackOnDisable) {
                callBackOnDisable()
            }
        }
        useEffect(() => {
            opacity.value = withTiming(isEnabled ? 1 : 0, { duration: 350, easing: Easing.inOut(Easing.ease) }, () => { runOnJS(callBack)() })
        }, [isEnabled])


        useImperativeHandle(ref, () => ({
            enable: () => setEnabled(true),
            disable: () => setEnabled(false)
        }))
        return (
            <Animated.View style={[animatedStyle, style]}>
                {children}
            </Animated.View>
        )
    })


export default AnimatedOpacityWrapp