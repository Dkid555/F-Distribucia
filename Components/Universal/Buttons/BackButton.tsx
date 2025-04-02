import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    ViewStyle,
    TextStyle,
    ColorValue,
} from 'react-native';

import ViewSmooth from '../View/ViewSmooth';
import { useAppContext } from '../API/Context-API/AppContext';
import { webFont } from '../API/API';
import { ChevronLeft } from 'lucide-react-native';
import { PressableWrap } from './PressableColorWrap/PressableColorWrap';
import { Text, View } from 'native-base';

interface BackButtonLogin {
    disableIcon?: boolean,
    style?: {
        Container?: ViewStyle | null,
        symbol?: ViewStyle | null;
        text?: TextStyle | null;
    };
    text?: string;
    customEvent?: () => void;
}

const BackButton: React.FC<BackButtonLogin> = ({
    text = 'Назад',
    style,
    customEvent,
    disableIcon = false

}) => {
    const {scaleAll} = useAppContext();
    const handlePress = () => {
        if (customEvent) {
            customEvent();
        }
    };
    const styles = stylesFunc(scaleAll)
    const [color,setColor ] = useState<ColorValue>('black')
    return (
        <PressableWrap 
            onPress={() => {handlePress()}} 
            setColor={setColor}
            >
                <ViewSmooth style= {[styles.Container, 
                    style?.Container ?? {}]}>
                    {!disableIcon && 
                    <View pointerEvents='none' 
                            style={{
                            
                            height: 20 * (((style?.text?.fontSize ?? styles.text.fontSize)) /styles.text.fontSize)  * scaleAll,
                            width: 20 * (((style?.text?.fontSize ?? styles.text.fontSize)) /styles.text.fontSize)  * scaleAll,
                            // backgroundColor: 'yellow',
                            // position: 'relative'
                            marginHorizontal: -6 * (((style?.text?.fontSize ?? styles.text.fontSize)) /styles.text.fontSize)  * scaleAll
                        }
                            }>
                            <ChevronLeft color={color} size={
                                20 * (((style?.text?.fontSize ?? styles.text.fontSize)) /styles.text.fontSize)  * scaleAll
                                }/>
                        </View>
                    }
                    <Text style={[styles.text,{color: color}, style?.text, ]}>{text}</Text>
                </ViewSmooth>
        </PressableWrap>
    );
};

const stylesFunc = (scaleAll: number) => React.useMemo(() => StyleSheet.create({
    Container: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12 * scaleAll,
        paddingVertical: 6 * scaleAll,
        flexDirection: 'row',
        alignItems: 'center',
        
        justifyContent: 'center' ,
        backgroundColor: 'white',
        borderRadius: 16* scaleAll,
        gap: 10,
        // minWidth: 72 * scaleAll,
        // gap: -1
    },
    
    symbol: {
        width: 17* scaleAll,
        height: 22* scaleAll,
        marginTop: -4* scaleAll,
        margin: 'auto',
        marginRight: -9* scaleAll,
    },
    text: {
        fontFamily: webFont('Inter'),
        color: 'black',
        lineHeight: 20* scaleAll,
        textAlign: 'center',
        fontSize: 15* scaleAll,
    },
}), [scaleAll]) 

export default React.memo(BackButton);