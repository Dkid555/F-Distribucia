import React, { useImperativeHandle, useRef } from "react";
import { Box, Button, HStack, Text, View } from "native-base";
import { useAppContext } from "../../../../../Universal/API/Context-API/AppContext";
import SimpleCenteredSpinner from "../../../../../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";
import CollectionSmall from "../CollectionsSmall/CollectionsSmall";
import { PressableWrap } from "../../../../../Universal/Buttons/PressableColorWrap/PressableColorWrap";
import { NavigateTo } from "../../../../../Universal/API/API";
import Arrows from "../../../../../Universal/Arrows/Arrows";
import ViewSmooth from "../../../../../Universal/View/ViewSmooth";
import ButtonSeeAll from "../ButtonSeeAll/ButtonSeeAll";

interface CollectionsFromTopProps {
    navigation: any;
}

export interface hanldeCollectionsFromTop{
    getIsHovered: () => boolean
}

const CollectionsFromTop: React.FC<CollectionsFromTopProps> = React.forwardRef<hanldeCollectionsFromTop, CollectionsFromTopProps>(({ navigation }, ref) => {
    const { allCollectionsData, isSmallVersion,isMediumVersion, scaleAll } = useAppContext();

    if (!allCollectionsData) {
        return <SimpleCenteredSpinner scaleAll={scaleAll} width={20} height={20} />;
    }

    const imageSize = isSmallVersion ? 140 : isMediumVersion ? 180 : 200;
    // const [isHoverdesetIsHo]


    const hoverCount = useRef(0); // Track hover state

    useImperativeHandle(ref, () => ({
        getIsHovered: () => hoverCount.current > 0 
    }))
    return (
        <Box p={2}>
            <HStack flexWrap="wrap" justifyContent="center" space={4}>
                {Object.values(allCollectionsData).slice(0,6).map((collection, index) => (
                    <PressableWrap 
                    
                    onHoverIn={() => {
                        ++hoverCount.current;
                    }}  
                    onHoverOut={() => {
                        --hoverCount.current;
                    }}
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
                        <CollectionSmall key={index} collection={collection} imageSize={imageSize} />
                    </PressableWrap>
                ))}

               
            </HStack>
            <ButtonSeeAll
            onPress={() => {
                NavigateTo({
                    navigation, 
                    goTo: 'Collections'

                })
            }}  
            onHoverIn={() => {

                ++hoverCount.current;
            }}  
            onHoverOut={() => {
                --hoverCount.current;
            }}
            />  
                 
        </Box>
    );
});

export default CollectionsFromTop;
