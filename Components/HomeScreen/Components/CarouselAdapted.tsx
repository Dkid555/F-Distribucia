import React, { useRef, useState } from "react";
import Carousel, { CarouselProps, Pagination } from "react-native-snap-carousel-v2-maintained";
import { useAppContext } from "../../Universal/API/Context-API/AppContext";
import Animated, { AnimatedStyle, Easing, runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";



interface CarouselWithItemProps {
    data: any[],
    renderItem: CarouselProps<CarouselWithItemProps['data']>['renderItem']
    PaginationCustom?: {
        enable: boolean,
        render: (x: PaginationSlideProps) => React.ReactElement<PaginationSlideProps>
    },
    onChangeIndex?: (index: number) => any 
    AnimatedStyle?: AnimatedStyle
    CarouselProps?: CarouselProps<CarouselWithItemProps['data']>
}


export const coolSpringConfig: WithSpringConfig = {
    damping: 15,
    stiffness: 140,
    mass: 1,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    overshootClamping: false,
  };


const CarouselAdapted:React.FC<CarouselWithItemProps> = ({
    data,
    renderItem,
    PaginationCustom,
    onChangeIndex,
    AnimatedStyle,
    CarouselProps
}) => {

    const {currentWidth: screenWidth} = useAppContext()

    const refCarousel = useRef<Carousel<CarouselWithItemProps['data']>>(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const onChangeIndex_ = (slideIndex: number) => {
        // if (refSwiperFlatList?.current) {

        // }
        console.log()
        if (onChangeIndex) onChangeIndex(slideIndex);
        const index = slideIndex//refSwiperFlatList.current.currentIndex;
        setActiveSlide(slideIndex)
    };

    const translationX = useSharedValue(0);

     // Create a pan gesture
     const panGesture = Gesture.Pan()
    .onStart(() => {
      refCarousel.current?.stopAutoplay();
    })
    .onUpdate((event) => {
      translationX.value = event.translationX;
    })
    .onEnd((event) => {
      const velocityX = event.velocityX;
      const threshold = 20;

      if (event.translationX < -threshold || velocityX < -300) {
        runOnJS(() => refCarousel.current?.snapToNext())();
      } else if (event.translationX > threshold || velocityX > 300) {
        runOnJS(() => refCarousel.current?.snapToPrev())();
      }

    //   translationX.value =
    //    withTiming(0, {
    //     duration: 1500,
    //     easing: Easing.bezier(0.22, 1, 0.36, 1),
    //   }) 
    //   withSpring(0, coolSpringConfig);
      refCarousel.current?.startAutoplay();
    });


    // const animatedStyle = useAnimatedStyle(() => ({
    //     transform: [{translateX: translationX.value}]
    // }))

    return (
        <GestureDetector gesture={panGesture}>
        <Animated.View
        
        style={[{
            alignItems: 'center'
        }, AnimatedStyle ?? {}]}>
            <Carousel
                
                ref={refCarousel}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                onSnapToItem={onChangeIndex_}
                data={data}
                renderItem={({ item, index }) => (
                   
                        renderItem({ item, index })
                        
                  )}
                scrollEnabled={false} // prevent native scroll
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.9}
                loop
                autoplay
                bounces={false}
                autoplayInterval={4500}
                onScrollEndDrag={(event) => {
                    const offsetX = event?.nativeEvent?.contentOffset?.x ?? 0;
                    const index = Math.round(offsetX / (screenWidth * 0.9));
                    if (index !== activeSlide) {
                        onChangeIndex_(index);
                    }
                }}
                onMomentumScrollEnd={(event) => {
                    console.log('end')
                    const offsetX = event?.nativeEvent?.contentOffset?.x ?? 0;
                    const index = Math.round(offsetX / (screenWidth * 0.9));
                    if (index !== activeSlide) {
                        onChangeIndex_(index);
                    }
                }}                
                
                containerCustomStyle={{ marginTop: 16, marginBottom: 32 }}
                initialNumToRender={3}   
                {...CarouselProps}        
            />
            {PaginationCustom && PaginationCustom?.enable && PaginationCustom.render({
                        data: data,
                        activeSlide: activeSlide
                    })}

            
        </Animated.View>
        </GestureDetector>
    )
}



export interface PaginationSlideProps {
    data: any[],
    activeSlide: number
}

export const PaginationSlide: React.FC<PaginationSlideProps> = ({ data, activeSlide }) => {
    return (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'transparent', paddingVertical: 0, }}
            
            dotStyle={{
                width: 7,
                height: 7,
                borderRadius: 5,
                // marginHorizontal: -12,
                backgroundColor: 'rgb(185, 185, 185)'
            }}
            dotContainerStyle={{
                marginHorizontal: 3,
            }}
            inactiveDotStyle={{
                width: 7,
                height: 7,
                borderRadius: 5,
                backgroundColor: 'rgb(205, 204, 204)'
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={0.9}
        />
    )
}

export default React.memo(CarouselAdapted)


interface CarouselCustomWrapperProps {
    item: any,
    index: number,
    activeSlide: number,
    translationX: SharedValue<number>,
    renderItem: ({ item, index }: { item: any; index: number }) => React.ReactNode,
  }
const CarouselItemWrapper:React.FC<CarouselCustomWrapperProps> = ({
    item,
    index,
    activeSlide,
    translationX,
    renderItem,
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      if (index === activeSlide) {
        return {
          transform: [{ translateX: translationX.value }],
        };
      }
      return {
        transform: [{ translateX: 0 }],
      };
    });
  
    return <Animated.View style={animatedStyle}>{renderItem({ item, index })}</Animated.View>;
  };
  