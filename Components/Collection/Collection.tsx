import { Box, Modal, Pressable, Text, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { UnitProps } from "../HomeScreen/Components/Unit";
import { webFont } from "../Universal/API/API";
import { formUnits } from "../HomeScreen/HomeScreen";
import ListOfUnits from "../HomeScreen/Components/ListOfUnits";
import { AutoHeighImage, AutoWidthImage } from "../Universal/Image/AutoWidthImage";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { PressableWrap } from "../Universal/Buttons/PressableColorWrap/PressableColorWrap";
import { Portal } from "react-native-alves-portal";
import { useWindowDimensions } from "react-native";
import { BackButtonBackHome } from "../Universal/Buttons/BackButtonBackHomeModified";
import Title from "./Tittle";

interface CollectionProps {
    navigation: any,
    route: any
}


const Collection:React.FC<CollectionProps> = ({navigation, route}) => {

    const {scaleAll, allUnitData, allCollectionsData, currentWidth, currentHeight, isMediumVersion, isSmallVersion} = useAppContext()

    const {collection_name} = route.params

    console.log('collection', collection_name)
    const [listUnits, setListUnits] = useState<UnitProps['unit'][]| null>(null)

    const [collection, setCollection] = useState(allCollectionsData ? allCollectionsData[collection_name] : null)

    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    useEffect(() => {

        if(allCollectionsData){
            setCollection(allCollectionsData ? allCollectionsData[collection_name] : null)
        }
        
        if(allUnitData){
            
            formUnits(
                {
                    setUnits: setListUnits,
                    result:  Object.values(allUnitData).filter(
                        unit => {
                            return unit.col == collection_name
                        }
                    )
                }
            )
           
        }
    }, [allUnitData, allCollectionsData, collection_name])

    const swiperRef = useRef<SwiperFlatList>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

    
    return (<View style = {{flex: 1}}>

            <View style={{position: 'absolute', width: '100%', zIndex: 1000}}><BackButtonBackHome navigation={navigation}/></View>
        
            {
                <Title text={collection_name}/>}
                
                {collection && 
                <Box  width={'full'} justifyContent={'center'} alignItems={'center'} >
                    
                    <SwiperFlatList
                            ref={swiperRef}
                            data={collection.collection_full_image_gallery_slides}
                            centerContent
                            keyExtractor={(item, index) => index.toString()}
                            style={{
                                width: '100%',
                                marginBottom: 10 * scaleAll,
                            }}
                            renderItem={({ item, index }) => (
                                <PressableWrap activeOpacity={0.9} onPress={() => {
                                    setSelectedImage(item);
                                    setIsModalVisible(true);
                                }}>
                                    <AutoWidthImage height={
                                        isSmallVersion ? 200 : isMediumVersion? 350 :  500} scaleAll={scaleAll} source={{ uri: item }} />
                                </PressableWrap>
                            )}
                        />
                    
               
                </Box>}
                {/* Fullscreen Modal for the selected image */}
                <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} width={currentWidth} height={currentHeight} 
                     backdropVisible={false} // Ensure backdrop is enabled
                     
                    >

                <Pressable style={{ flex: 1, width:'100%', backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }} onPress={() => setIsModalVisible(false)}>
                <Modal 
                    isOpen={isModalVisible} 
                    onClose={() => setIsModalVisible(false)} 
                    width={screenWidth} 
                    height={screenHeight} 
                    backdropVisible={true} 
                >
                    <Pressable 
                        style={{
                            flex: 1, 
                            width: '100%', 
                            backgroundColor: 'rgba(0,0,0,0.5)', 
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }} 
                        onPress={() => setIsModalVisible(false)}
                    >
                        {selectedImage && (
                            <Pressable onPress={() => {
                                if(collection && collection.collection_full_image_gallery_slides){
                                    const index = collection.collection_full_image_gallery_slides.findIndex(x => x == selectedImage)                                    
                                    if(index < collection.collection_full_image_gallery_slides.length - 1){
                                        setSelectedImage(collection.collection_full_image_gallery_slides[index + 1])
                                    }else {
                                        setSelectedImage(collection.collection_full_image_gallery_slides[0])
                                    }
                                }
                            }}>
                                <AutoHeighImage 
                                    width={Math.min(screenWidth * 0.9, 1000)} 
                                    scaleAll={scaleAll} 
                                    source={{ uri: selectedImage }} 
                                    maxHeight = {screenHeight}
                                />
                            </Pressable>
                        )}
                    </Pressable>
                </Modal>
                    </Pressable>
            </Modal>
            <ListOfUnits navigation={navigation} listOfUnis={listUnits}/>

            
    </View>)
}
export default React.memo(Collection)
