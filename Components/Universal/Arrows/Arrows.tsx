import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react-native"
import React from "react"
import { ColorValue, View } from "react-native"
import { StyleSheet, ViewStyle } from "react-native"


export interface ArrowRightProps {
    scaleAll: number,
    color?: ColorValue,
    style?: {
        View?: ViewStyle
    }
    size?: number
    arrowType?: 'right' | 'down' | 'up' | 'left'
}

const Arrows: React.FC<ArrowRightProps> = ({ scaleAll, color = 'black', 
    arrowType = 'right',
    style = {}, size =24 }) => {
    const styles = stylesArrow(scaleAll)
    return (
        <View style={[StyleSheet.absoluteFill, styles.View, style.View]}>
            {
                arrowType == 'right' && <ChevronRight
                color={color}
                size={size * scaleAll}
                strokeWidth={2}
            />}
            {
                arrowType == 'down' && <ChevronDown
                color={color}
                size={size * scaleAll}
                strokeWidth={2}
            />}
            {
                arrowType == 'left' && <ChevronLeft
                color={color}
                size={size * scaleAll}
                strokeWidth={2}
            />}
            {
                arrowType == 'up' && <ChevronUp
                color={color}
                size={size * scaleAll}
                strokeWidth={2}
                
            />}
        </View>
    )
}

const stylesArrow = (scaleAll: number) => React.useMemo(() => StyleSheet.create({
    View: {
        width: '100%', flexDirection: 'row-reverse'
    },

}), [scaleAll])  

export default React.memo(Arrows)