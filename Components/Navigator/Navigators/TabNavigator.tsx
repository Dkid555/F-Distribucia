import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenWrapper from "../TopNavigator/ScreenWrapper/ScreenWrapper";
import HomeScreen from "../../HomeScreen/HomeScreen";
import WhereToBuy from "../../WhereToBuy/WhereToBuy";
import Contacts from "../../Contacts/Contacts";
import TopNavigator from "../TopNavigator/TopNavigator";
import { optionsFunction } from "../Navigator";
import { Box, Text } from "native-base";
import Warehouse from "../../Warehouse/Warehouse";

// Импорт иконок из lucide-react-native
import { Home, PackageSearch, Warehouse as Wr , MapPin, Phone, Info, Landmark, Building2, Brackets, SwatchBook, LayoutPanelLeft, House } from "lucide-react-native";
import Brands from "../../Brands/Brands";

const Tab = createBottomTabNavigator();

export interface NavigatorProps  { navigationRef: any, refSlideOutMenu: any }

const TabNavigator:React.FC<NavigatorProps> = ({ navigationRef, refSlideOutMenu }) => {
    const options = optionsFunction({ navigation: navigationRef, variant: 'top' });

    return (
        <Tab.Navigator
            sceneContainerStyle={{ flex: 1 }}
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0.5,
                    borderTopColor: '#ddd',
                    height: 60,
                    
                },
                header: (props) => (
                    <TopNavigator
                        {...props}
                        navigation={navigationRef}
                        optionButtons={options}
                        refSlideOutMenu={refSlideOutMenu}
                    />
                ),
                tabBarIcon: ({ focused, color, size }) => {
                    const iconProps = {
                        color: focused ? '#007AFF' : '#999',
                        size: 24,
                    };
                
                    let icon = null;
                    let label = '';
                
                    switch (route.name) {
                        case 'Home':
                            icon = <House {...iconProps} />;
                            label = 'Главная';
                            break;
                        case 'Brands':
                            icon = <LayoutPanelLeft {...iconProps} />;
                            label = 'Бренды';
                            break;
                        case 'Warehouse':
                            icon = <PackageSearch {...iconProps} />;
                            label = 'Склад';
                            break;
                        case 'WhereToBuy':
                            icon = <MapPin {...iconProps} />;
                            label = `Где\u00A0Купить?`;
                            break;
                        case 'Contacts':
                            icon = <Phone {...iconProps} />;
                            label = 'Контакты';
                            break;
                    }
                    return (
                        <Box style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {icon}
                            {/* <Text style={{ fontSize: 10, color: focused ? '#007AFF' : '#999', marginTop: 2, textAlign: 'center' }}>
                                {label}
                            </Text> */}
                        </Box>
                    );
                },
                
                
                
            })}
            initialRouteName={'Home'}
        >
            <Tab.Screen name="Home" children={(props) => <ScreenWrapper {...props}><HomeScreen {...props} /></ScreenWrapper>} />
            <Tab.Screen name="Warehouse" children={(props) => <ScreenWrapper {...props}><Warehouse {...props} /></ScreenWrapper>} />
            <Tab.Screen name="Brands" children={(props) => <ScreenWrapper {...props}><Brands {...props} /></ScreenWrapper>} />
            <Tab.Screen name="WhereToBuy" children={(props) => <ScreenWrapper {...props}><WhereToBuy {...props} /></ScreenWrapper>} />
            <Tab.Screen name="Contacts" children={(props) => <ScreenWrapper {...props}><Contacts {...props} /></ScreenWrapper>} />
        </Tab.Navigator>
    );
};

export default React.memo(TabNavigator);
