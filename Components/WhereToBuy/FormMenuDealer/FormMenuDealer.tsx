import React from 'react'
interface MenuListItemProps {
    text: string,
    icon: React.ReactElement<any>
    onPress?: () => any
}
const MenuListItem:React.FC<MenuListItemProps> = ({text, icon, onPress}) => {

    return (
        <PressableWrapp onPress={onPress}>
                               <View style ={{flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10}}>
                                   {icon}
                                   <Text style={{}}>{text}</Text>
                               </View>
                           </PressableWrapp>
    )
}

interface FormMenuDealerProps{
    dealer: dealer
}

import { Linking, Platform, Text, View } from 'react-native';
import PressableWrapp from '../../Universal/Buttons/PressableReact/PressableWrapp'
import { dealer } from '../Interfaces/Interface'
import { MapPinned, PhoneOutgoing, Rss } from 'lucide-react-native'

export const openNavigation = async (end: [number, number]) => {
    const [endLat, endLon] = end;

    // Yandex Maps (Автоопределение старта)
    const yandexMapsAppUrl = `yandexmaps://maps.yandex.ru/?rtext=~${endLat},${endLon}&rtt=auto`;
    const yandexMapsWebUrl = `https://yandex.ru/maps/?rtext=~${endLat},${endLon}&rtt=auto`;

    // Google Maps (Автоопределение старта)
    const googleMapsAppUrl = `google.navigation:q=${endLat},${endLon}`;
    const googleMapsWebUrl = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${endLat},${endLon}`;

    try {
        if (Platform.OS === 'web') {
            // На ПК всегда открываем Яндекс.Карты в браузере
            await Linking.openURL(yandexMapsWebUrl);
            return;
        }

        // Проверяем, установлен ли Yandex Maps
        const isYandexInstalled = await Linking.canOpenURL(yandexMapsAppUrl);
        if (isYandexInstalled) {
            await Linking.openURL(yandexMapsAppUrl);
            return;
        }

        // Проверяем, установлен ли Google Maps
        const isGoogleInstalled = await Linking.canOpenURL(googleMapsAppUrl);
        if (isGoogleInstalled) {
            await Linking.openURL(googleMapsAppUrl);
            return;
        }

        // Если ни одно из приложений не установлено, открываем Яндекс.Карты в браузере
        await Linking.openURL(yandexMapsWebUrl);
    } catch (error) {
        console.error('Ошибка при открытии навигатора', error);
    }
};


const FormMenuDealer: React.FC<FormMenuDealerProps> = ({ dealer }) => {
    return (
        <View>
            {dealer.coordinates && (
                <MenuListItem 
                    text={'Открыть в навигаторе'}
                    icon={<MapPinned color={'#066ae5'} size={16} />}
                    onPress={() => openNavigation(dealer.coordinates)}
                />
            )}
            {dealer.phoneNumbers && dealer.phoneNumbers.length > 0 && dealer.phoneNumbers.map((phone, index) => (
                <MenuListItem 
                    key={index} 
                    text={phone} 
                    icon={<PhoneOutgoing color={'#19b859'} size={16} fill={'#5ce693'} />} 
                    onPress={() => Linking.openURL(`tel:${phone}`).catch(err => console.error('Error opening dialer', err))}
                />
            ))}
            {dealer.webSites && dealer.webSites.length > 0 && dealer.webSites.map((website, index) => (
                <MenuListItem 
                    key={index} 
                    text={website} 
                    icon={<Rss color={'#915ce6'} size={16} />} 
                    onPress={() => Linking.openURL(website.startsWith('http') ? website : `https://${website}`).catch(err => console.error('Error opening website', err))}
                />
            ))}
        </View>
    );
};


export default React.memo(FormMenuDealer)