/**
 * @author
 * Ramprasath R <ramprasath25@gmail.com>
 */

import React from 'react';
import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
// import ReactChipsInput from 'react-native-chips'


// Props interface for the Chips component
export interface ChipsProps {
    value: string;
    chipStyle?: StyleProp<ViewStyle>;
    onPress: () => void;
}

// Props interface for the ReactChipsInput component
export interface ReactChipsInputProps {
    initialChips?: string[];
    onChangeChips?: (chips: string[]) => void;
    label?: string;
    chipStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    labelStyle?: StyleProp<TextStyle>;
    labelOnBlur?: StyleProp<TextStyle>;
    alertRequired?: boolean;
}

// State interface for the ReactChipsInput component
export interface ReactChipsInputState {
    isFocused: boolean;
    chips: string[];
    inputText: string;
}

// ReactChipsInput component declaration
export default class ReactChipsInput extends React.Component<ReactChipsInputProps, ReactChipsInputState> {
    handleFocus: () => void;
    handleChangeText: (text: string) => void;
    removeChip: (index: number) => void;
    handleBlur: () => void;
}
