import React from "react";
import { Brand } from "../../Universal/API/Context-API/AppProvider";
import { useAppContext } from "../../Universal/API/Context-API/AppContext";
import Animated from "react-native-reanimated";
import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import PressableWrapp from "../../Universal/Buttons/PressableReact/PressableWrapp";
import { Linking } from "react-native";
import FastImage from "@d11/react-native-fast-image";
import { webFont } from "../../Universal/API/API";
import BrandsWrapp from "./BrandsWrapp";
import AnimatedOpacityWrapp from "../../Universal/Animated/AnimatedOpacityWrapp";



interface BrandScrollProps {
    filterdBrands: Brand[]
}

const BrandScroll: React.FC<BrandScrollProps> = ({
    filterdBrands
}) => {
    const { isSmallVersion, currentWidth } = useAppContext()
    return (
        <AnimatedOpacityWrapp style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={!isSmallVersion}>
                <BrandsWrapp>
                    {filterdBrands?.map((brand, index) => (
                        <PressableWrapp
                            activeOpacity={0.8}
                            key={index}
                            onPress={() => {
                                if (brand.url) {
                                    Linking.openURL(brand.url)
                                }
                            }}
                        >
                            <Box
                                minHeight="120px"
                                width={Math.min(400, currentWidth - 30)}
                                maxWidth={currentWidth - 30}
                                alignSelf={'center'}
                                borderRadius={20}
                                overflow="hidden"
                                padding="10px"
                                marginX="5px"
                                marginY="7px"
                                borderWidth={1}
                                borderColor="coolGray.200"
                                backgroundColor="white"
                            >
                                <HStack space={3} alignItems="center">
                                    <Box width="80px" height="80px">
                                        <FastImage
                                            source={{ uri: brand.image }}
                                            style={{ width: "100%", height: "100%" }}
                                            resizeMode="contain"
                                        />
                                    </Box>
                                    <VStack flex={1} paddingTop={'10px'} paddingBottom={'10px'}>
                                        <Text
                                            fontSize="md"
                                            fontWeight="bold"
                                            fontFamily={webFont("Inter")}
                                            numberOfLines={1}
                                        >
                                            {brand.brand}
                                        </Text>
                                        {brand.description && (
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                                fontFamily={webFont("Inter")}
                                            // numberOfLines={2}
                                            >
                                                {brand.description}
                                            </Text>
                                        )}
                                    </VStack>
                                </HStack>
                            </Box>
                        </PressableWrapp>
                    ))}
                </BrandsWrapp>
            </ScrollView>
        </AnimatedOpacityWrapp>
    )
}

export default BrandScroll