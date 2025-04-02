import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BackButtonBackHome } from "../Universal/Buttons/BackButtonBackHomeModified";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { dealer } from "./Interfaces/Interface";
import { useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import DealerListItem, { onPressDealerProps } from "./DealerList/DealerListItem";
import { useFocusEffect } from "@react-navigation/native";
import Menu, { MenuHandle } from "../Universal/Menu/Menu";
import ErrorSearch from "./ErrorSearch/ErrorSearch";
import SearchBarWhereToBuy from "../Universal/searchBars/SearchBarWhereToBuy";
import FormMenuDealer from "./FormMenuDealer/FormMenuDealer";
// import { Searcher } from "../Universal/API/Context-API/AppProvider";



const WhereToBuy = ({ navigation }) => {
    const { scaleAll, leftSlideOut, isTooBigVersion, currentWidth, dealersList} = useAppContext();
    // const scaleAll = 1;
    const { height, width } = useWindowDimensions();
     // Определяем мобильное устройство
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["33%", "50%"], []);
    const [selected, setSelected] = useState<dealer | null>(null)

    const [defaultState] = useState<defaultPosition>({
        center: [59.9311, 30.3609], // Санкт-Петербург
        zoom: 14,
    });

    const onPressDealer = ({ dealer, position }: onPressDealerProps) => {
        
        refMenu.current?.setHeaderText(dealer.name)
        refMenu.current?.setMenuItems(
            <FormMenuDealer dealer={dealer}/>
        )
        refMenu.current?.openMenu(position)
        setSelected(dealer)
        
    };

    

    useFocusEffect(
        React.useCallback(() => {
            // bottomSheetRef.current?.expand()
            if(leftSlideOut){
                bottomSheetRef.current?.close()
            }else {
                bottomSheetRef.current?.snapToIndex(0)
            }
            return () => {
                // bottomSheetRef.current?.close();
            };
        }, [leftSlideOut])
    );


    const refBottomSheetScrollView = useRef<ScrollView>(null)
    const dealerRefs = useRef<{ [key: string]: View | null }>({}).current;

    const refMenu = useRef<MenuHandle>(null)

    const [query, setQuery] = useState('')

    const [localDealerList, setLocalDealerList] = useState<dealer[]>([])

    const [anotherSearcher, setAnotherSearcher] = useState(createrSearcher([])) 

    useEffect(() => {
        setLocalDealerList(dealersList)
        setAnotherSearcher(dealersList)
    }, [dealersList])
    

    useEffect(() => {
        if(query == '')
            setLocalDealerList(dealersList)
        else {
            const data = anotherSearcher.search(query, {returnMatchData: true, threshold: 0.65})
            setLocalDealerList(data.map(d => d.item))

            
            
            console.log(data)
        }
    }, [query])



    const mapRef = useRef<ymaps.Map>(null)


    const interval = useRef<null | number > (null)

    useEffect(() => {
        if(selected){
            if(interval.current)
                clearInterval(interval.current)
                console.log('selected', mapRef.current)


                if (mapRef.current) {
                    mapRef.current.setCenter(selected.coordinates, 12, { duration: 300 });
                }
            else {
                interval.current = window.setInterval(() => {
                    console.log('interval')
                    if (mapRef.current) {
                        mapRef.current.setCenter(selected.coordinates, 12, { duration: 300 });

                        if(interval.current)
                            clearInterval(interval.current )
                    }
                    
                }, 100)
            }
            
        }
        return () => {
            if(interval.current)
                clearInterval(interval.current )
        }
    }, [selected])


    useEffect(() => {
        const interval = setInterval(() => {
            if (bottomSheetRef.current) {
                console.log("Expanding BottomSheet");
                bottomSheetRef.current.expand();
                clearInterval(interval); // Stop checking once expanded
            }else {
                setRenderBottomSheet(false)
                setRenderBottomSheet(true)
            }
        }, 100); // Check every 100ms
    
        return () => clearInterval(interval); // Cleanup when unmounting
    }, []);



    const [renderBottomSheet, setRenderBottomSheet] = useState(false)
    return (
        <Pressable style={{ flex: 1,}} onPress={() => {
            console.log('click')
            refMenu.current?.closeMenu()
        }}>
           <Menu ref={refMenu}/>
            
             {/* <Portal>
                        
             <View style = {{backgroundColor: 'white', width: 10, padding: 10, borderRadius: 10, position: 'absolute'}}>
                                    <Text>TEST</Text>
                                    <Text>TEST</Text>
                                    <Text>TEST</Text>
                                    <Text>TEST</Text>
                                </View>
                            </Portal> */}

            {/* Кнопка назад */}
            <View style={{ position: 'absolute', zIndex: 1000, top: 10, left: 10 }}>
                <BackButtonBackHome navigation={navigation} />
            </View>

            {/* Карта */}

            <YMapsFullScreen
                width={width}
                mapRef_={mapRef}
                onClickMap={() => {
                    refMenu.current?.closeMenu()
                }}
                onClickMarks={({dealer, index, position}) => {
                    setSelected(dealer)
                    if(position){
                        console.log(position)
                        onPressDealer({dealer: dealer, position: position})
                    }
                }}
                selected={selected}
                setSelected={setSelected}
                dealerList={dealersList}
                defaultState={defaultState}
            />

            {currentWidth <= 700 ? (
                // BottomSheet для мобильных
                <Pressable 
                        onLayout={() => {setRenderBottomSheet(true)}}
                        onPress = {() => {
                            refMenu.current?.closeMenu()
                        }}
                        style={[StyleSheet.absoluteFill,{
                        zIndex: 100000}]} pointerEvents='box-none'
                        
                        >
                            {/* <View onLayout={() => {
                                setTimeout(() => setRenderBottomSheet(true), 300)
                            }}/> */}
                { renderBottomSheet &&   
                
                <BottomSheet
                        role='form'
                        
                        maxDynamicContentSize={height / 1.5}
                        ref={bottomSheetRef}
                        index={0} // По умолчанию открыт на 50%
                        snapPoints={snapPoints}

                        backgroundStyle={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                        handleIndicatorStyle={{
                            backgroundColor: "#ccc",
                            width: 50,
                        }}
                        handleStyle={{
                            backgroundColor: 'white',
                            height: 30
                        }}
                    // containerHeight={1}
                >
                    <BottomSheetScrollView
                        
                        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20, }}
                        stickyHeaderIndices={[0]}
                    >  
                        <View style = {{width: '100%', paddingVertical: 10, justifyContent: 'center', backgroundColor: 'white'}}>
                            <SearchBarWhereToBuy
                                query={query}
                                setQuery={setQuery}
                            />
                        </View> 
                        {localDealerList.length > 0 ?localDealerList.map((dealer, id) => (
                            <View  ref={(el) => { dealerRefs[id] = el }}>
                                <DealerListItem onPressDealer={onPressDealer} dealer={dealer} scaleAll={scaleAll} id = {id}/>
                            </View>
                        )) : <ErrorSearch  onPress={() => {setQuery('')}} scaleAll={scaleAll}/>}

                    </BottomSheetScrollView>
                </BottomSheet>}
                </Pressable>
            ) : (
                // Боковая панель для десктопа
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    right: 0,
                    width: isTooBigVersion ? 500 : 400,
                    height: '100%',
                    padding: 10,
                    borderLeftWidth: 1,
                    borderColor: '#ccc',
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: 3
                }}>
                    <ScrollView ref={refBottomSheetScrollView} showsVerticalScrollIndicator={false}  stickyHeaderIndices={[0]}>
                    <View style = {{width: '100%', paddingVertical: 10,paddingLeft: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                            <SearchBarWhereToBuy
                                query={query}
                                setQuery={setQuery}
                            />
                        </View> 
                        {localDealerList.length > 0 ? localDealerList.map((dealer, id) => (
                             <View  ref={(el) => { dealerRefs[id] = el }}>
                                <DealerListItem onPressDealer={onPressDealer} dealer={dealer} scaleAll={scaleAll} id = {id}/>
                            </View>
                        )) : <ErrorSearch onPress={() => {setQuery('')}} scaleAll={scaleAll}/>}
                    </ScrollView>
                </View>
            )}
        </Pressable>
    );
};

export default React.memo(WhereToBuy);








import { Searcher } from "../Universal/API/Context-API/AppProvider";
import YMapsFullScreen, { defaultPosition } from "../Universal/Yandex/Maps/YMapsFullScreen";
// import { dealersList } from "./Test/dealerList";

 const createrSearcher = (dealersList : dealer[]) => new Searcher(
        dealersList,
        {keySelector: (obj: dealer) => obj.address + obj.name + obj.webSites.join(' ') + obj.workTime.join(' ') + obj.phoneNumbers.join(' ')},
    );