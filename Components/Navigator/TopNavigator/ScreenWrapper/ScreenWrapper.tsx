

import React, { RefObject, useEffect, useRef, useState } from "react";
import {useWindowDimensions} from 'react-native';
import { Box, ScrollView, View} from "native-base";
import TopNavigator, { handleTopNavigator, heightOfTopNav } from "../TopNavigator";
import { useNavigation } from "@react-navigation/native";
import SlideOutMenu, { hanldeSlideOutMenu, option } from "../SlideOutMenu/SlideOutMenu";
import TopSlideOut, { handleTopSlideOut } from "../TopSlideOut/TopSlideOut";
import AboutCompanyTop from "../TopSlideOut/Components/Fill/AboutCompanyTop";
import { useAppContext } from "../../../Universal/API/Context-API/AppContext";
import { NavigateTo, sleep } from "../../../Universal/API/API";
import CollectionsFromTop, { hanldeCollectionsFromTop } from "../TopSlideOut/Components/Fill/CollectionsFromTop";


const ScreenWrapper: React.FC<any> = ({ children,  route }) => {    
    console.log("ScreenWrapper route params:", route?.params);
    const {scaleAll, isSmallVersion} = useAppContext();
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    
    const navigation = useNavigation()

    const onHoverOut = ({
        screen,
        refTopSlideOut_ = refTopSlideOut
    }: { screen: string; refTopSlideOut_?: RefObject<handleTopSlideOut> }) => {
        setTimeout(() => {
            const refSlide = refTopSlideOut_.current;
            const refNavigator = refTopNavigator.current;
            const refCollections = refCollectionsFromTop.current;
    
            if (!refSlide || !refNavigator) {
                // console.warn(`onHoverOut: отсутствуют ссылки на ref для ${screen}`);
                return;
            }
    
            const isHovered = refSlide.isHovered() ?? false;
            const buttonHovered = refNavigator.buttonHovered() ?? {};
            const isButtonHovered = buttonHovered[screen] ?? false;
            const isCollectionsHovered = screen === 'Каталог' ? refCollections?.getIsHovered() ?? false : false;
    
            // console.log(`[onHoverOut] ${screen} ->`, { isHovered, isButtonHovered, isCollectionsHovered });
    
            if (!isHovered && !isButtonHovered && !isCollectionsHovered) {
                // console.log(`onHoverOut: скрываем ${screen}`);
                refSlide.setDoAnimation(false);
            }
        }, 200);
    };
    

    const refInterval = useRef<number | null>(null)
    useEffect(() => {
        if(refInterval.current){
            clearInterval(refInterval.current)
        }

        refInterval.current = window.setInterval(() => {
            // console.log('JJJJJ')
            onHoverOut({screen: "О компании", refTopSlideOut_: refTopSlideOut})
            onHoverOut({screen: "Каталог", refTopSlideOut_:  refTopSlideOutCatalog})
        }, 2000)

        return (() => {
            if(refInterval.current){
                clearInterval(refInterval.current)
            }
        })
    }, [])
    const optionsFunction = ({
        variant = "top",
    }: {
        variant: "top" | "left";
    }): option[] => [
        {
            text: "О компании",
            onPress: () => {
                refSlideOutMenu.current?.setDoAnimation(false)
                NavigateTo(
                    {
                        navigation, 
                        goTo: 'About',
                    }
                )

            },
            onHoverIn: () => {
                if (variant === "top") {
                    console.log("onHoverIN");
                    setZindeCatalog(2)
                    setZindexAboutCompany(3)
                    setTimeout(() => {
                        setTopSlideOutChild(
                            <AboutCompanyTop navigation={navigation} scaleAll={scaleAll} />
                        );
                        if (
                            refTopNavigator.current?.buttonHovered() &&
                            refTopNavigator.current?.buttonHovered()['О компании'] == true
                        ) {
                            console.log(refTopNavigator.current?.buttonHovered())
                            if(refTopSlideOut.current){
                                console.log('do it')
                                refTopSlideOut.current?.setDoAnimation(true)
                            }
                        }else {

                        }

                    }, 200)
                    
                }
            },
            onHoverOut: async () => {
                
                
                // onHoverOut('О компании')
                
            },
        },
        {
            text: "Каталог",
            onPress: () => {
                refSlideOutMenu.current?.setDoAnimation(false)
                NavigateTo(
                    {
                        navigation, 
                        goTo: 'Collections',
                    }
                )
            },
            onHoverIn: () => {
                if (variant === "top") {
                    console.log("onHoverIN");
                    
                    console.log(131)

                    setTimeout(() => {
                        // setTopSlideOutChild(
                        //     <AboutCompanyTop navigation={navigation} scaleAll={scaleAll} />
                        // );
                        if (
                            refTopNavigator.current?.buttonHovered() &&
                            refTopNavigator.current?.buttonHovered()['Каталог'] == true
                        ) {
                            setZindeCatalog(3)
                            setZindexAboutCompany(2)
                            console.log(refTopNavigator.current?.buttonHovered())
                            console.log('do it')
                            refTopSlideOutCatalog.current?.setDoAnimation(true)
                        }else {

                        }

                    }, 200)
                }
            },
            onHoverOut: () => {
                // onHoverOut('Каталог', refTopSlideOutCatalog)
            },
        },
        {
            text: "Где купить",
            onPress: () => {
                refSlideOutMenu.current?.setDoAnimation(false)
                NavigateTo(
                    {
                        navigation, 
                        goTo: 'WhereToBuy',
                    }
                )
            },
            onHoverIn: () => {},
            onHoverOut: () => {},
        },
        {
            text: "Контакты",
            onPress: () => {
                NavigateTo(
                    {
                        navigation, 
                        goTo: 'Contacts',
                    }
                )
            },
            onHoverIn: () => {},
            onHoverOut: () => {},
        },
    ];



    

    const [zIndexCatalog, setZindeCatalog] = useState(3)
    const [zIndexAboutCompany, setZindexAboutCompany] = useState(4)
    const refSlideOutMenu = useRef<hanldeSlideOutMenu>(null)

    const refTopSlideOut = useRef<handleTopSlideOut>(null)

    const refTopSlideOutCatalog = useRef<handleTopSlideOut>(null)


    const options = optionsFunction({
        variant: 'left'
    })
    const options_top = optionsFunction({
        variant: 'top'
    })

    const [topSlideOutChild, setTopSlideOutChild] = useState<React.ReactNode>(null)
    const refTopNavigator = useRef<handleTopNavigator>(null)

    const CloneTopSlideOut = (TopSlideOut)

    const refCollectionsFromTop = useRef<hanldeCollectionsFromTop>(null)
    return (
        <Box
            // safeArea={true}
            style={{
                position: 'relative',
                // flex: 1,  // Full height
                height: windowHeight ?? '100vh', 
                width: windowWidth ?? '100vw',

                // ensure parity between rn.web and rn.native regarding requiring a scrollview in order to have scrolling
                overflow: 'hidden',
                backgroundColor: 'white' //"#F9F9F9",
            }}
        >   
        {options && <SlideOutMenu options = {options} ref={refSlideOutMenu}/>}

        {/* О компании */}
             {
                // <View style={{position: 'absolute', width:'100%', zIndex: zIndexAboutCompany, top: heightOfTopNav(isSmallVersion)}}>
                //     <TopSlideOut onHoverOut={() => {
                //         onHoverOut({screen: 'О компании'})
                //     }} ref={refTopSlideOut} children={topSlideOutChild}/>
                // </View>
                }
        
        {/* Каталог */}
        {
                // <View style={{position: 'absolute', width:'100%', zIndex: zIndexCatalog, top: heightOfTopNav(isSmallVersion)}}>
                //     <CloneTopSlideOut onHoverOut={() => {
                //         onHoverOut({screen: 'Каталог', refTopSlideOut_: refTopSlideOutCatalog})
                //     }} ref={refTopSlideOutCatalog} children={<CollectionsFromTop ref={refCollectionsFromTop} navigation={navigation}/>}/>
                // </View>
                }

            


            <TopNavigator ref={refTopNavigator} navigation = {navigation} refTopSlideOut = {refTopSlideOut} refSlideOutMenu={refSlideOutMenu} options={options_top}/>      
            <ScrollView
                contentContainerStyle={{ 
                    // flexGrow: 1,  // Ensure ScrollView content stretches
                    flex: 1,
                    height: windowHeight// - 40 - 30,  // Prevent extra space in ScrollView
                }}
                // showsVerticalScrollIndicator={false}
                bounces={false}  // Optional: disable bouncing effect
            >
              
                {children}
            </ScrollView>            
            {/* <Footer /> */}
        </Box>
    );
};

export default React.memo(ScreenWrapper)

