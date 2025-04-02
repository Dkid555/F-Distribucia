import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage, { Source } from "@d11/react-native-fast-image";

interface RhombusImageProps {
    source: Source
}
const RhombusImage:React.FC<RhombusImageProps> = ({
    source
}) => {
  return (
    <View style={styles.rhombus}>
        <FastImage
          source={source}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
   
  },
  rhombus: {
    borderWidth: 4,
    borderColor: '#09d7f5',
    width: 150,
    height: 150,
    transform: [{ rotate: '45deg' }], // Rotate container
    overflow: 'hidden', // Crop excess parts
  },
  image: {
    // width: 200,
    aspectRatio: 1,
    height: 200,
    position:'absolute',
    top:-30,
    left: -30,
    transform: [{ rotate: '-45deg' }], // Rotate image back
  },
});

export default RhombusImage;
