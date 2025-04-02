import React from 'react';
import {
    TouchableWithoutFeedback,
    Keyboard,
    ViewStyle,
} from 'react-native';

import { useNotifications } from '../../../Notifications/Context/NotificationsContext';
import Animated from 'react-native-reanimated'

interface DismissKeyboardViewProps {
    style?: ViewStyle;
    children: React.ReactNode;
    customEvent?: () => void;
}

const DismissKeyboardView: React.FC<DismissKeyboardViewProps> = ({
    style,
    children,
    customEvent,
}) => {
    const {disableLastActiveNotification} = useNotifications();
    const handlePress = () => {
        Keyboard.dismiss();
        disableLastActiveNotification();
        if (customEvent) {
            customEvent();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress} >
            <Animated.View style={style}>{children}</Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default DismissKeyboardView;

