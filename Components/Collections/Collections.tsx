import { HStack, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { BackButtonBackHome } from '../Universal/Buttons/BackButtonBackHomeModified'
import { useAppContext } from '../Universal/API/Context-API/AppContext';
import SimpleCenteredSpinner from '../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner';
import { PressableWrap } from '../Universal/Buttons/PressableColorWrap/PressableColorWrap';
import { NavigateTo } from '../Universal/API/API';
import CollectionSmall from '../Navigator/TopNavigator/TopSlideOut/Components/CollectionsSmall/CollectionsSmall';
import Title from '../Collection/Tittle';
import Dash from 'react-native-dash-2';

interface CollectionsProps{
    navigation: any, route: any
}

const Collections:React.FC<CollectionsProps> = ({
    navigation, route
}) => {

    const { allCollectionsData, isSmallVersion,isMediumVersion, scaleAll } = useAppContext();

    const [render, setRender] = useState(false)

    useEffect(() => {
        setTimeout(() => setRender(true), 300)
    }, [])

    return (
        <View style ={{flex: 1, backgroundColor: 'white'}}>

            <View style = {{position: 'absolute', width: '100%', left: 0,zIndex: 10000}}><BackButtonBackHome navigation={navigation}/></View>
            <Title text='Коллекции Creatile'/>
            <Text textAlign="center" fontSize={isSmallVersion ? "sm" : isMediumVersion ? "md" : "lg"} color="gray.600" px={4} mt={2}>
                Ознакомьтесь с широким ассортиментом плитки CREATILE. В нашем каталоге представлены коллекции с разнообразными текстурами, 
                оттенками и форматами, идеально подходящие для любых интерьеров.
            </Text>

            <Dash style={{ width: isSmallVersion ? '100%' : '80%', marginHorizontal: 'auto', marginVertical: 10 * scaleAll }} dashColor='grey' dashGap={4} dashLength={4} dashThickness={1} />
            
            {
                (!allCollectionsData || !render) && <SimpleCenteredSpinner scaleAll={scaleAll} width={20} height={20} />
            }
            {
                render && allCollectionsData && 
                <>
                   <HStack flexWrap="wrap" justifyContent="center" role='banner' maxWidth={1600} alignSelf={'center'}>
                        {Object.values(allCollectionsData).map((collection, index) => (
                            <PressableWrap 
                            style={{marginBottom: 10, margin: 4 }}
                            activeOpacity={0.7} onPress={() => {
                                NavigateTo({
                                    navigation,
                                    goTo: 'Collection',
                                    data: {
                                        collection_name: collection.collection_name
                                    }
                                })
                            }}
                                        PressableProps={{
                                            style: {
                                                // zIndex:-1
                                            }
                                        }}
                                    >
                                <CollectionSmall key={index} collection={collection} 
                                imageSize={
                                    isSmallVersion ? 150 : isMediumVersion ? 250 : 
                                    350} />
                            </PressableWrap>
                        ))}
                     </HStack>
                </>
            }
        </View>
    )
}

export default React.memo(Collections)