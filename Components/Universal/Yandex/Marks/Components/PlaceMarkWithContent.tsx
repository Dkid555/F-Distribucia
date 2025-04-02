import { Placemark } from "@pbe/react-yandex-maps";
import React, { useRef } from "react";
import { dealer } from "../../../../WhereToBuy/Interfaces/Interface";
import { View } from "react-native";
import { Map} from "@pbe/react-yandex-maps";
import { useAppContext } from "../../../API/Context-API/AppContext";

export interface PlaceMarkWithContentProps{
    index: number,
    dealer: dealer
    selected?: boolean
    onClick?: ({dealer, index, position}:{dealer: dealer, index: number, position: {
        x: number, y: number, height: number, width: number
    }}) => any
    mapRef: React.RefObject<ymaps.Map>; // Pass the Map instance reference
}

const PlaceMarkWithContent:React.FC<PlaceMarkWithContentProps> = ({
    index, dealer, selected = false, onClick, mapRef
}) => {
    const {currentHeight, currentWidth} = useAppContext()

    return (
        <Placemark
                    key={index}                    
                    // onClick = {() => {
                        
                    //     console.log(mapRef.current)
                    //     if (onClick &&  mapRef.current) {
                    //         const coords = dealer.coordinates;
                    //         // Get the pixel position on the screen
                    //         const screenPos = mapRef.current.converter.globalToPage(coords);
                            
                    //         console.log(coords, screenPos)

                    //         // Get bounding box dimensions of the Placemark
                    //         // const placemarkElement = refInstance.current.getOverlaySync()?.getLayoutSync()?.getParentElement();
                    //         if (true) {
                    //             const rect = {height: 10, width: 10}//placemarkElement.getBoundingClientRect();
                    //             onClick({
                    //                 dealer,
                    //                 index,
                    //                 position: {
                    //                     x: screenPos[0],
                    //                     y: screenPos[1],
                    //                     width: rect.width,
                    //                     height: rect.height
                    //                 }
                    //             });
                    //         }
                    //     }
                    //     // if(onClick)
                    //     //     onClick({dealer, index})
                    // }}
                    onClick={() => {
                        if (onClick && mapRef.current) {
                            const coords = dealer.coordinates;
                            
                            // Ensure `converter` exists
                            if (!mapRef.current.converter) {
                                console.error("Converter not available on mapRef.current");
                                return;
                            }
                    
                            // Get screen position
                            // const screenPos = mapRef.current.converter.globalToPage(coords);
                            // const screenPos = mapRef.current.options.get('projection').toGlobalPixels(coords, mapRef.current.getZoom());

                            const screenPos = [
                               currentWidth / 2,
                               currentHeight /2
                            ]
                            // Try to get the Placemark's bounding box
                            const placemarkElement = document.querySelector(`[data-placemark-index="${index}"]`);
                            let rect = { height: 10, width: 10 }; // Default size
                            
                            if (placemarkElement) {
                                rect = placemarkElement.getBoundingClientRect();
                            } else {
                                console.warn("Placemark element not found for index:", index);
                            }
                            setTimeout(() => {
                                onClick({
                                    dealer,
                                    index,
                                    position: {
                                        x: screenPos[0],
                                        y: screenPos[1],
                                        width: rect.width,
                                        height: rect.height,
                                    },
                                });
                            }, 100)
                            
                        }
                    }}
                    
                    onHover = {() => {
                        // console.log(dealer)
                    }}
                    geometry={dealer.coordinates} // Ждановская ул., 45
                    properties={{
                        iconContent: index + 1,
                        // hintContent:  'Где купить?', // Подсказка при наведении
                        // balloonContentHeader: `${dealer.name}`, // Заголовок в баллоне
                        // balloonContentBody: `Адрес: ${dealer.address}`, // Описание
                        // balloonContentFooter: `График работы: ${dealer.workTime.join(", ")}`, // Доп. инфо внизу
                    }}
                   
                    options={{
                        preset: selected ? "islands#blueIcon" : "islands#redIcon", // Стиль метки
                        // hasBalloon: true,
                        // hasHint: true,
                        // openBalloonOnClick: true, // Открывать баллон при клике
                        // openHintOnHover: true,
                    }}
                />
    )
}


export default React.memo(PlaceMarkWithContent)