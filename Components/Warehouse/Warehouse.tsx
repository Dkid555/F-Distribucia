import { Box } from "native-base";
import React from "react";
import { WebView } from "react-native-webview"; // Install if you haven't
import { DefaultBackButton } from "../Universal/Buttons/BackButtonBackHomeModified";



const Warehouse = ({navigation, route}) => {


    return (
    <>
    <DefaultBackButton navigation={navigation}/>
    <Box flex={1} paddingTop={'40px'}>
        <iframe
          src={'https://docs.google.com/spreadsheets/d/1_WpQB6tO1jOml9DtfJFx0vOLa2Xt9UEE6FaugNa8b3s/edit?gid=1104453248#gid=1104453248?widget=true&headers=false'}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Google Sheet"
          allowFullScreen
        />
        
    </Box></>)
}

export default Warehouse