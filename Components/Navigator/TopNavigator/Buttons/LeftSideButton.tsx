import React, { useState } from "react";
import { TopButtonProps } from "./TopButton";
import { ColorValue } from "react-native";
import { PressableWrap } from "../../../Universal/Buttons/PressableColorWrap/PressableColorWrap";
import { Text } from "native-base";
import { webFont } from "../../../Universal/API/API";
import { useAppContext } from "../../../Universal/API/Context-API/AppContext";

export const LeftSideButton: React.FC<TopButtonProps> = ({ text, onPress }) => {
    const {currentWidth: width, scaleAll} = useAppContext()
    const [color, setColor] = useState<ColorValue>("#1E1E1E");

    // Responsive sizing
    const textSize = width > 800 ? 20 * scaleAll : 15 * scaleAll;
    const paddingVertical = width > 800 ? 24 * scaleAll : 20 * scaleAll;
    const marginVertical = width > 800 ? 14 * scaleAll : 10 * scaleAll;

    return (
        <PressableWrap

            onPress={() => { if (onPress) onPress(); }}
            setColor={setColor}
            style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: marginVertical,
                paddingVertical: paddingVertical,
            }}
        >
            <Text
                style={{
                    fontSize: textSize,
                    marginVertical: 20 * scaleAll,
                    fontFamily: webFont("Inter"),
                    fontWeight: "600",
                    color: color,
                }}
            >
                {text}
            </Text>
        </PressableWrap>
    );
};
