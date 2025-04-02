import { Text, useSafeArea, View } from "native-base";
import React, { useEffect, useState } from "react";
import { NavigateTo, webFont } from "../../../../../Universal/API/API";
import RhombusImage from "../Rhombus/Rhombus";
import { useAppContext } from "../../../../../Universal/API/Context-API/AppContext";
import SimpleCenteredSpinner from "../../../../../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";



interface AboutCompanyTopProps{
    navigation: any
}

const AboutCompanyTop:React.FC<AboutCompanyTopProps> = ({navigation}) => {

    const {allData,scaleAll} = useAppContext()
    const [about, setAbout] = useState(allData ? allData.about : null)
    useEffect(() => {
        if(allData && allData.about)
            setAbout(allData.about)
    }, [allData])
    return (
         <View style ={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 * scaleAll}}>
            {about ? 
            <>
                <View style = {{width: 300, justifyContent: 'center', alignItems: 'center'}}>
                <RhombusImage source={
                    {uri: about.about_small_image_address}
                }/>
                        </View>
                        <Text style = {{fontFamily: webFont('Inter'), fontSize: 14 * scaleAll, color: 'black'}}>
                            {
                                about.about_text_small.map((text, index) => {

                                    return (
                                        <Text>
                                            {text}
                                            {index ==  about.about_text_small.length - 1 ? 
                                            <Text onPress={() => {
                                                NavigateTo(
                                                    {
                                                        navigation,
                                                        goTo: 'About',
                                                        data: {}
                                                    }
                                                )
                                            }} color={'blue.400'}> Узнать больше</Text> : `\n\n`}
                                        </Text>
                                    )
                                })
                            }
                        </Text>
            </>: <SimpleCenteredSpinner scaleAll={scaleAll} height={20} width={20}/>}
            
        </View>
    )
}

export default AboutCompanyTop

