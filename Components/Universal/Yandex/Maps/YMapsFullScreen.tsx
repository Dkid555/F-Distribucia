import { Map, YMaps } from '@pbe/react-yandex-maps'
import React, { RefObject, useImperativeHandle, useRef, useState } from 'react'
import Marks from '../Marks/Marks'
import { dealer } from '../../../WhereToBuy/Interfaces/Interface'
import { PlaceMarkWithContentProps } from '../Marks/Components/PlaceMarkWithContent'
import { Animated, StyleSheet, ViewStyle } from 'react-native'
import { View } from 'native-base'
import SimpleCenteredSpinner from '../../SimpleCenteredSpinner/SimpleCenteredSpinner'


export interface defaultPosition {
    center: [number,number],
    zoom: number
}


interface YMapsFullScreenProps {
    dealerList: dealer[],
    defaultState: defaultPosition,
    selected: dealer | null,
    setSelected?: (x: dealer | null) => any
    onClickMarks?: PlaceMarkWithContentProps['onClick'] 
    onClickMap?: () => any,
    width: ViewStyle['width'],
    mapRef_?: RefObject<ymaps.Map | null>
}


interface handleYandexMaps {
    getMapRef: () => RefObject<ymaps.Map | null>
}

const YMapsFullScreen:React.FC<YMapsFullScreenProps> = React.forwardRef<handleYandexMaps, YMapsFullScreenProps> (({
    dealerList,  defaultState, selected, setSelected, onClickMarks, onClickMap, width, mapRef_
}, ref) => {

    const mapRef =  useRef<ymaps.Map>(null)
    useImperativeHandle(ref, () => ({
        getMapRef: () => mapRef
    }))

    const [loading, setLoading] = useState(true)

 

    return (
        <>
            <YMaps query={{ apikey: `9b09a360-c83c-4028-8483-d72bb10b785e`,  lang: "ru_RU"}} >
                    <Map
                    // instanceRef = {mapRef}
                    defaultOptions={{
                        copyrightLogoVisible: false,
                        copyrightProvidersVisible: false,
                        copyrightUaVisible: false,
                        controls: []    
                    }}
                    onLoad = {
                        () => {setLoading(false)}
                    }
                    onError={() => {
                        setLoading(true)
                    }}
                        onClick = {onClickMap}
                    defaultState={defaultState} instanceRef={(ref) => ((mapRef_ ?? mapRef).current = ref)} style={{ width, flex: 1, alignSelf: "center" }} >
                        <Marks 
                        mapRef={mapRef_ ?? mapRef}
                        onClick={onClickMarks}
                        dealersList={dealerList} selected = {selected}/>
                    </Map>
            </YMaps>

            {(loading && 
                <View style={[StyleSheet.absoluteFill]}>
                    <ShimmerWeb />
                    {/* <SimpleCenteredSpinner height={30} width={30}/> */}
                </View>
                )}
            </>
    )

})



import ContentLoader from 'react-content-loader'

const ShimmerWeb = () => (
    <ContentLoader
      speed={1.2}
      width="100%"
      height="100%"
      backgroundColor="#E1E3E6"
      foregroundColor="#F5F6F8"
      style={{ width: '100%', height: '100%' }}
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
    </ContentLoader>
  );
  

export default React.memo(YMapsFullScreen)