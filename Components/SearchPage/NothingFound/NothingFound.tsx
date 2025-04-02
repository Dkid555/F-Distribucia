import React from "react";
import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import { useAppContext } from "../../Universal/API/Context-API/AppContext";
import { webFont } from "../../Universal/API/API";


// const NothingFound = () => {
//     return (
//         <Animated.View
//             entering={FadeIn.duration(500)}
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//             <Text style={{ fontFamily: webFont('Inter'), fontSize: 24, fontWeight: '500', textAlign: 'center' }}>
//                 Ничего не найдено 😕
//             </Text>
//         </Animated.View>
//     );
// };

const NothingFound = () => {
    const { isSmallVersion, isMediumVersion, isTooBigVersion, currentWidth} = useAppContext();

    const width = Math.min(1000, currentWidth)
    // Выбираем размеры анимации в зависимости от экрана
    const animationSize = isSmallVersion 
        ? width * 0.5 
        : isMediumVersion 
        ? width * 0.6 
        : isTooBigVersion 
        ? width * 0.4 
        : width * 0.7;

    const textSize = isSmallVersion ? 16 : isMediumVersion ? 18 : isTooBigVersion ? 22 : 20;

    return (
        <View style={{ flex: 1,  alignItems: 'center' }}>
            <LottieView
                source={require("./NothingFound.json")} // Путь к анимации
                autoPlay
                loop={false}
                webStyle={{
                    width: animationSize,
                    height: animationSize,
                    
                }}
            />
            <Text style={{
                fontFamily: webFont('Inter'),
                fontSize: textSize,
                fontWeight: '500',
                marginTop: 10,
                textAlign: 'center'
            }}>
                Ничего не найдено 😕
            </Text>
        </View>
    );
};

export default React.memo(NothingFound);
