import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { BackButtonBackHome } from "../Universal/Buttons/BackButtonBackHomeModified";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import ListOfUnits from "../HomeScreen/Components/ListOfUnits";
import { formUnits } from "../HomeScreen/HomeScreen";
import { UnitProps } from "../HomeScreen/Components/Unit";
import { webFont } from "../Universal/API/API";
import NothingFound from "./NothingFound/NothingFound";
import SimpleCenteredSpinner from "../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";




interface SearchPageProps{
    route: any,
    navigation: any
}


const SearchPage:React.FC<SearchPageProps> = ({route, navigation}) => {


    const {query} = route.params
    const {SearcherUnit, isMediumVersion, isSmallVersion, isTooBigVersion} = useAppContext()

    const [units, setUnits] = useState<UnitProps['unit'][]| null>(null)
    useEffect(() => {
        if(SearcherUnit){
            const data = SearcherUnit.search(query, {returnMatchData: true, threshold: 0.65})
            const units = data.map(d => d.item)
            formUnits(
                {
                    result: units,
                    setUnits: setUnits
                }
            )

            console.log('units', units)

        }
    }, [SearcherUnit, query])

    return (
    <View style ={{flex: 1,}}>
        <View style ={{position: 'absolute', zIndex: 10000}}><BackButtonBackHome navigation={navigation} JustResetToHome={true}/></View>

        <View style = {{height: 80, justifyContent: 'center', alignItems: 'center', }}>
            <Text style = {{fontFamily: webFont('Inter'), fontSize : isSmallVersion ? 20 : 30, fontWeight: '400' }}>
                {`Запрос: `}<Text style={{fontWeight: '700'}}>{`${query}`}</Text>
            </Text>
        </View>
        {units && units.length > 0 ?  <ListOfUnits navigation={navigation} listOfUnis={units}/>  : (units && units.length == 0 ? <NothingFound/> : <View style = {{flex: 1}}><SimpleCenteredSpinner scaleAll={1} height={30} width={30}/></View> )}
    </View>)
}

export default React.memo(SearchPage)
