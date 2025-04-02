import React from 'react'
import {Platform, View, ViewProps} from 'react-native'
import FastImage from "@d11/react-native-fast-image";


interface SimpleCenteredSpinner {
    scaleAll? : number
    width? : number,
    height? : number
    pointerEvemts?: ViewProps['pointerEvents']
}

const SimpleCenteredSpinner: React.FC<SimpleCenteredSpinner> = ({scaleAll = 1, width = 50, height = 50, pointerEvemts = 'auto'}) => {
    // const defaultHeight = 50;
    // const defaultWidth = 50;


    return (
        <View
            pointerEvents= {pointerEvemts}
                style={{
                    zIndex: 10000,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                
                <FastImage
                    style={{
                        height: height,
                        width: width,
                        ...(Platform.OS === 'web' && {
                                                                imageRendering: 'high-quality',
                                                              }),
                    }}
                    source={require('./spinner/Spinner.gif')} // require('./../../assets/static/gif/Spinner.gif')
                />
                
            </View>
    )
}

export default SimpleCenteredSpinner;