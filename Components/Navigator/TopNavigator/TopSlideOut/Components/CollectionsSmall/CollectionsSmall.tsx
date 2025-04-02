import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, AspectRatio, Text } from "native-base";
import Carousel from "react-native-snap-carousel-v2-maintained";
import FastImage from "@d11/react-native-fast-image";
import { useAppContext } from "../../../../../Universal/API/Context-API/AppContext";
import { CollectionsKKpolData } from "../../../../../Universal/API/Context-API/AppProvider";
import SimpleCenteredSpinner from "../../../../../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";

export interface CollectionSmallProps {
    collection: CollectionsKKpolData;
    imageSize: number,
    onPress?: () => any
}

const CollectionSmall: React.FC<CollectionSmallProps> = ({ collection, imageSize, onPress}) => {
    const { scaleAll,} = useAppContext();
    const carouselRef = useRef<Carousel<any>>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    if (!collection?.collection_small_image_slides_small_mmg?.length) return null;

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerWidth) return;

        const mouseX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const totalSlides = collection.collection_small_image_slides_small_mmg.length;
        const newIndex = Math.floor((mouseX / containerWidth) * totalSlides);

        carouselRef.current?.snapToItem(newIndex);
    };

    const [render, setRender] = useState(false)
    

    useFocusEffect(
        useCallback(() => {
          const timer = setTimeout(() => {
            setRender(true);
          }, 100);
      
          return () => {
            clearTimeout(timer);
            setRender(false);
          };
        }, []) // no dependencies here
      );
    const [rendered, setRendered] = useState(false)

    useEffect(() => {
        if(rendered){
            carouselRef.current?.snapToItem(0)
        }
    }, [
       rendered
    ])


    return (
          render &&  <Box
                width={imageSize}
                height={imageSize}
                justifyContent="center"
                alignItems="center"
                borderRadius={19}
                overflow={'hidden'}
                onMouseMove={handleMouseMove}
                ref={(el) => {
                    if (el) setContainerWidth(el.getBoundingClientRect().width);
                }}
                o
            >
                <Carousel
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    ref={carouselRef}
                    onLayout={() => {
                        setRendered(true)
                    }}
                    
                    // bounces
                    initialScrollIndex={0}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={collection.collection_small_image_slides_small_mmg}
                    renderItem={({ item }) => (
                        <AspectRatio ratio={1} width={imageSize} height={imageSize}>
                            {render ? 
                            <FastImage
                                onError={() => {
                                    setRender(false)
                                }}

                                
                                fallback={true}
                                source={{ uri: item, cache: 'immutable'}}
                                style={{ width: "100%", height: "100%", borderRadius: 10,
                                    ...(Platform.OS === 'web' && {
                                                                            imageRendering: 'high-quality',
                                                                          }),

                                 }}
                                resizeMode="cover"
                            />: <SimpleCenteredSpinner scaleAll={scaleAll} height={20* scaleAll} width={20 *scaleAll}/>}
                        </AspectRatio>
                    )}
                    sliderWidth={imageSize}
                    itemWidth={imageSize}
                    enableMomentum={false}
                    // pagingEnabled
                    activeAnimationType='spring'
                    decelerationRate="fast"
                />

                <Box position={'absolute'} bottom={2} paddingY={1} paddingX={2} borderRadius={8}  style={{backgroundColor: 'rgba(255, 255, 255, 0.8)',}}>
                    <Text textAlign={'center'} fontSize={'md'} fontFamily={'mono'}>
                    {collection.collection_name}
                    </Text>
                </Box>
            </Box>
    );
};

export default React.memo(CollectionSmall);
