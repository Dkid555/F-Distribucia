

import { View } from "native-base";
import React from "react";
import Unit, { UnitProps } from "./Unit";
import { NavigateTo } from "../../Universal/API/API";

interface ListOfUnitsProps{
    listOfUnis: UnitProps['unit'][] | null,
    navigation: any

}


const ListOfUnits:React.FC<ListOfUnitsProps> = ({
    listOfUnis, navigation
}) => {

    return (
        listOfUnis && <View style = {{
            flexDirection: 'row',
            gap: 0,
            flexWrap: 'wrap',
            // justifyContent: 
        }} >
        {listOfUnis.map(unit => {
            return (
                <Unit unit={unit}
                onPress={() => {
                    NavigateTo({navigation, goTo: 'Unit', data: 
                        {
                        idUnit: unit.unit.id
                    }})
                }}
                />
            )
        })}
        
        </View>
    )
}

export default ListOfUnits