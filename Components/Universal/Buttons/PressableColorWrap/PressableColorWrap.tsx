import { IPressableProps, Pressable } from "native-base";
import React, { useState } from "react";
import { ColorValue, ViewStyle } from "react-native";



export interface PressableWrapProps {
    children: React.ReactElement<any>,
    triggerProps?: any,
    colors?: {
        onHoverIn: ColorValue,
        onHoverOut: ColorValue
    }
    onPress: () => any,
    style?: ViewStyle,
    setColor?: (x: ColorValue) => any,
    PressableProps?: IPressableProps,
    activeOpacity?: number | undefined
    onHoverIn?: ()=> any,
    onHoverOut?: ()=> any,
}   

export const PressableWrap:React.FC<PressableWrapProps> = ({
    triggerProps = {},
    children, 
    colors = {
        onHoverIn: '#8BA4AE',
        onHoverOut: '#1E1E1E'
    },
    onPress, style = {}, setColor, activeOpacity, onHoverIn,onHoverOut,  PressableProps ={}}) => {
    
    const [currentOpacity, setOpacity] = useState(1);
    return (
        <Pressable
        {...triggerProps}
        onPress={() => {
            if(activeOpacity){
                setOpacity(activeOpacity)
                setTimeout(() => {
                    setOpacity(1)
                }, 400)
            }
            if(onPress)onPress()}} 
                style = {[style, {opacity: currentOpacity}]}
                    onHoverIn={() => {
                        if(setColor){
                            setColor(colors.onHoverIn)
                        }
                        if(onHoverIn){
                            onHoverIn()
                        }
                        
                    }}
                    onHoverOut={() => {
                        if(setColor){
                            setColor(colors.onHoverOut)
                        }
                        if(onHoverOut){
                            onHoverOut()
                        }
                    }}
        >
            {children}
        </Pressable>
    )
}

interface PressableOpacityWrap{
    children: React.ReactElement<any>,
    onPress: () => any,
    style?: ViewStyle,
    PressaveProps?: IPressableProps,
    activeOpacity?: number
}
export const PressableOpacityWrap:React.FC<PressableWrap> = ({children, onPress, style = {}, activeOpacity = 0.4}) => {


    return (
        <Pressable onPress={() => {
            if(onPress)onPress()}} {...style} >
            {children}
        </Pressable>
    )
}