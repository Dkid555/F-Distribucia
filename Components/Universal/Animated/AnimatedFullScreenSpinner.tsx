import { Box } from "native-base";
import React from "react";
import SimpleCenteredSpinner from "../SimpleCenteredSpinner/SimpleCenteredSpinner";
import AnimatedOpacityWrapp from "./AnimatedOpacityWrapp";


const AnimatedFullScreenSpinner = () => {

    return (
        <AnimatedOpacityWrapp style={{flex: 1}}>
            <SimpleCenteredSpinner height={20} width={20}/>
        </AnimatedOpacityWrapp>
    )
}