import { Box, Text, VStack, HStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { webFont } from "../Universal/API/API";
import { UnitProps } from "./Components/Unit";
import { KKpolData } from "../Universal/API/Context-API/AppProvider";
import {
    Droplet,
    Truck,
    Handshake,
    Wrench,
    Layers2,
    Users,
    SlidersHorizontal,
    DollarSign,
} from "lucide-react-native";
import CarouselAdapted, { PaginationSlide } from "./Components/CarouselAdapted";
import FastImage from "@d11/react-native-fast-image";
import ViewSmooth from "../Universal/View/ViewSmooth";

interface HomeScreenProps {
    navigation: any;
    route: any;
}

export const formUnits = ({
    result,
    setUnits,
}: {
    result: KKpolData[];
    setUnits: (x: UnitProps["unit"][]) => any;
}) => {
    setUnits(
        result.map((res) => ({
            description: `${res.fab} ${res.col} ${res.name}, ${parseInt(res.height)}x${parseInt(res.width)}, ${res.poverh}`,
            price: `${res.price} р/${res.ed}`,
            url: `${res.uri_full}`,
            unit: res,
        }))
    );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
    const {
        isSmallVersion,
        isMediumVersion,
        isTooBigVersion,
        currentWidth: screenWidth,
    } = useAppContext();

    //   const screenWidth = Dimensions.get("window").width;
    const isDesktop = screenWidth > 1000;

    const getFontSize = (small: any, medium: any, large: any) => {
        if (isSmallVersion) return small;
        if (isTooBigVersion) return large;
        if (isMediumVersion) return medium;
        return medium;
    };

    const Creatile = () => (
        <Text bold={true}
            color={'#0A84FF'}
            onPress={() => {
                Linking.openURL('https://creatile.pro/')
            }}>Creatile</Text>
    )

    const carouselItems = [
        {
            icon: Droplet,
            title: "Современные и стильные товары",
            description: "Мы подбираем не просто функциональные, а действительно красивые решения для вашего дома: душевые системы, смесители и аксессуары.",
        },
        {
            icon: Truck,
            title: "Быстрая доставка",
            description: "Сотрудничаем с проверенными логистическими партнёрами по всей России. Гарантируем сроки и аккуратную упаковку.",
        },
        {
            icon: DollarSign,
            title: "Честные цены",
            description: "Прямые поставки от производителей и собственное производство Creatile без наценок. Справедливый прайс — для каждого.",
        },
        {
            icon: Wrench,
            title: "Поддержка на всех этапах",
            description: "Помогаем с выбором, консультируем, сопровождаем доставку и рекомендуем монтажные решения.",
        },
        {
            icon: Layers2, // можешь заменить на Hammer или Layers, если хочешь
            title: "Собственное производство",
            description: <Text>{`Наш бренд `}
                {Creatile()}{` — это плитка и декоративные элементы собственного производства. Качество, стиль и доступность в одном флаконе.`}</Text>,
        },
        {
            icon: Handshake, // или Handshake
            title: "Гибкие условия сотрудничества",
            description:
                "Индивидуальные условия для дизайнеров, строителей и оптовиков. Удобная логистика и оплата.",
        }
    ];


    const renderCard = ({ item, index }: { item: typeof carouselItems[number], index: number }) => (
        <Box
            key={index}
            p={6}
            borderRadius={20}
            backgroundColor="#F7FAFC"
            shadow={3}
            minHeight={'182px'}
            width={`${Math.min(screenWidth - 50, 400)}px`} // фиксированная ширина
            m={2}         // небольшой внешний отступ для равномерного расположения
        >
            <VStack space={3} >
                <item.icon size={32} color="#2D3748" />
                <Text fontWeight="bold" fontSize={getFontSize("md", "lg", "xl")}>
                    {item.title}
                </Text>
                <Text fontSize={getFontSize("xs", "sm", "md")} color="gray.600">
                    {item.description}
                </Text>
            </VStack>
        </Box>
    );


    return (
        <>
            <Box width={'full'} backgroundColor={'gray.10'}>
                <CarouselAdapted
                    data={[{
                        image: require('./../../assets/Images/HomeScreenNewBig.jpg')
                    },
                    {
                        image: require('./../../assets/Images/HomeScreenNewBig.jpg')
                    },
                    {
                        image: require('./../../assets/Images/HomeScreenNewBig.jpg')
                    }
                    ]}
                    CarouselProps={{
                        autoplayInterval: 10000
                    }}
                    renderItem={({ item, index }) => {

                        return (
                            <Box alignItems={'center'} width={'full'}>

                                <FastImage
                                    source={item.image}
                                    style={{
                                        height: isDesktop ? 400 : 150,
                                        width: isDesktop ? '80%' : '95%',
                                        // paddingHorizontal:10,
                                        borderRadius: isDesktop ? 40 : 18
                                    }}
                                    resizeMode='cover'
                                />
                            </Box>
                        )
                    }}

                    PaginationCustom={{
                        enable: true,
                        render: (props) => {
                            return <Box marginTop={-5} paddingBottom={1}><PaginationSlide {...props} /></Box>
                        }
                    }}

                />
            </Box>
            <Box style={{ flex: 1 }} alignItems="center" paddingTop={30} paddingX={10}>

                <Box width={isDesktop ? 900 : "100%"}>

                    <Text fontSize={getFontSize("md", "xl", "2xl")} fontFamily={webFont("Inter")} fontWeight="bold" mb={6}>
                        О компании
                    </Text>

                    <Text fontSize={getFontSize("sm", "md", "lg")} lineHeight={getFontSize("lg", "xl", "2xl")} fontFamily={webFont("Inter")} mb={6}>
                        <Text fontWeight="bold">Ф-Дистрибуция</Text> — это про комфорт в каждой детали. Мы подбираем товары, которые не просто выполняют свою функцию, а делают жизнь удобнее и красивее.
                    </Text>

                    <Text fontSize={getFontSize("sm", "md", "lg")} lineHeight={getFontSize("lg", "xl", "2xl")} fontFamily={webFont("Inter")} mb={4}>
                        Мы работаем напрямую с производителями, а также развиваем собственное производство {Creatile()} — современный бренд стильной плитки и интерьерных решений. Это позволяет нам держать цены честными и гарантировать высокое качество.
                    </Text>


                    <Text fontSize={getFontSize("sm", "md", "lg")} lineHeight={getFontSize("lg", "xl", "2xl")} fontFamily={webFont("Inter")} mb={6}>
                        Заказывайте продукцию онлайн на OZON, Wildberries, Яндекс.Маркет и других популярных площадках — и уже через пару дней наслаждайтесь обновлениями в своём доме.
                    </Text>

                    <Text fontSize={getFontSize("md", "lg", "xl")} fontWeight="bold" mb={4}>
                        Почему выбирают нас
                    </Text>


                </Box>
                {!isSmallVersion ? (
                    <HStack
                        width={900}
                        flexWrap="wrap"
                        justifyContent="center"
                        alignItems="flex-start"
                        paddingBottom={30}
                    >
                        {carouselItems.map((item, index) => {
                            return renderCard({
                                item,
                                index
                            })
                        })}
                    </HStack>
                ) : (
                    <Box height={400}>
                        <CarouselAdapted
                            data={carouselItems}
                            renderItem={renderCard}

                            PaginationCustom={{
                                enable: true,
                                render: (props) => {
                                    return <PaginationSlide {...props} />
                                }
                            }}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
};

export default React.memo(HomeScreen);
