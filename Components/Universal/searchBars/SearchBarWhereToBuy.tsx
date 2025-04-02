import { Search, X } from "lucide-react-native"
import React from "react"
import { Searchbar } from "react-native-paper"
import { useAppContext } from "../API/Context-API/AppContext"

interface SearchBarWhereToBuy{
    query: string, 
    setQuery:(x: string) => any
}

const SearchBarWhereToBuy:React.FC<SearchBarWhereToBuy> = (
    {query, setQuery}
) => {


    const {SearchBarTopActive} = useAppContext()


    return (
        <Searchbar 
        editable = {!SearchBarTopActive}
        value={query} icon={() => <Search size={16}/>} 
        caretHidden={true}
        clearIcon={() => query.length > 0 ? <X size={16}/> : <></>}
        style={{
            height: 39,
            borderRadius: 10,
            backgroundColor: '#F9F9F9',
            borderWidth: 0.5,
            borderColor: '#b7a9a9',
        }}

        inputStyle={{
            height: 39,
            padding: 0,
            fontSize: 16,
            lineHeight:16,
            textAlignVertical: 'center',
            minHeight: 20
        }}
        
    
        onChangeText={(text) => {setQuery(text)}}
        textAlignVertical='center'
        placeholder="поиск"
        
        placeholderTextColor={'#383838ad'}
        textContentType='addressCityAndState'
        
    />
    )
    
}


export default React.memo(SearchBarWhereToBuy)