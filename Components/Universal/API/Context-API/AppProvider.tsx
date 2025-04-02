import React, { useState, useEffect, MutableRefObject } from 'react';
import AppContext, { DefaultJSON, ModalWindowProps } from './AppContext';
import { Dimensions, Platform } from 'react-native';
import { dealer } from '../../../WhereToBuy/Interfaces/Interface';

export const { Searcher } = require("fast-fuzzy");
// import Searcher   from 'fast-fuzzy'

interface AppProvider {
  children: React.ReactNode
}

const AppProvider: React.FC<AppProvider> = ({ children }) => {

  const { width, height } = Dimensions.get('window');

  const [currentHeight, setCurrentHeight] = useState(height);
  const [currentWidth, setCurrentWidth] = useState(width);
  const aspectRatio = height / width;
  const [deviceType, setDeviceType] = useState(Platform.OS)
  const [isIOS, setIsIOS] = useState(deviceType === 'ios');

  const [isWeb, setIsWeb] = useState(deviceType === 'web');

  const refWidth = isWeb ? 1920 : (isIOS ? 390 : 412);
  const refHeight = isWeb ? 1080 : (isIOS ? 844 : 914);

  const [scaleAll, setScaleAll] = useState(
    // 1
    Math.min(currentWidth, refWidth) / refWidth
    // 0.8
    // 2
  );




  const baseRefWidth = isWeb ? 1920 : 390; // Base reference width (default to portrait)
  const baseRefHeight = isWeb ? 1080 : 844; // Base reference height (default to portrait)

  useEffect(() => {
    const updateDimensions = () => {
      const { width, height } = Dimensions.get('window');
      setCurrentWidth(width);
      setCurrentHeight(height);


      
      // Reference dimensions
      const baseRefWidth = isWeb ? 1920 : 390; // Use 1920px for desktops, 390px for mobile
      const baseRefHeight = isWeb ? 1080 : 844;

      // Determine if the screen is landscape or portrait
      const isLandscape = width > height;
      const refWidth = isLandscape ? baseRefHeight : baseRefWidth;
      const refHeight = isLandscape ? baseRefWidth : baseRefHeight;

      // Calculate scale factor based on width instead of aspect ratio
      let calculatedScale = width / refWidth;

      // Adjust scaling behavior for mid-sized screens
      if (width >= 1000 && width < 1400) {
        calculatedScale *= 1.1; // Slightly increase scaling for 1200px-1400px
      }

      // Set min/max limits to prevent extreme changes
      const minimumScale = 0.95; // Ensure elements are never too small
      const maximumScale = 1.25; // Prevent excessive growth
      calculatedScale = Math.max(minimumScale, Math.min(calculatedScale, maximumScale));

      setScaleAll(calculatedScale);
    };


    // Add event listener
    const subscription = Dimensions.addEventListener('change', updateDimensions);

    // Set initial scale
    updateDimensions();

    // Clean up on unmount
    return () => {
      subscription.remove();
    };
  }, [baseRefWidth, baseRefHeight, isWeb, isIOS]);


  const [ACCESS_TOKEN, setACCESS_TOKEN] = useState(
    window.env.ACCESS_TOKEN
  )
  const [X_API_TOKEN, setX_API_TOKEN] = useState(window.env.API_KEY)

  const [allUnitData, setAllUnitData] = useState<null | AllUnitKKpolData>(null)

  const [allCollectionsData, setAllCollectionsData] = useState<null | AllCollectionsKKpolData>(null)


  //TODO move it to async storage 
  const [allData, setAllData] = useState<null | AllKKpolData>(null)


  const [dealersList, setDealers] = useState<dealer[]>([])

  // const setAllData = (x: AllKKpolData | null) => {
  //   setAllData_(x)
  //   await As
  // }

  const [SearcherUnit, setSearcherUnit] = useState<any | null> (
    null
  )


  useEffect(() => {

    console.log('allUnitData', allUnitData)
    setSearcherUnit(
      allUnitData ? new Searcher(
        Object.values(allUnitData),
              {keySelector: (obj: KKpolData) => obj.id + ' ' + obj.col + obj.color1 + obj.color2+ obj.color3+ obj.full_size + obj.name + obj.material + obj.fab},
          ) : null
    )
  }, [allUnitData])

  useEffect(() => {
    if (allData) {
      setAllUnitData(allData.units)
      setAllCollectionsData(allData.collections)
    }
  }, [allData])

  const [ModalWindow, setModalWindow] = useState<ModalWindowProps>({
    enabled: false,
    ModalWindow: null
  })



  const [isSmallVersion, setSmallVersion] = useState(currentWidth < 1000)

  const [isMediumVersion, setMediumVersion] = useState(currentWidth < 1500)

  const [isTooBigVersion, setTooBigVersion] = useState(currentWidth > 1920)
  useEffect(() => {
    setSmallVersion(currentWidth < 1000)
    setMediumVersion(currentWidth < 1500)
    setTooBigVersion(currentWidth > 1920)
  }, [currentWidth])

  const [leftSlideOut, setLeftSlideOut] = useState(false)

  const [SearchBarTopActive,setSearchBarTopActive] = useState(false)
  




  return (
    <AppContext.Provider value={{
      dealersList, setDealers,
      SearchBarTopActive,setSearchBarTopActive,
      SearcherUnit, setSearcherUnit,
      isTooBigVersion,
      leftSlideOut, setLeftSlideOut,
      isMediumVersion, setMediumVersion,
      isSmallVersion, setSmallVersion,
      ModalWindow, setModalWindow,
      allUnitData, setAllUnitData,
      allData, setAllData,
      allCollectionsData, setAllCollectionsData,
      isIOS, isWeb, currentWidth, currentHeight, refWidth, refHeight, scaleAll, deviceType,
      ACCESS_TOKEN, setACCESS_TOKEN, X_API_TOKEN, setX_API_TOKEN,
    }}>
      {children}
    </AppContext.Provider>)
}

export default AppProvider

export interface AllUnitKKpolData {
  [key: string]: KKpolData
}

export interface AllKKpolData {
  units: AllUnitKKpolData,
  collections: AllCollectionsKKpolData
  about: {
    about_text_small: string[],
    about_small_image_address: string
    about_big_sections: any[]
  }
}

export interface AllCollectionsKKpolData {
  [key: string]: CollectionsKKpolData
}

export interface CollectionsKKpolData {
  collection_name: string,
  "units_ids": (keyof AllUnitKKpolData)[],
  "collection_small_image_slides_small_mmg": string[],
  "collection_full_image_gallery_slides": string[],
  "collection_small_image_gallery_slides_s": string[],
}

export interface KKpolData {
  "id": string,
  "fab": string,
  "col": string,
  "name": string,
  "poverh": string,
  "price": string,
  "height": string,
  "width": string,
  "material": string,
  "thick": string,
  "color1": string,
  "color2": string,
  "color3": string,
  "tema1": string,
  "tema2": string,
  "tema3": string,
  "tema4": string,
  "uri_small": string,
  "uri_full": string,
  'ed': string,
  "var": string,
  "ves": string,
  "vesED": string,
  "pack_m": string,
  "pack_pz": string,
  "ostatki": {
    FreeSklad: string,
    VPutiFree: string, 
    ReservSklad: string, 
    VPutiReserv: string
  },// string json, need to decode,
  'art': string,
  full_size: string,
  rect: string,
  relief: string
}
export interface ResultJSON { [key: string]: any }






export interface chunkJSONToArrayOfJSONsProps { json: DefaultJSON, chunkSize: number }

export const chunkJSONToArrayOfJSONs = ({ json, chunkSize }: chunkJSONToArrayOfJSONsProps): DefaultJSON[] => {
  const keys = Object.keys(json);
  const result: { [key: string]: any }[] = [];

  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunk = keys.slice(i, i + chunkSize).reduce((acc, key) => {
      acc[key] = json[key];
      return acc;
    }, {} as { [key: string]: any });

    result.push(chunk);
  }

  return result;
};


export function chunkArray(array: any[], chunkSize: number) {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
    array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
}
