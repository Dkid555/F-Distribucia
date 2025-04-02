import * as React from 'react';
import {ViewProps, View, StyleSheet} from 'react-native';
import {PropsWithChildren, ReactNode, useState} from 'react';
import Svg, {Color, Path} from 'react-native-svg';
import {getSvgPath} from 'react-native-figma-squircle';


interface SquircleParams {
    cornerRadius?: number;
    topLeftCornerRadius?: number;
    topRightCornerRadius?: number;
    bottomRightCornerRadius?: number;
    bottomLeftCornerRadius?: number;
    cornerSmoothing: number;
    fillColor?: Color;
    strokeColor?: Color;
    strokeWidth?: number;
    strokeDasharray?: number | string, /** Dmitrii Modification */
    borderWidthTop?: number;
    borderWidthRight?: number;
    borderWidthBottom?: number;
    borderWidthLeft?: number;
    // My modification, not works currently
    children?: React.ReactNode;

    borderColorTop?: Color;
    borderColorRight?: Color;
    borderColorBottom?: Color;
    borderColorLeft?: Color;
}

interface SquircleViewProps extends ViewProps {
    squircleParams: SquircleParams;
}

function SquircleView({
    squircleParams,
    children,
    ...rest
}: PropsWithChildren<SquircleViewProps>) {
    return (
        <View {...rest}>
            <SquircleBackground {...squircleParams} />
            {children}
        </View>
    );
}

function SquircleBackground({
    cornerRadius = 0,
    topLeftCornerRadius,
    topRightCornerRadius,
    bottomRightCornerRadius,
    bottomLeftCornerRadius,
    cornerSmoothing,
    fillColor = '#000',
    strokeColor = '#000',
    strokeWidth = 0,
    strokeDasharray = 0,
    borderWidthTop,
    borderWidthRight,
    borderWidthBottom,
    borderWidthLeft,
    borderColorTop,
    borderColorRight,
    borderColorBottom,
    borderColorLeft,
    children = null,
}: SquircleParams) {
    const defaultBorderWidth = strokeWidth;
    const top = borderWidthTop ?? defaultBorderWidth;
    const right = borderWidthRight ?? defaultBorderWidth;
    const bottom = borderWidthBottom ?? defaultBorderWidth;
    const left = borderWidthLeft ?? defaultBorderWidth;

    return (
        <Rect style={StyleSheet.absoluteFill}>
            {({ width, height }) => {

                if(strokeWidth == 0){
                    const paths = [];

                if (top > 0) {
                    paths.push(
                        <Path
                            key="top"
                            d={getBorderPath('top', width, height, cornerRadius, topLeftCornerRadius, topRightCornerRadius)}
                            stroke={borderColorTop?.hex || strokeColor}
                            strokeWidth={top}
                            fill="none"
                        />
                    );
                }

                if (right > 0) {
                    paths.push(
                        <Path
                            key="right"
                            d={getBorderPath('right', width, height, cornerRadius, topRightCornerRadius, bottomRightCornerRadius)}
                            stroke={borderColorRight?.hex || strokeColor}
                            strokeWidth={right}
                            strokeDasharray={strokeDasharray}
                            fill="none"
                        />
                    );
                }

                if (bottom > 0) {
                    paths.push(
                        <Path
                            key="bottom"
                            d={getBorderPath('bottom', width, height, cornerRadius, bottomRightCornerRadius, bottomLeftCornerRadius)}
                            stroke={borderColorBottom?.hex || strokeColor}
                            strokeWidth={bottom}
                            strokeDasharray={strokeDasharray}
                            fill="none"
                        />
                    );
                }

                if (left > 0) {
                    paths.push(
                        <Path
                            key="left"
                            d={getBorderPath('left', width, height, cornerRadius, bottomLeftCornerRadius, topLeftCornerRadius)}
                            stroke={borderColorLeft?.hex || strokeColor}
                            strokeWidth={left}
                            strokeDasharray={strokeDasharray}
                            fill="none"
                        />
                    );
                }

                const squirclePath = getSvgPath({
                    width,
                    height,
                    cornerSmoothing,
                    cornerRadius,
                    topLeftCornerRadius,
                    topRightCornerRadius,
                    bottomRightCornerRadius,
                    bottomLeftCornerRadius,
                });

                return (
                    <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                        <Path d={squirclePath} fill={fillColor} />
                        {paths}
                    </Svg>
                );
                }else{
                    const hasStroke = strokeWidth > 0;

                    if (!hasStroke) {
                        const squirclePath = getSvgPath({
                            width,
                            height,
                            cornerSmoothing,
                            cornerRadius,
                            topLeftCornerRadius,
                            topRightCornerRadius,
                            bottomRightCornerRadius,
                            bottomLeftCornerRadius,
                        });

                        return (
                            <Svg
                                width="100%"
                                height="100%"
                                viewBox={`0 0 ${width} ${height}`}>
                                <Path d={squirclePath} fill={fillColor} />
                                {/* {children} */}
                            </Svg>
                        );
                    } else {
                        const cornerRadii = [
                            cornerRadius,
                            topLeftCornerRadius,
                            topRightCornerRadius,
                            bottomLeftCornerRadius,
                            bottomRightCornerRadius,
                        ].filter(
                            cornerRadius => typeof cornerRadius === 'number',
                        ) as number[];

                        const maxStrokeWidth = Math.min(...cornerRadii);
                        strokeWidth = Math.min(strokeWidth, maxStrokeWidth);
                        const insetAmount = strokeWidth / 2;

                        const insetSquirclePath = getSvgPath({
                            width: width - strokeWidth,
                            height: height - strokeWidth,
                            cornerSmoothing,
                            cornerRadius: getInnerRadius(cornerRadius, insetAmount),
                            topLeftCornerRadius: getInnerRadius(
                                topLeftCornerRadius,
                                insetAmount,
                            ),
                            topRightCornerRadius: getInnerRadius(
                                topRightCornerRadius,
                                insetAmount,
                            ),
                            bottomRightCornerRadius: getInnerRadius(
                                bottomRightCornerRadius,
                                insetAmount,
                            ),
                            bottomLeftCornerRadius: getInnerRadius(
                                bottomLeftCornerRadius,
                                insetAmount,
                            ),
                        });

                        return (
                            <Svg
                                width="100%"
                                height="100%"
                                viewBox={`0 0 ${width} ${height}`}>
                                <Path
                                    strokeDasharray={strokeDasharray}
                                    d={insetSquirclePath}
                                    fill={fillColor}
                                    stroke={strokeColor}
                                    strokeWidth={strokeWidth}
                                    translate={insetAmount}
                                />
                                {/* {children} */}
                            </Svg>
                        );
                    }
                }
            }
        }
        </Rect>
    );
}

function getInnerRadius(radius: number | undefined, insetAmount: number) {
    if (radius) {
        return Math.max(0, radius - insetAmount);
    }

    return radius;
}

// Inspired by https://reach.tech/rect/
interface RectProps extends ViewProps {
    children: (rect: {width: number; height: number}) => ReactNode;
}

function Rect({children, ...rest}: RectProps) {
    const [rect, setRect] = useState<{width: number; height: number} | null>(
        null,
    );

    return (
        <View
            {...rest}
            onLayout={e => {
                setRect({
                    width: e.nativeEvent.layout.width,
                    height: e.nativeEvent.layout.height,
                });
            }}>
            {rect ? children(rect) : null}
        </View>
    );
}



function getBorderPath(
    side: 'top' | 'right' | 'bottom' | 'left',
    width: number,
    height: number,
    borderWidth: number,
    corner1: number | undefined,
    corner2: number | undefined
) {
    const r1 = corner1 || 0;
    const r2 = corner2 || 0;
    const halfBorderWidth = borderWidth / 2;

    switch (side) {
        case 'top':
            return `M ${r1} ${halfBorderWidth} L ${width - r2} ${halfBorderWidth} Q ${width - halfBorderWidth} ${halfBorderWidth} ${width - halfBorderWidth} ${r2}`;
        case 'right':
            return `M ${width - halfBorderWidth} ${r1} L ${width - halfBorderWidth} ${height - r2} Q ${width - halfBorderWidth} ${height - halfBorderWidth} ${width - r2} ${height - halfBorderWidth}`;
        case 'bottom':
            return `M ${width - r1} ${height - halfBorderWidth} L ${r2} ${height - halfBorderWidth} Q ${halfBorderWidth} ${height - halfBorderWidth} ${halfBorderWidth} ${height - r2}`;
        case 'left':
            return `M ${halfBorderWidth} ${height - r1} L ${halfBorderWidth} ${r2} Q ${halfBorderWidth} ${halfBorderWidth} ${r2} ${halfBorderWidth}`;
        default:
            return '';
    }
}

export {SquircleView, getSvgPath};
export type {SquircleParams, SquircleViewProps};
