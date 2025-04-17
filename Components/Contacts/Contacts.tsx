// import { View, Text, VStack, HStack, Divider, Link } from "native-base";
// import React, { useRef } from "react";
// import { BackButtonBackHome } from "../Universal/Buttons/BackButtonBackHomeModified";
// import YMapsFullScreen from "../Universal/Yandex/Maps/YMapsFullScreen";
// import { dealer } from "../WhereToBuy/Interfaces/Interface";
// import { useAppContext } from "../Universal/API/Context-API/AppContext";
// import { MapPin, Navigation } from "lucide-react-native";
// import { TouchableOpacity } from "react-native";
// import { openNavigation } from "../WhereToBuy/FormMenuDealer/FormMenuDealer";

// interface ContactsProps {
//     navigation: any,
//     route: any
// }

// const Contacts: React.FC<ContactsProps> = ({ navigation }) => {
//     const { isSmallVersion } = useAppContext();
//     const mapRef = useRef<ymaps.Map>(null);

//     const ourContacts: dealer = {
//         coordinates: [59.962724, 30.267494],
//         name: "Creatile",
//         address: "197198, г. Санкт-Петербург, ул. Ждановская д. 45, пом. 219Н",
//         workTime: ["Пн-Пт 10:00 - 20:00", "Сб-Вс c 11:00 - 19:00"],
//         phoneNumbers: ["+7 812 425-37-76"],
//         webSites: ["https://plitkazavr.ru"],
//         mails: ["order@plitkazavr.ru"]
//     };

//     return (
//         <View flex={1} p={4} bg="white">
//             <BackButtonBackHome navigation={navigation} />

//             <VStack space={4} alignItems="center" mt={4} > 
//                 <View
//                     style={{
//                         height: isSmallVersion ? 300 : 600,
//                         width: isSmallVersion ? "100%" : 600,
//                         overflow: "hidden",
//                         borderRadius: 22,
//                         borderWidth: 0.3,
//                         borderColor: "grey",
//                         shadowColor: "#000",
//                         shadowOpacity: 0.2,
//                         shadowRadius: 4,
//                         elevation: 4
//                     }}
//                 >
//                     <YMapsFullScreen
//                         width={'100%'}
//                         mapRef_={mapRef}
//                         selected={null}
//                         dealerList={[ourContacts]}
//                         defaultState={{
//                             center: ourContacts.coordinates,
//                             zoom: 12
//                         }}
//                     />
//                 </View>

//                 <View
//                     style={{
//                         padding: 16,
//                         marginBottom: 10,
//                         borderRadius: 12,
//                         backgroundColor: "white",
//                         shadowColor: "#000",
//                         shadowOpacity: 0.1,
//                         shadowRadius: 5,
//                         elevation: 3,
//                         width: isSmallVersion ? "100%" : 600
//                     }}
//                 >
//                     <Text fontSize="xl" fontWeight="bold">
//                         {`${ourContacts.name}, наши контакты:`}
//                     </Text>
//                     <Divider my={2} />
//                     <HStack>
//                         <MapPin color={"#000"} size={24} />
//                         <Text fontSize="md"> {ourContacts.address}</Text>
//                     </HStack>

//                     <HStack>
//                         <VStack>
//                             <VStack mt={2} space={1}>
//                                 <Text fontSize="md">🕒 Время работы:</Text>
//                                 {ourContacts.workTime.map((time, index) => (
//                                     <Text key={index} fontSize="sm" color="rgb(40, 167, 69)">
//                                         {`${time}`}
//                                     </Text>
//                                 ))}
//                             </VStack>

//                             <HStack mt={2} space={3}>
//                                 <Text fontSize="md">📞</Text>
//                                 {ourContacts.phoneNumbers.map((phone, index) => (
//                                     <Link key={index} href={`tel:${phone}`} color="blue.500">
//                                         {phone}
//                                     </Link>
//                                 ))}
//                             </HStack>

//                             <HStack mt={2} space={3}>
//                                 <Text fontSize="md">📧</Text>
//                                 {ourContacts.mails.map((mail, index) => (
//                                     <Link key={index} href={`mailto:${mail}`} color="blue.500">
//                                         {mail}
//                                     </Link>
//                                 ))}
//                             </HStack>

//                             <HStack mt={2} space={3}>
//                                 <Text fontSize="md">🌐</Text>
//                                 {ourContacts.webSites.map((site, index) => (
//                                     <Link key={index} href={site} color="blue.500" isExternal>
//                                         {site.replace("https://", "")}
//                                     </Link>
//                                 ))}
//                             </HStack>
//                         </VStack>


//                         <VStack mt={4} alignItems="center" alignSelf={'center'} marginLeft={'auto'} marginRight={'auto'}>
//                             <TouchableOpacity
//                                 onPress={() => openNavigation(ourContacts.coordinates)}
//                                 activeOpacity={0.7}
//                                 style={{
//                                     flexDirection: "row",
//                                     alignItems: "center",
//                                     backgroundColor: "rgb(40, 167, 69)",
//                                     paddingVertical: isSmallVersion ? 9 :12,
//                                     paddingHorizontal: isSmallVersion ? 10: 16,
//                                     borderRadius: 10,
//                                     shadowColor: "#000",
//                                     shadowOpacity: 0.2,
//                                     shadowRadius: 3,
//                                     elevation: 3
//                                 }}
//                             >
//                                 <Navigation color="white" size={isSmallVersion ? 14 : 20} />
//                                 <Text style={{ color: "white", fontSize:isSmallVersion ? 13 : 16, marginLeft: 8 }}>
//                                     {isSmallVersion ? `Проложить\nмаршрут` : `Проложить маршрут`}
//                                 </Text>
//                             </TouchableOpacity>
//                         </VStack>
//                     </HStack>


//                 </View>
//             </VStack>
//         </View>
//     );
// };

// export default Contacts;

import { View, Text, VStack, HStack, Divider, Link } from "native-base";
import React, { useRef } from "react";
import { BackButtonBackHome, DefaultBackButton } from "../Universal/Buttons/BackButtonBackHomeModified";
import YMapsFullScreen from "../Universal/Yandex/Maps/YMapsFullScreen";
import { dealer } from "../WhereToBuy/Interfaces/Interface";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { MapPin, Navigation } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { openNavigation } from "../WhereToBuy/FormMenuDealer/FormMenuDealer";

interface ContactsProps {
    navigation: any;
    route: any;
}

const Contacts: React.FC<ContactsProps> = ({ navigation }) => {
    const { isSmallVersion, isMediumVersion, isTooBigVersion } = useAppContext();
    const mapRef = useRef<ymaps.Map>(null);

    const ourContacts: dealer = {
        coordinates: [59.962724, 30.267494],
        name: "",
        address: "197198, г. Санкт-Петербург, Железноводская 32",
        workTime: ["Пн-Пт 10:00 - 20:00", "Сб-Вс c 11:00 - 19:00"],
        phoneNumbers: ["+7 812 425-35-49"],
        webSites: ["https://plitkazavr.ru", "https://f-distribution.ru/"],
        mails: ["opt@f-distribution.ru"]
    };

    return (
        <View flex={1} p={4} bg="white">
            {/* {!isSmallVersion && <BackButtonBackHome navigation={navigation} />} */}
            <DefaultBackButton navigation={navigation}/>
            <VStack space={4} alignItems="center" mt={4}>
                <View
                    style={{
                        height: isSmallVersion ? 300 : isMediumVersion ? 500 : 600,
                        width: isSmallVersion ? "100%" : 700,
                        overflow: "hidden",
                        borderRadius: 22,
                        borderWidth: 0.3,
                        borderColor: "grey",
                        shadowColor: "#000",
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 4
                    }}
                >
                    <YMapsFullScreen
                        width={"100%"}
                        mapRef_={mapRef}
                        selected={null}
                        dealerList={[ourContacts]}
                        defaultState={{
                            center: ourContacts.coordinates,
                            zoom: 12
                        }}
                    />
                </View>

                <View
                    style={{
                        padding: 16,
                        marginBottom: 10,
                        borderRadius: 12,
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        elevation: 3,
                        width: isSmallVersion ? "100%" : isMediumVersion ? 650 : 750
                    }}
                >
                    <Text fontSize={isSmallVersion ? "lg" : "xl"} fontWeight="bold">
                        {`Наши контакты:`}
                    </Text>
                    <Divider my={2} />
                    <HStack>
                        <MapPin color={"#000"} size={24} />
                        <Text fontSize={isSmallVersion ? "md" : "lg"}> {ourContacts.address}</Text>
                    </HStack>

                    <HStack>
                        <VStack>
                            <VStack mt={2} space={1}>
                                <Text fontSize="md">🕒 Время работы:</Text>
                                {ourContacts.workTime.map((time, index) => (
                                    <Text key={index} fontSize="sm" color="rgb(40, 167, 69)">
                                        {`${time}`}
                                    </Text>
                                ))}
                            </VStack>

                            <HStack mt={2} space={3}>
                                <Text fontSize="md">📞</Text>
                                {ourContacts.phoneNumbers.map((phone, index) => (
                                    <Link key={index} href={`tel:${phone}`} color="blue.500">
                                        {phone}
                                    </Link>
                                ))}
                            </HStack>

                            <HStack mt={2} space={3}>
                                <Text fontSize="md">📧</Text>
                                {ourContacts.mails.map((mail, index) => (
                                    <Link key={index} href={`mailto:${mail}`} color="blue.500">
                                        {mail}
                                    </Link>
                                ))}
                            </HStack>

                            <HStack mt={2} space={3}>
                                <Text fontSize="md">🌐</Text>
                                {ourContacts.webSites.map((site, index) => (
                                    <Link key={index} href={site} color="blue.500" isExternal>
                                        {site.replace("https://", "")}
                                    </Link>
                                ))}
                            </HStack>
                        </VStack>

                        <VStack mt={4} alignItems="center" alignSelf="center" marginLeft="auto" marginRight="auto">
                            <TouchableOpacity
                                onPress={() => openNavigation(ourContacts.coordinates)}
                                activeOpacity={0.7}
                                style={{
                                    flexDirection:  "row",//isSmallVersion ? "column" : "row",
                                    alignItems: "center",
                                    backgroundColor: "rgb(40, 167, 69)",
                                    paddingVertical: isSmallVersion ? 9 : isMediumVersion ? 12 : 14,
                                    paddingHorizontal: isSmallVersion ? 10 : isMediumVersion ? 16 : 20,
                                    borderRadius: 10,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    elevation: 3,
                                    gap: 10
                                }}
                            >
                                <Navigation color="white" size={isSmallVersion ? 14 : isMediumVersion ? 20 : 24} />
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: isSmallVersion ? 13 : isMediumVersion ? 16 : 18,
                                        marginLeft: isSmallVersion ? 0 : 8,
                                        // textAlign: "center"
                                    }}
                                >
                                    {isSmallVersion ? `Проложить\nмаршрут` : `Проложить маршрут`}
                                </Text>
                            </TouchableOpacity>
                        </VStack>
                    </HStack>
                </View>
            </VStack>
            {isSmallVersion && <View style = {{height: 120}}/> }
        </View>
    );
};

export default React.memo(Contacts);
