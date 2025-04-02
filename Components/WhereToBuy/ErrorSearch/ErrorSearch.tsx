import React from "react";
import PressableWrapp from "../../Universal/Buttons/PressableReact/PressableWrapp";
import { SearchX } from "lucide-react-native";
import { Text } from "react-native";
import { webFont } from "../../Universal/API/API";


interface ErrorSearch {
    scaleAll: number,
    onPress?: () => any
}
 
const ErrorSearch: React.FC<ErrorSearch> = ({scaleAll, onPress}) => {

    return (
        <PressableWrapp onPress={onPress} style = {{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 10, gap: 10}}>
                            <SearchX color={'black'} size={20}/>
                            <Text style = {{fontFamily: webFont('Inter'), fontSize: 16 * scaleAll, color: 'black'}}>Ничего не найдено</Text>
                        </PressableWrapp>
    )
}

export default React.memo(ErrorSearch)