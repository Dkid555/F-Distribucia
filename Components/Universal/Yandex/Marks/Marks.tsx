import React from "react";
import { dealer } from "../../../WhereToBuy/Interfaces/Interface";
import { Placemark } from "@pbe/react-yandex-maps";
import PlaceMarkWithContent, { PlaceMarkWithContentProps } from "./Components/PlaceMarkWithContent";
import { isEqual } from "lodash";



interface Marks {
    dealersList: dealer[],
    selected: dealer | null
    onClick?: PlaceMarkWithContentProps['onClick']
    mapRef?: PlaceMarkWithContentProps['mapRef']
}

const Marks: React.FC<Marks> = ({dealersList, selected, onClick, mapRef}) => {
    return (
        dealersList.map((dealer, index) => {
            return(
                <PlaceMarkWithContent
                mapRef = {mapRef}
                dealer={dealer} onClick={onClick} index={index} selected = {isEqual(selected?.coordinates, dealer.coordinates)}/>
            )
        })
    )
}

export default React.memo(Marks)