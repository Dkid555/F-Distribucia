import React from "react";
import { useAppContext } from "../API/Context-API/AppContext";
import BackButton from "./BackButton";
import { NavigateTo, NavigationHomeWithReset } from "../API/API";


interface BackButtonBackHomeProps{
    navigation: any
    JustResetToHome?: boolean 
}

export const BackButtonBackHome:React.FC<BackButtonBackHomeProps> = React.memo(({navigation, JustResetToHome = false}) => {
    const stackCount = navigation.getState().routes.length;
    const {isSmallVersion, scaleAll, isMediumVersion} = useAppContext()
    return (
      <BackButton customEvent={() => {
        // console.log('trs')
            (!JustResetToHome && stackCount > 1) ? navigation.pop() : NavigationHomeWithReset({
                navigation, data: {}
            })
        }} 
        text={
            (!JustResetToHome && stackCount > 1) ? 'Назад': 'Домой'
        }
        style={{
            Container: {
                left: isSmallVersion ? 0 : 20
            },
            text: {
                fontSize: isSmallVersion ? 15 * scaleAll : isMediumVersion? 14 * scaleAll :  16 * scaleAll
            }
        }}/>
    )
  })