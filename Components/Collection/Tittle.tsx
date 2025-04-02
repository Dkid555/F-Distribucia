import { Box, Text } from "native-base";
import React  from "react";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { webFont } from "../Universal/API/API";



interface TitleProps{
    text: string
}
const Title:React.FC<TitleProps> = ({text}) => {
    const {scaleAll, isMediumVersion, isSmallVersion}  = useAppContext()
    return (
        <Box width={'full'} justifyContent={'center'} alignItems={'center'} height={'1/10'}>
                    
                    <Text fontSize={
                        isSmallVersion ? 'xl' : isMediumVersion? '2xl' :  
                        '3xl'} style={{fontFamily: webFont('Inter'), color: 'black', marginVertical: 10* scaleAll}}>{text}</Text>
                        
                </Box>
    )
}

export default React.memo(Title);