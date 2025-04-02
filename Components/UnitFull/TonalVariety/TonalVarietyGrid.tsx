import {View, Text, Box, Popover, Pressable } from 'native-base';
import React, { useRef, useState } from 'react';
import {  StyleSheet, ViewStyle } from 'react-native';
import { webFont } from '../../Universal/API/API';
import { container } from 'webpack';
import { PressableWrap } from '../../Universal/Buttons/PressableColorWrap/PressableColorWrap';
import { useAppContext } from '../../Universal/API/Context-API/AppContext';
import { AllUnitKKpolData, KKpolData } from '../../Universal/API/Context-API/AppProvider';

const tonalShades = {
  1: ['#F5F5F5', '#E8E8E8', '#F5F5F5', '#E8E8E8', '#D6D6D6', '#E8E8E8', '#F5F5F5', '#E8E8E8', '#F5F5F5'], // Mostly light
  2: ['#E8E8E8', '#D6D6D6', '#E8E8E8', '#D6D6D6', '#B3B3B3', '#D6D6D6', '#E8E8E8', '#D6D6D6', '#E8E8E8'], // Light to medium shades
  3: ['#B3B3B3', '#999999', '#B3B3B3', '#999999', '#777777', '#999999', '#B3B3B3', '#999999', '#B3B3B3'], // Medium to dark shades
  4: ['#777777', '#555555', '#777777', '#555555', '#333333', '#555555', '#777777', '#555555', '#777777'], // Mostly dark
  0: ['#CCCCCC', '#CCCCCC', '#CCCCCC', '#CCCCCC', '#CCCCCC', '#CCCCCC', '#CCCCCC', '#CCCCCC', '#CCCCCC'] // Monolithic
};

const tonalColors = {
  light: '#E0E0E0', // Light gray
  dark: '#333333'   // Dark gray
};


interface TonalVarietyGrid {
  tonalVariety: 0| 1 | 2 | 3 | 4,
  size: number, 
}
const TonalVarietyGrid:React.FC<TonalVarietyGrid> = ({ tonalVariety = 1,  size}) => {
  const shades = tonalShades[tonalVariety] || tonalShades[0]; // Default to monolithic if invalid

  const {scaleAll, isSmallVersion} = useAppContext()
  const [isOpen, setIsOpen] = useState(false);

  const styles = stylesFunc(size * scaleAll)

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setHovered] = useState(false)
  const handleHoverIn = () => {
    setIsOpen(true)
    
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const handleHoverOut = () => {
    
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 500); // 500 ms delay
  };


  const renderTonalVariety = ({tonalVariety}: {tonalVariety: TonalVarietyGrid['tonalVariety']}) => {

    return <View style={[styles.container]}>
              {shades.map((color, index) => (
                <View key={index} style={[styles.cell, { backgroundColor: color }]} />
              ))}
              <View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text
                  style= {
                    {
                      fontFamily: webFont('Inter'),
                      color: tonalVariety >= 3 ? 'white' : 'black',
                      fontWeight: '600',
                      fontSize: (size >= 100 ? 18 : 14 * scaleAll),
                    }
                  }
                >{`V${tonalVariety}`}</Text>
              </View>
          </View>
  }

  const shadow: ViewStyle = {
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10
  } 
  return (
    <Popover
    placement={isSmallVersion ? 'left' : undefined}
    // placement={position === "auto" ? undefined : position}
    trigger={triggerProps => {
      return (
          <Pressable
          {...triggerProps} 

          onPress={() => setIsOpen(true)}
          // activeOpacity={0.6}
          onHoverIn={() => {
            setHovered(true)
            handleHoverIn()
          }} // Start countdown
          onHoverOut={() => {
            setHovered(false)
            handleHoverOut()
          }} // Cancel countdown
          >
            <View style={[{borderRadius: styles.container.borderRadius},isHovered ? shadow : {}]}>
              {renderTonalVariety({tonalVariety})}
            </View>
          </Pressable>
      )
    }} 

    // crossOffset={10}
    // offset={10}
    isOpen={isOpen} onClose={() => {
      setIsOpen(false)
    }}>
      <Popover.Content w={'56'}  >
        <Popover.Arrow/>
          <Popover.CloseButton />
          <Popover.Body>
            <Pressable onHoverIn={handleHoverIn} onHoverOut={handleHoverOut}>
              {[
                {
                  tonal: 1,
                  text: `  - Слабая`
                },
                {
                  tonal: 2,
                  text: `  - Средняя`
                },
                {
                  tonal: 3,
                  text: `  - Выраженная`
                },
                {
                  tonal: 4,
                  text: `  - Сильная`
                }
              ].map(data => {

                return (
                  <View style = {styles.containerPop}>
                    {renderTonalVariety({tonalVariety: data.tonal})}
                    <Text style = {styles.popText}>
                      {data.text}
                    </Text>
                  </View>
                )
              })}
             
            </Pressable>
          </Popover.Body>
      </Popover.Content>
    </Popover>
  );
};

const stylesFunc = (size: number) => StyleSheet.create({
  containerPop: {flexDirection: 'row', marginVertical: 10 ,alignItems: 'center'},
  popText: {
    fontFamily: webFont('Inter'),
    fontSize: 14,
    fontWeight: '500'
  },
  container: {
    
    height: size,
    aspectRatio: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderRadius: size/6,
    overflow: 'hidden',
    backgroundColor: '#BDBDBD', // Default background for invalid values
    padding: 3
  },
  cell: {
    width: '30%',
    height: '30%',
    margin: '1.5%', // Keeps grid structure neat
    borderRadius: size * 0.3 / 6
  }
});


export default TonalVarietyGrid;



