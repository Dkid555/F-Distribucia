import React, { useEffect, useRef, useState } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";


export interface PressableWrappProps{
    children: any
    activeOpacity?: number,
    PressableProps?: PressableProps,
    onPress?: () => any
    style?: ViewStyle
}

const PressableWrapp:React.FC<PressableWrappProps> = ({children, style = {},  activeOpacity =0.8, onPress, PressableProps}) => {

    const [opacity, setOpacity] = useState(1)

    const [pressed, setPressed] = useState(false)

    const interval = useRef<number | null>(null)

    useEffect(() => {
        if(pressed){
            setOpacity(activeOpacity)
            setPressed(false)
            if(interval.current){
                clearInterval(interval.current)
            }

            interval.current = window.setInterval(() => {
                setOpacity(1)
                if(interval.current){
                    clearInterval(interval.current)
                }
            }, 300)
        }


        return () => {
            if(interval.current){
                clearInterval(interval.current)
            }
        }

    }, [pressed])

    return (<Pressable

            style={[{opacity: opacity, }, style ?? {}]}
                onPress={() => {
                    setPressed(true)
                    if(onPress){
                        onPress()
                    }
                }}

            {...PressableProps}
        >
        {children}
    </Pressable>)
}

export default PressableWrapp