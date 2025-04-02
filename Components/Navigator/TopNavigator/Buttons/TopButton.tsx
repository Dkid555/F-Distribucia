import { Button, Pressable, Text, View } from "native-base"
import React, { useState } from "react"
import { ColorValue, PressableProps, StyleSheet, ViewStyle } from "react-native"
import ViewSmooth from "../../../Universal/View/ViewSmooth"
import { webFont } from "../../../Universal/API/API"
import { PressableWrap, PressableWrapProps } from "../../../Universal/Buttons/PressableColorWrap/PressableColorWrap"
export interface TopButtonProps{
    text: string,
    onPress?: () => any,
    minWidth?: number,
    onHoverIn?: PressableWrapProps['onHoverIn'],
    onHoverOut?: PressableWrapProps['onHoverOut'],

}
const TopButton:React.FC<TopButtonProps> = ({text, onHoverIn,onHoverOut, scaleAll, minWidth,  onPress}) => {
    const [color, setColor] = useState<ColorValue>('#1E1E1E')
    return (
        
        <View style = {{height: '100%', minWidth: minWidth ?? 'auto', position: 'relative'}}>
        <PressableWrap 
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            setColor={setColor} 
            style = {{width:'100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', }}  
            onPress={() => {if(onPress)onPress()}}  >
        
            <Text style={{fontSize: 16 * scaleAll, fontFamily: webFont('Inter'), fontWeight: '600', color: color }}>
                {text}
            </Text>
        
        </PressableWrap>
           
        
        <View style = {[StyleSheet.absoluteFill, {flexDirection: 'column-reverse',}]} pointerEvents="none">
                <ViewSmooth style={{
                    bottom: 0,
                    // backgroundColor: 'red',
                    width: 100,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    backgroundColor: color == '#1E1E1E' ? 'transparent' : color,
                    height: 4,
                    marginHorizontal: 'auto'
                }}/>
            </View>
            
        </View>
    )
}

export default TopButton



