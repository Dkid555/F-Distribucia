import React from "react";
import { PressableWrap } from "../../../../../Universal/Buttons/PressableColorWrap/PressableColorWrap";
import ViewSmooth from "../../../../../Universal/View/ViewSmooth";
import { useAppContext } from "../../../../../Universal/API/Context-API/AppContext";
import { Text, View } from "native-base";
import Arrows from "../../../../../Universal/Arrows/Arrows";
import { StyleSheet } from "react-native";



interface ButtonSeeAllProps{
    onHoverIn: () => any,
    onHoverOut: () => any,
    onPress: () => any
}

const ButtonSeeAll:React.FC<ButtonSeeAllProps> = ({
    onHoverIn,
    onHoverOut,
    onPress
}) => {

    const {scaleAll} = useAppContext()
    const styles = stylesFunc(scaleAll)
    return(
        <PressableWrap activeOpacity={0.8} onPress={onPress}  
                onHoverIn={onHoverIn}  
                onHoverOut={onHoverOut}
            style = {{ alignSelf: 'center', }}>
                    <ViewSmooth style = {styles.viewSmooth}>
                        <Text fontSize={'xl'} fontFamily={'heading'}>
                            Все коллекции
                        </Text>
                        <View style ={styles.view}>
                            <Arrows size={24 * scaleAll} arrowType='right' scaleAll={scaleAll}/>
                        </View>
                    </ViewSmooth>
            </PressableWrap>
    )
}


const stylesFunc = (scaleAll: number) => React.useMemo(() => StyleSheet.create({
    viewSmooth: {
        backgroundColor: 'white', marginTop: 20 * scaleAll, maxWidth: 1000,
        borderRadius: 10, borderWidth: 1,
        paddingVertical: 11, paddingLeft: 15, paddingRight: 10,
        borderColor:'black', borderStyle: 'dashed',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    view: {width: 24 * scaleAll, aspectRatio: 1}
}), [scaleAll])

export default React.memo(ButtonSeeAll)