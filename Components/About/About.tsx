import React, { useEffect, useState } from "react";
import { Box, Text, VStack, View } from "native-base";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { AutoWidthImage } from "../Universal/Image/AutoWidthImage";
import SimpleCenteredSpinner from "../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";
import { BackButtonBackHome } from "../Universal/Buttons/BackButtonBackHomeModified";

interface AboutProps {
  navigation: any;
  route: any;
}

const About: React.FC<AboutProps> = ({ navigation, route }) => {
  const { isSmallVersion, isMediumVersion, scaleAll, allData } = useAppContext();

  const [about, setAbout] = useState(allData?.about)


  const [sections, setSections] = useState<any>(null) 
    useEffect(() => {
        if(allData && allData.about){
            setAbout(allData.about)
        }
    }, [allData])
    useEffect(() => {
        if(about && about.about_big_sections){
            setSections(about.about_big_sections)
        }
    },[about])


  return (
    <View>
        <BackButtonBackHome navigation={navigation}/>
        <View marginTop={5}
        marginBottom={5}>
             <AutoWidthImage scaleAll={scaleAll} source={{
            // uri: 'https://plitkazavr.ru/images/Creatile/Whites/Creatile-Whites-5f.jpg',
            uri: require('./../../assets/Images/logo_creatile_big.jpeg')
        }} height={100}/>
        </View>
        
        
         <Box  maxW={isMediumVersion ? "80%" : "100%"} alignSelf="center">
       
       {sections ? sections.map((section, index) => (
         <VStack key={index} space={3} mb={5}>
           <Text fontSize={isSmallVersion ? "lg" : "xl"} fontWeight="bold">
             {section.title}
           </Text>
           {section.content.map((paragraph, idx) => (
             <Text key={idx} fontSize={isSmallVersion ? "md" : "lg"}>
               {paragraph}
             </Text>
           ))}
         </VStack>
       )) : <SimpleCenteredSpinner scaleAll={scaleAll} height={20} width={20}/>}
     </Box>
    </View>
     
  );
};

export default React.memo(About);
