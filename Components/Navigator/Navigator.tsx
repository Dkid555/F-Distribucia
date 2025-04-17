import * as React from 'react';
import { LinkingOptions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigateTo, useAPI } from '../Universal/API/API';
import HomeScreen from '../HomeScreen/HomeScreen';
import { useAppContext } from '../Universal/API/Context-API/AppContext';
import ScreenWrapper from './TopNavigator/ScreenWrapper/ScreenWrapper';
import About from '../About/About';
import WhereToBuy from '../WhereToBuy/WhereToBuy';
import Contacts from '../Contacts/Contacts';
import TopNavigator from './TopNavigator/TopNavigator';
import { hanldeSlideOutMenu, option } from './TopNavigator/SlideOutMenu/SlideOutMenu';
import Warehouse from '../Warehouse/Warehouse';
import TabNavigator from './Navigators/TabNavigator';
import { Box, View } from 'native-base';
import { useWindowDimensions } from 'react-native';
import Brands from '../Brands/Brands';
import StackNavigator from './Navigators/StackNavigator';



const linking = {
  prefixes: ['http://localhost:8080', 'https://plitkazavr.ru'],
  config: {
    screens: {
      // This will map to the Home screen when accessing the root URL.
      Home: '', // our about


      WhereToBuy: {
        path: 'puchase-info'
      },

      Warehouse: 'warehouse',

      Contacts: 'contacts'
    },
  },
} as LinkingOptions<any>;

// export default React.memo(Navigator);

export const optionsFunction = ({
  variant = "top",
  navigation,

}: {
  navigation: any,
  variant: "top" | "left";
}): option[] => [

    {
      text: "Остатки",
      onPress: () => {
        NavigateTo(
          {
            navigation,
            goTo: 'Warehouse',
          }
        )

      },
      onHoverIn: () => {

      },
      onHoverOut: async () => {

      },
    },
    {
      text: "Наши Бреды",
      onPress: () => {
        NavigateTo(
          {
            navigation,
            goTo: 'Brands',
          }
        )
      },
      onHoverIn: () => {

      },
      onHoverOut: () => {
        // onHoverOut('Каталог', refTopSlideOutCatalog)
      },
    },
    {
      text: "Где купить",
      onPress: () => {
        NavigateTo(
          {
            navigation,
            goTo: 'WhereToBuy',
          }
        )
      },
      onHoverIn: () => { },
      onHoverOut: () => { },
    },
    {
      text: "Контакты",
      onPress: () => {
        NavigateTo(
          {
            navigation,
            goTo: 'Contacts',
          }
        )
      },
      onHoverIn: () => { },
      onHoverOut: () => { },
    },
  ];

const NavigationResulted = () => {
  const refSlideOutMenu = React.useRef<hanldeSlideOutMenu>(null)

  const navigation = useNavigationContainerRef()

  const refInterval = React.useRef<number | null>(null)
  React.useEffect(() => {
    if (refInterval.current) {
      clearInterval(refInterval.current)
    }

    refInterval.current = window.setInterval(() => {
      // console.log('JJJJJ')
      // onHoverOut({screen: "О компании", refTopSlideOut_: refTopSlideOut})
      // onHoverOut({screen: "Каталог", refTopSlideOut_:  refTopSlideOutCatalog})
    }, 2000)

    return (() => {
      if (refInterval.current) {
        clearInterval(refInterval.current)
      }
    })
  }, [])


  const { isSmallVersion } = useAppContext()
  const { height } = useWindowDimensions()
	return (
		<View style={{ height: height, display: 'flex' }}>
      <NavigationContainer linking={linking}
        ref={navigation}
      >

        {isSmallVersion ? 
          <TabNavigator navigationRef={navigation} refSlideOutMenu={refSlideOutMenu} /> :
          <StackNavigator navigationRef={navigation} refSlideOutMenu={refSlideOutMenu} />
        }

      </NavigationContainer>
    </View>
  )
};






// Main Navigator
const Navigator: React.FC<any> = () => {
  const { X_API_TOKEN, } = useAppContext();
  const { getAllData, serverUrl } = useAPI();

  const refRefreshData = React.useRef<null | number>(null)

  const refreshData = async () => {
    // if (X_API_TOKEN && (serverUrl.length > 0 || __DEV__)) {
    //   try {
    //     await Promise.all([
    //       getAllData({ mode: 'allData' }),
    //       getAllData({ mode: 'dealers' }),
    //     ]);
    //   } catch (e) {
    //     console.warn('refreshData error', e);
    //   }
    // }
  };

  React.useEffect(() => {
    if (refRefreshData.current) {
      clearInterval(refRefreshData.current);
    }

    refreshData(); // initial run

    refRefreshData.current = window.setInterval(() => {
      refreshData();
    }, 5 * 60 * 1000); // every 5 minutes

    return () => {
      if (refRefreshData.current) {
        clearInterval(refRefreshData.current);
      }
    };
  }, [X_API_TOKEN, serverUrl]);

  return (
    <NavigationResulted/>
  );
};



export default React.memo(Navigator);