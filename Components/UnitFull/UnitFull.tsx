import { Text, View } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../Universal/API/Context-API/AppContext'
import { KKpolData } from '../Universal/API/Context-API/AppProvider'
import { AutoHeighImage, AutoWidthImage } from '../Universal/Image/AutoWidthImage'
import SimpleCenteredSpinner from '../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner'
import Dash from "react-native-dash-2";
import { NavigateTo, useAPI, webFont } from '../Universal/API/API'

import _ from 'lodash'
import BackForwardForm from './BackForwardForm'
import ViewSmooth from '../Universal/View/ViewSmooth'
import TonalVarietyGrid from './TonalVariety/TonalVarietyGrid'
import { Package } from 'lucide-react-native'
import { PressableWrap } from '../Universal/Buttons/PressableColorWrap/PressableColorWrap'
import { StyleSheet } from 'react-native'
import { BackButtonBackHome } from '../Universal/Buttons/BackButtonBackHomeModified'
import OstatkiDisplay from './OstatkiDisplay/OstatkiDisplay'
interface UnitFull {
    navigation: any,
    route: any,
}
const UnitFull: React.FC<UnitFull> = ({ navigation, route }) => {

    const { idUnit } = route.params


    const { allUnitData, scaleAll, isSmallVersion, currentWidth, isMediumVersion } = useAppContext()

    /**
     * setSmallVersion(currentWidth < 1000)
     * setMediumVersion(currentWidth < 1500)
     * setTooBigVersion(currentWidth > 1920)
     */

    const [currentUnit, setCurrentUnit] = useState<KKpolData | null>(allUnitData ? allUnitData[idUnit] : null)

    useEffect(() => {
        if (allUnitData && allUnitData[idUnit]) {
            setCurrentUnit(allUnitData[idUnit])
        }

    }, [allUnitData, idUnit])



    const chars_to_show: {
        key: (keyof KKpolData) | (keyof KKpolData)[],
        label: string
    }[] = [
            {
                key: ['name', 'full_size'],
                label: 'Название:'
            },
            {
                key: 'material',
                label: 'Материал:',
            },
            {
                key: 'poverh',
                label: 'Поверхность:',
            },

            {
                key: 'fab',
                label: 'Фабрика:'
            },
            {

                key: 'col',
                label: 'Коллекция:'
            },
            {
                key: 'id',
                label: 'Артикул:'
            },
            {
                key: 'rect',
                label: 'Ректификация:',
            },
            {
                key: 'var',
                label: 'Тональная вариация'
            },
            {
                label: 'Цветовая гамма:',
                key: ['color1', 'color2', 'color3']
            },
            {
                label: 'Упаковка:',
                key: 'pack_pz'
            },
            {
                label: 'В наличии',
                key: 'ostatki'
            }
        ]

    const styles = styleUnitFull(scaleAll)

    // const [renderOstatkiDisplay, setRenderOstatkiDisplay] = useState(true)

    // const isCompact = useRef<boolean>(false)
    // useEffect(() => {
    //     if (currentWidth < 380) {
    //         setRenderOstatkiDisplay(false)
    //         isCompact.current = true
    //         setTimeout(() => {
    //             setRenderOstatkiDisplay(true)
    //         }, 100)
    //         // setRenderOstatkiDisplay(true)

    //     } else {
    //         isCompact.current = false
    //     }
    // }, [currentWidth])
    return (
        <View style={[styles.main]}>
            <BackButtonBackHome navigation={navigation} />
            {currentUnit &&
                <View style={[styles.main2]}>
                    <View style={styles.imageHolder}>

                        {false ?
                            <AutoWidthImage
                                height={100 * scaleAll}
                                scaleAll={scaleAll}
                                source={{
                                    uri: currentUnit?.uri_full

                                }} /> :
                            <AutoHeighImage
                                width={Math.min(currentWidth - 40, 1000 * scaleAll)}
                                scaleAll={scaleAll}
                                source={{
                                    uri: currentUnit?.uri_full

                                }}
                                maxHeight={400}
                            />}

                    </View>

                    <Dash style={{
                        width: isSmallVersion ? '90%' :
                            isMediumVersion ? '80%' : '60%', marginHorizontal: 'auto'
                    }} dashColor='grey' dashGap={4} dashLength={4} dashThickness={1} />
                    <View>

                        <View style={[{
                            width: isSmallVersion ? '90%' :
                                isMediumVersion ? '80%' : '60%', maxWidth: 800
                        }, styles.charsHolder]} >
                            <Text
                                style={[{
                                    fontSize: (isSmallVersion ? 16 : 20) * scaleAll,


                                }, styles.charsText]}
                            >Характеристики:</Text>
                            <View style={[styles.charsView, {
                                width: '100%'
                                // minWidth: Math

                            }]}>
                                {
                                    chars_to_show.map((chars, index) => {
                                        let res_string = _.isArray(chars.key) ?
                                            chars.key.map((key) => {
                                                return currentUnit[key] ?? ''
                                            }).filter(x => x != '').join(', ') : currentUnit[chars.key];


                                        if (chars.key == 'rect') {
                                            res_string = (res_string + '' == '1') ? 'Есть' : 'Отстуствует'
                                        }
                                        if (chars.key == 'ostatki') {
                                            const ostatki = currentUnit['ostatki']
                                            if (
                                                !ostatki || (
                                                    parseFloat(ostatki.FreeSklad) == 0 &&
                                                    parseFloat(ostatki.ReservSklad) == 0 &&
                                                    parseFloat(ostatki.VPutiFree) == 0 &&
                                                    parseFloat(ostatki.VPutiReserv) == 0)
                                            )
                                                return null;

                                        }

                                        const isOstatki = chars.key == 'ostatki'

                                        return (
                                            <View style={{}}>
                                                <View style={[styles.rowChar, {
                                                    backgroundColor: index % 2 == 0 ? '#F9F9F9' : '#cdf1f5',
                                                }, (isOstatki && isSmallVersion) ? { justifyContent: 'center' } : {}]}>
                                                    {!(isOstatki && isSmallVersion) && <Text style={[{
                                                        fontSize: (isSmallVersion ? 14 : 18) * scaleAll,
                                                    }, styles.labelText]}>
                                                        {chars.label}
                                                    </Text>}
                                                    {
                                                        chars.key == 'var' ?

                                                            <TonalVarietyGrid tonalVariety={parseInt(currentUnit[chars.key])} size={30} /> :
                                                            isOstatki ?
                                                                <>
                                                                    {<OstatkiDisplay ostatki={currentUnit['ostatki']} scaleAll={scaleAll}
                                                                        // compact={isCompact.current}
                                                                    />}

                                                                </> :
                                                                chars.key == 'col' ?
                                                                    <PressableWrap onPress={() => {
                                                                        NavigateTo({
                                                                            navigation: navigation,
                                                                            goTo: 'Collection',
                                                                            data: {
                                                                                collection_name: res_string
                                                                            }
                                                                        })
                                                                    }}>
                                                                        <Text style={[{
                                                                            fontSize: (isSmallVersion ? 14 : 18) * scaleAll,
                                                                        }, styles.valuesText, { color: '#0A84FF' }]}>
                                                                            {res_string}
                                                                        </Text>
                                                                    </PressableWrap> :

                                                                    chars.key == 'pack_pz' ?
                                                                        <PackageingInBox scaleAll={scaleAll} data={currentUnit} />
                                                                        :
                                                                        <Text style={[{
                                                                            fontSize: (isSmallVersion ? 14 : 18) * scaleAll,
                                                                        }, styles.valuesText]} ellipsizeMode='tail' noOfLines={1}>
                                                                            {res_string}
                                                                        </Text>
                                                    }
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>

                        <View style={[{ width: Math.min(600, currentWidth - 20), }, styles.backForwardHolder]}>
                            <BackForwardForm extraParams={{
                                unit: currentUnit
                            }} />
                        </View>
                    </View>
                </View>}


            {!currentUnit && <SimpleCenteredSpinner scaleAll={scaleAll} height={30} width={30} />}
        </View>
    )
}



const styleUnitFull = (scaleAll: number) => React.useMemo(() => StyleSheet.create({
    backForwardHolder: {
        alignSelf: 'center', marginVertical: 20 * scaleAll,
    },
    valuesText: {
        fontFamily: webFont('Inter'),
        color: '#2e2e2e',
        fontWeight: '500',
    },
    labelText: {
        fontFamily: webFont('Inter'),
        color: '#2e2e2e',
        fontWeight: '600'
    },
    rowChar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        paddingVertical: 15 * scaleAll,
        paddingHorizontal: 10 * scaleAll
    },
    charsView: {
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'transparent',
        overflow: 'hidden',

        borderWidth: 1, borderStyle: 'dashed'
    },
    charsText: {
        fontFamily: webFont('Inter'),
        // width: '100%',
        color: 'black',
        fontWeight: '600',
        marginVertical: 10 * scaleAll
    },
    imageHolder: { zIndex: -1, marginVertical: 40 * scaleAll, alignSelf: 'center' },
    main2: { flex: 1 },
    main: { backgroundColor: 'white', flex: 1 },
    charsHolder: {
        alignSelf: 'center',
        alignItems: 'center',
    },

}), [scaleAll])



export default UnitFull


interface PackageingInBoxProps { data: KKpolData, scaleAll: number }
export const PackageingInBox: React.FC<PackageingInBoxProps> = ({ data, scaleAll }) => {
    const renderOrder: string[] = data.ed != 'шт' ? [
        `${data['pack_m'] + ' ' + data.ed}`, data['pack_pz'] + ' шт', data['ves'] + ' кг'

    ] : [
        data['pack_pz'] + ' шт', data['ves'] + ' кг'
    ]

    return (
        <ViewSmooth style={{
            paddingVertical: 10 * scaleAll,
            borderRadius: 10 * scaleAll,
            paddingHorizontal: 10 * scaleAll,
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: 'rgba(100,100,100,0.5)',
            backgroundColor: 'rgba(100,100,100,0.5)'
        }}>
            <View style={{
                flexDirection: 'row', alignItems: 'center', gap: 10 * scaleAll,
            }}>
                {renderOrder.map(value => {

                    return (
                        <Text style={{ color: 'white', fontWeight: '600', fontFamily: webFont('Inter'), fontSize: 14 * scaleAll, }}>
                            {value}
                        </Text>)
                })}
                <Package color={'white'} size={20 * scaleAll} style={{ zIndex: 1000 }} strokeWidth={2} />
            </View>
        </ViewSmooth>)
}

