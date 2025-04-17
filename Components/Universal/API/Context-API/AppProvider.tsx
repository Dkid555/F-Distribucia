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

  
  const [dealersList, setDealers] = useState<dealer[]>([])

  // const setAllData = (x: AllKKpolData | null) => {
  //   setAllData_(x)
  //   await As
  // }

  

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
  



  const [brands, setBrands] = useState<Brand[] | null>(brands_test ?? [])

  const [SearcherBrands, setSearcherBrands] = useState<any | null> (
    null
  )
  useEffect(() => {

    console.log('brands', brands)
    setSearcherBrands(
      brands ? new Searcher(
        brands,
              {keySelector: (obj: Brand) => obj.brand},
          ) : null
    )
  }, [brands])


  return (
    <AppContext.Provider value={{
      brands, setBrands,
      dealersList, setDealers,
      SearchBarTopActive,setSearchBarTopActive,
      SearcherBrands, setSearcherBrands,
      isTooBigVersion,
      leftSlideOut, setLeftSlideOut,
      isMediumVersion, setMediumVersion,
      isSmallVersion, setSmallVersion,
      ModalWindow, setModalWindow,
      isIOS, isWeb, currentWidth, currentHeight, refWidth, refHeight, scaleAll, deviceType,
      ACCESS_TOKEN, setACCESS_TOKEN, X_API_TOKEN, setX_API_TOKEN,
    }}>
      {children}
    </AppContext.Provider>)
}

export default AppProvider

export interface ResultJSON { [key: string]: any }


export interface Brand {
    brand: string,
    url: string,
    image: string,
    description: string
}

const brands_test: Brand[] = [
    {
        brand: 'Creatile',
        url: 'https://creatile.pro',
        image: 'https://creatile.pro/js/c323ad4cc21a0765c5ba.png',
        description: 'Современные дизайнерские решения в керамической плитке.'
    },
    {
        brand: 'KKPOL',
        url: 'https://kkpol.ru/',
        image: 'https://kkpol.ru/upload/CNext/8fe/l5wj86ia2gywmnqx81a2nbp7vslxv3xg.svg',
        description: 'Производитель сантехнической продукции и инженерных решений.'
    },
    {
        brand: 'Deante',
        url: 'https://deante.pl/ru',
        image: 'https://deante.b-cdn.net/_MARKETING/NA%20WWW/logo.png?quality=75',
        description: 'Польский бренд сантехники с акцентом на стиль и функциональность.'
    },
    {
        brand: 'Atlas Concorde',
        url: 'https://www.atlasconcorde.com/',
        image: 'https://keramklinker.ru/upload/iblock/867/867376dcf0703072d3649833138d8f17.png',
        description: 'Международный лидер в производстве керамической плитки премиум-класса.'
    },
    {
        brand: 'Atlas Concorde Russia',
        url: 'https://www.atlasconcorde.com/ru/kollektsiya-ac-russia',
        image: 'https://sceramic.ru/upload/iblock/51b/51b5aefe0fd21de3efefdce31b28d2f3.png',
        description: 'Российское подразделение Atlas Concorde с адаптированными коллекциями.'
    },
];





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
