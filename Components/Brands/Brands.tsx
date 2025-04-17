import { Box, HStack, Text, VStack, Pressable, View, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import AppContext, { useAppContext } from "../Universal/API/Context-API/AppContext";
import { webFont } from "../Universal/API/API";
import Dash from "react-native-dash-2";
import FastImage from "@d11/react-native-fast-image";
import PressableWrapp from "../Universal/Buttons/PressableReact/PressableWrapp";
import { Linking } from "react-native";
import SearchBarWhereToBuy from "../Universal/searchBars/SearchBarWhereToBuy";
import { Brand } from "../Universal/API/Context-API/AppProvider";
import SimpleCenteredSpinner from "../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";
import Animated from "react-native-reanimated";
import BrandScroll from "./Components/BrandScroll";
import { BackButtonBackHome, DefaultBackButton } from "../Universal/Buttons/BackButtonBackHomeModified";

const Brands = ({ navigation, route }) => {
    const { currentWidth, isSmallVersion, SearcherBrands, brands } = useAppContext();


    const [query, setQuery] = useState('')


    const [filterdBrands, setFilteredBrands] = useState<Brand[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(brands && SearcherBrands){
            if(query.length > 0){
                const data = SearcherBrands.search(query, {returnMatchData: true, threshold: 0.65})

                console.log('data',data)
                setFilteredBrands(data.map(d => d.item))
            }else {
                setFilteredBrands(brands)
            }
            
        }
    }, [brands,SearcherBrands, query])


    useEffect(() => {
        if(filterdBrands){
            setIsLoading(false)
        }else {
            setIsLoading(true)
        }
    }, [
        filterdBrands
    ])

    

    return (
        <>
            <DefaultBackButton navigation={navigation}/>
            <Box flex={1} alignItems="center">
                <Box
                    maxWidth={isSmallVersion ? "full" : "900px"}
                    flex={1}
                    paddingTop="20px"
                >
                    
                    <Box >
                        <Text
                            color="rgb(31, 31, 31)"
                            fontSize="xl"
                            textAlign="center"
                            fontWeight='medium'
                            fontFamily={webFont("Inter")}
                        >
                            Наши Бренды
                        </Text>
                        <Box marginY={'10px'} width={isSmallVersion ? (currentWidth - 20) : Math.min(600, currentWidth - 20)} alignSelf={'center'}>
                            <SearchBarWhereToBuy query={query} setQuery={setQuery}/>
                        </Box>

                        <Dash
                            style={{ width: "100%", height: 1, marginTop: 6 }}
                            dashColor="rgb(32, 32, 32)"
                            dashGap={3}
                            dashLength={3}
                            dashThickness={1}
                        />

                        
                    </Box>
                    {filterdBrands && !isLoading ? 
                        <BrandScroll filterdBrands={filterdBrands}/>: 
                        <Box flex={1}>
                            <SimpleCenteredSpinner height={20} width={20}/>
                        </Box>}
                </Box>
            </Box>
        </>
    );
};


export default Brands;

