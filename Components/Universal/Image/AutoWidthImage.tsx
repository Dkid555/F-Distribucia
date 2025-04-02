import React from "react";
import { useEffect, useState } from "react";
import { Image, Platform, View } from "react-native";
import FastImage, { Source } from "@d11/react-native-fast-image";
import SimpleCenteredSpinner from "../SimpleCenteredSpinner/SimpleCenteredSpinner";

interface AutoWidthImage {
    source: Source
    scaleAll: number, 
    height: number
}
export const AutoWidthImage:React.FC<AutoWidthImage> = ({ source, scaleAll, height}) => {
    const [aspectRatio, setAspectRatio] = useState(0);

    useEffect(() => {
        if (source.uri) {
            if(!aspectRatio){
                Image.getSize(source.uri, (width, height) => {
                    setAspectRatio(width / height);
                });
            }
            
        }
    }, [source]);

    return (
        aspectRatio > 0 ? 
        <FastImage
            source={source}
            resizeMode='contain'
            
            style={{
                height: height,
                aspectRatio,
                ...(Platform.OS === 'web' && {
                    imageRendering: 'high-quality',
                  }),
            }}
        /> : 
        <View style = {{height: height}}>
            <SimpleCenteredSpinner height={20 * scaleAll} width={20 * scaleAll}/>
        </View>
    );
};

interface AutoHeighImage {
    source: Source
    scaleAll: number, 
    width: number
    maxHeight?: number | undefined
}

export const AutoHeighImage:React.FC<AutoHeighImage> = ({maxHeight, source, scaleAll, width}) => {
    const [aspectRatio, setAspectRatio] = useState(0);

    useEffect(() => {
        if (source.uri) {
            
            if(!aspectRatio){
                Image.getSize(source.uri, (width, height) => {
                    console.warn(source.uri, width / height)
                    setAspectRatio(width / height);
                });
            }
        }
    }, [source]);

    return (
        aspectRatio > 0 ? <FastImage
            source={source}
            resizeMode='contain'
            style={{
                width: width,
                maxHeight: maxHeight,
                aspectRatio,
                ...(Platform.OS === 'web' && {
                                                        imageRendering: 'high-quality',
                                                      }),
            }}
        /> : 
        <View style = {{width: width, height: width, maxHeight: maxHeight}}>
            <SimpleCenteredSpinner height={20 * scaleAll} width={20 * scaleAll}/>
        </View>
    );
};