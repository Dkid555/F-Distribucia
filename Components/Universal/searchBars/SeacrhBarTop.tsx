import { View } from 'native-base'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TextInput, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated'
import { heightOfTopNav } from '../../Navigator/TopNavigator/TopNavigator'
import { Search, X } from "lucide-react-native"
import { useAppContext } from '../API/Context-API/AppContext'
import ViewSmooth from '../View/ViewSmooth'
import { NavigateTo } from '../API/API'

export interface handleSearchBarTop {
    enable: () => any,
    disable: () => any
}

interface SearchBarTop { onClose: () => void, navigation: any}

const SearchBarTop = React.forwardRef<handleSearchBarTop, SearchBarTop> (({ onClose, navigation }, ref) => {
    const { currentWidth, 
        
        isSmallVersion, 
        setSearchBarTopActive,
        isMediumVersion } = useAppContext()
    const [query, setQuery] = useState('')
    const tr = -heightOfTopNav(isSmallVersion)
    const translateY = useSharedValue(tr)
    const opacity = useSharedValue(0)

    useImperativeHandle(ref, () => ({
        enable: () => setEnabled(true),
        disable: () => setEnabled(false)
    }))

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}],
        opacity: opacity.value
    }))

    const [enabled, setEnabled] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (enabled) open()
        else close()
    }, [enabled])

    const open = () => {
        setSearchBarTopActive(true)
        setRender(true)
        setTimeout(() => {
            refBackDrop.current?.setStart(true)
        }, 10)
        
        translateY.value = withTiming(0, { duration: 300 }) 
        opacity.value = withTiming(1, { duration: 300 }) 
    }

    const close = () => {
        setSearchBarTopActive(false)
        refBackDrop.current?.setStart(false)
        translateY.value = withTiming(tr, { duration: 300 }) 
        opacity.value = withTiming(0, { duration: 300 }, () => {
            runOnJS(setQuery)('')
            runOnJS(onClose)()
            runOnJS(setRender)(false)

        }) 
    }

    const refBackDrop = useRef<handleBackDrop>(null)

    // Adjust font sizes for mobile screens
    const scaleFactor = isSmallVersion ? 0.8 : isMediumVersion ? 1.2 : 1.5

    const [error, setError] = useState<false | {message: string}>(false)
    const search = () => {
        if(query.length > 0 ){
            setEnabled(false)
            console.log('Searching for:', query);
            NavigateTo({
                navigation, 
                goTo: 'SearchPage', 
                data: { query }
            });
        }else {
            setError({
                message: "Введи запрос!!!"
            })
        }
        
    }
    const errorColor = 'red'

    const refTextInput = useRef<TextInput>(null)
    useEffect(() => {

        if(render){
            setTimeout(() => {
                refTextInput.current?.focus()
            },400)
        }
    }, [render])
    return (
        render && <>
            <BackDrop ref={refBackDrop} onPress={() => setEnabled(false)} />
            <Animated.View style={[styles.container, { width: currentWidth, height: heightOfTopNav(isSmallVersion) }, animatedStyle]}>
                <View style={[
                    styles.inputContainer,
                    {
                        height: heightOfTopNav(isSmallVersion) - 8 * scaleFactor,
                        paddingVertical: 8 * scaleFactor,
                        paddingHorizontal: 12 * scaleFactor,
                        borderRadius: 12 * scaleFactor,
                    }
                ]}>
                    <Search size={24 * scaleFactor} color={error ? errorColor :"#666"} style={styles.icon} />
                    
                    <TextInput
                        ref = {refTextInput}
                        onSubmitEditing={search}
                        placeholder={error ? error.message : "Поиск..."}
                        placeholderTextColor={error ? errorColor : "#777"}
                        value={query}
                        onChangeText={(text) => {
                            setError(false)
                            setQuery(text)
                        }}
                        style={[
                            styles.input,
                            { fontSize: 16 * scaleFactor, paddingLeft: 12, paddingVertical: 6 * scaleFactor, outlineStyle: 'none' }
                        ]}
                        flex={1}
                    />
                    
                    <TouchableOpacity onPress={search} >
                        <ViewSmooth style={[styles.searchButton,  { width: 60 * scaleFactor, height: 30 * scaleFactor,}]}>
                            <View style ={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center' } ]}>
                            <Text style={ { color: 'white', fontSize: 14 * scaleFactor }}>Поиск</Text>
                            </View>
                        </ViewSmooth>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.closeButton, { padding: 8 * scaleFactor }]} onPress={() => setEnabled(false)}>
                        <X size={28 * scaleFactor} color="#666" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    )
})

interface handleBackDrop {
    setStart: (x: boolean) => any
}

interface BackDropProps {
    onPress?: () => any,
    initial?: boolean
}

const BackDrop = React.forwardRef<handleBackDrop, BackDropProps>(({ initial = false, onPress }, ref) => {
    const { currentHeight, currentWidth } = useAppContext()
    const opacity = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    useImperativeHandle(ref, () => ({
        setStart
    }))

    const [start, setStart] = useState(initial)
    useEffect(() => {
        opacity.value = withTiming(start ? 0.7 : 0, { duration: 300 })
    }, [start])

    return (
        <Pressable style={{ position: 'absolute', left: 0, top: 0, height: currentHeight, width: currentWidth }} pointerEvents={start ? 'box-only' : 'box-none'} onPress={onPress}>
            <Animated.View style={[{ flex: 1, backgroundColor: 'rgb(0,0,0)' }, animatedStyle]} />
        </Pressable>
    )
})

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 4,
    },
    input: {
        flex: 1,
        color: '#222',
        fontWeight: '500',
    },
    icon: {
        marginLeft: 8,
    },
    searchButton: {
        backgroundColor:  '#007AFF',
        borderRadius: 8,
        marginHorizontal: 6
    },
    closeButton: {
        marginHorizontal: 6
    }
})

export default SearchBarTop
