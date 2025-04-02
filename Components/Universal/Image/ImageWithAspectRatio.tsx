import React from "react";
import { Platform, View } from "react-native";
import FastImage, { Source } from "@d11/react-native-fast-image";


interface ImageWithAspectRatioProps{
    aspectRatio: number,
    minHeight: number,
    source: Source
}

const ImageWithAspectRatio:React.FC<ImageWithAspectRatioProps> = ({aspectRatio,minHeight, source}) => {

    return (
        <View style={{ aspectRatio: aspectRatio, minHeight: minHeight}}>
            <FastImage source={source}
                resizeMode='contain'
                style={{
                    flex: 1,
                    ...(Platform.OS === 'web' && {
                                        imageRendering: 'high-quality',
                                      }),
                }}
            />
        </View>
    )
}

export default ImageWithAspectRatio