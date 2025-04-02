import React, { ReactNode, forwardRef } from 'react';
import { ViewStyle, StyleSheet, View } from 'react-native';
import { SquircleView, SquircleViewProps } from '../Squircle/Squircle';

export interface ViewSmoothProps {
    style?: ViewStyle | ViewStyle[];
    children?: ReactNode;
    squircleParams?: SquircleViewProps;
    tail?: boolean;
    tailStyle?: ViewStyle;
}

const Tail = ({ color, style }: { color?: string; style?: ViewStyle }) => {
    const flattenedStyle =
    {...styles.tail,...{ borderColor: color }, ...style};
    // StyleSheet.flatten({[styles.tail, { borderColor: color }, style]}) as ViewStyle;
    console.log(flattenedStyle);
    const {
        borderColor,
        borderWidth,
        borderRadius,

        borderBottomWidth,
        borderRightWidth,

        borderTopWidth,
        borderLeftWidth,

        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        backgroundColor,
        borderStyle,
        ...filteredStyle
    } = flattenedStyle || {};

    const enhancedSquircleParams = {
        ...(borderLeftWidth !== undefined && {borderWidthLeft : borderLeftWidth}),
        ...(borderTopWidth !== undefined && {borderWidthTop : borderTopWidth}),
        ...(borderRightWidth !== undefined && {borderWidthRight : borderRightWidth}),
        ...(borderBottomWidth !== undefined && {borderWidthBottom : borderBottomWidth}),

        ...(borderColor !== undefined && { strokeColor: borderColor }),
        ...(borderWidth !== undefined && { strokeWidth: borderWidth }),
        ...(borderRadius !== undefined && { cornerRadius: borderRadius }),
        ...(borderTopLeftRadius !== undefined && {
            topLeftCornerRadius: borderTopLeftRadius,
        }),
        ...(borderTopRightRadius !== undefined && {
            topRightCornerRadius: borderTopRightRadius,
        }),
        ...(borderBottomLeftRadius !== undefined && {
            bottomLeftCornerRadius: borderBottomLeftRadius,
        }),
        ...(borderBottomRightRadius !== undefined && {
            bottomRightCornerRadius: borderBottomRightRadius,
        }),
        ...(backgroundColor !== undefined && { fillColor: backgroundColor }),
        ...(borderStyle !== undefined && {
            strokeDasharray:
                borderStyle === 'dashed'
                    ? '3.5, 3'
                    : borderStyle === 'dotted'
                        ? borderWidth !== undefined
                            ? `${borderWidth},${borderWidth}`
                            : 0
                        : 0,
        }),
    };

    console.log('enhancedSquircleParams', enhancedSquircleParams);
    return (
        <SquircleView
            style={[filteredStyle]}
            squircleParams={{
                cornerSmoothing: 1,
                ...enhancedSquircleParams,
            }}
        />
    );
};

const ViewSmooth = forwardRef<any, ViewSmoothProps>(
    ({ style, children, squircleParams, tail = false, tailStyle = {} }, ref) => {
        const flattenedStyle = StyleSheet.flatten(style) as ViewStyle;

        const {
            borderColor,
            borderWidth,
            borderRadius,
            borderBottomWidth,
            borderRightWidth,

            borderTopWidth,
            borderLeftWidth,

            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            backgroundColor,
            borderStyle,
            ...filteredStyle
        } = flattenedStyle || {};

        const enhancedSquircleParams = {
            ...squircleParams,

            ...(borderLeftWidth !== undefined && {borderWidthLeft : borderLeftWidth}),
            ...(borderTopWidth !== undefined && {borderWidthTop : borderTopWidth}),

            ...(borderColor !== undefined && { strokeColor: borderColor }),
            ...(borderWidth !== undefined && { strokeWidth: borderWidth }),
            ...(borderRadius !== undefined && { cornerRadius: borderRadius }),
            ...(borderTopLeftRadius !== undefined && {
                topLeftCornerRadius: borderTopLeftRadius,
            }),
            ...(borderTopRightRadius !== undefined && {
                topRightCornerRadius: borderTopRightRadius,
            }),
            ...(borderBottomLeftRadius !== undefined && {
                bottomLeftCornerRadius: borderBottomLeftRadius,
            }),
            ...(borderBottomRightRadius !== undefined && {
                bottomRightCornerRadius: borderBottomRightRadius,
            }),
            ...(backgroundColor !== undefined && { fillColor: backgroundColor }),
            ...(borderStyle !== undefined && {
                strokeDasharray:
                    borderStyle === 'dashed'
                        ? '3.5, 3'
                        : borderStyle === 'dotted'
                            ? borderWidth !== undefined
                                ? `${borderWidth},${borderWidth}`
                                : 0
                            : 0,
            }),
        };

        return (
            // <View style={styles.container}>
                <SquircleView
                    ref={ref}
                    style={[filteredStyle]}
                    squircleParams={{
                        cornerSmoothing: 1,
                        ...enhancedSquircleParams,
                    }}
                >
                    {children}
                    {tail && <Tail color={borderColor} style={tailStyle} />}
                </SquircleView>

            // </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    tail: {
        zIndex: 1,
        position: 'absolute',
        bottom: -10, // Adjust based on your needs
        right: 50, // Adjust based on your needs
        width: 20,
        height:20,
        borderStyle:'dashed',
        borderBottomWidth: 1.2,
        borderRightWidth: 1.2,
        borderBottomRightRadius:10,
        backgroundColor: 'white', // Adjust based on your needs
        transform: [{ rotate: '45deg' }],
    },
});

export default ViewSmooth;
