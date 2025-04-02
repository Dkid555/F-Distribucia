import { ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import ImageWithAspectRatio from "../Universal/Image/ImageWithAspectRatio";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { webFont } from "../Universal/API/API";
import { UnitProps } from "./Components/Unit";
import { KKpolData } from "../Universal/API/Context-API/AppProvider";
import ListOfUnits from "./Components/ListOfUnits";



interface HomeScreenProps{
    navigation: any, route: any
}

export const formUnits = ({result, setUnits}:{
    result: KKpolData[],
    setUnits: (x: UnitProps['unit'][]) => any,
}) => {
    setUnits(
        result.map(res => ({
            description: `${res.fab} ${res.col} ${res.name}, ${parseInt(res.height)}x${parseInt(res.width)}, ${res.poverh}`,
            price: `${res.price} р/${res.ed}`,
            url: `${res.uri_full}`,
            unit: res
        }))
    )
}
const HomeScreen:React.FC<HomeScreenProps> = ({navigation, route}) => {
    const {scaleAll, isSmallVersion, isTooBigVersion, allUnitData} = useAppContext()
    
    const [lastUnits, setUnits] = useState<UnitProps['unit'][]>([]);

    useEffect(() => {
        if(allUnitData){
            const result = Object.values(allUnitData).sort(
                (data, data2) => {
                    return parseInt(data2.id) - parseInt(data.id)
                }
            ).slice(30)

            formUnits({
                setUnits,
                result
            })
        }
    }, [allUnitData])
  


    return(
        <ScrollView style= {{flex: 1,backgroundColor: 'white'}}>
            {/* Top Image */}
            <ImageWithAspectRatio
                aspectRatio={1920 / 540}
                minHeight={10 * scaleAll}
                source={{
                    uri: isTooBigVersion ? require('./../../assets/Images/HomeScreenNewBig.jpg') : require('./../../assets/Images/HomeScreenNew.jpg'),
                    priority: 'high'
                }}
            />
            <View style={{marginHorizontal: (!isSmallVersion? 35 : 20 ) * scaleAll, marginTop: (!isSmallVersion ? 37 : 20 )* scaleAll}}>
                <Text style = {
                    {
                        marginBottom: 10 *scaleAll,
                        fontFamily: webFont('Inter'),
                        fontSize: 18 * scaleAll,
                        color: 'black',
                        fontWeight: '600'
                    }
                }>
                    Новинки
                </Text>

               <ListOfUnits listOfUnis={lastUnits} navigation={navigation}/>
            </View>
        </ScrollView>
    )
}

export default React.memo(HomeScreen);



