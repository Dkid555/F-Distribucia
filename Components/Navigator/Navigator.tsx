import * as React from 'react';
import { LinkingOptions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAPI } from '../Universal/API/API';
import HomeScreen from '../HomeScreen/HomeScreen';
import { useAppContext } from '../Universal/API/Context-API/AppContext';
import UnitFull from '../UnitFull/UnitFull';
import ScreenWrapper from './TopNavigator/ScreenWrapper/ScreenWrapper';



const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:8080', 'https://creatile.pro'],
  config: {
    screens: {
      // This will map to the Home screen when accessing the root URL.
    


      Home: '',
      
      Unit: {
        path: ':idUnit',
        parse: {
          idUnit: (idUnit: string) => {
            const parsedId = parseInt(idUnit, 10);
            return isNaN(parsedId) ? null : parsedId; // Фильтруем нечисловые значения
          },
        },
        stringify: {
          idUnit: (idUnit: number) => idUnit.toString(),
        },
      },

      Collection: {
        path: 'collection',
        parse: {
          collection_name: (name) => {
            console.log('🔥 Decoded Collection Name:', decodeURIComponent(name));
            return decodeURIComponent(name);
          },
        },
        stringify: {
          collection_name: (name) => encodeURIComponent(name),
        },
      },

      SearchPage: {
        path: 'search',
        parse: {
          query: (name) => {
            console.log('🔥 Decoded query ', decodeURIComponent(name));
            return decodeURIComponent(name);
          },
        },
        stringify: {
          query: (name) => encodeURIComponent(name),
        },
      },


      Collections: {
        path: 'collections'
      },
      
      WhereToBuy: {
        path: 'puchase-info'
      },

      About: 'about',

      Contacts: 'contacts'
    },
  },
} as LinkingOptions<any>;



import About from '../About/About';
import Collection from '../Collection/Collection';
import Collections from '../Collections/Collections';
import WhereToBuy from '../WhereToBuy/WhereToBuy';
import SearchPage from '../SearchPage/SearchPage';
import Contacts from '../Contacts/Contacts';
import TopNavigator, { handleTopNavigator } from './TopNavigator/TopNavigator';
import SlideOutMenu, { hanldeSlideOutMenu, option } from './TopNavigator/SlideOutMenu/SlideOutMenu';


// export default React.memo(Navigator);

const StackNavigator = () => (
  <Stack.Navigator
  >
    <Stack.Screen
      name="Home"
      options={{ headerShown: false, animationEnabled: false }}
    >
      {(props) => (
        <ScreenWrapper>
          <HomeScreen {...props} />
        </ScreenWrapper>
      )}
    </Stack.Screen>
    <Stack.Screen
      name="Unit"
      options={{ headerShown: false, animationEnabled: false }}
    >
      {(props) => (
        <ScreenWrapper>
          <UnitFull {...props} />
        </ScreenWrapper>
      )}
    </Stack.Screen>

    <Stack.Screen
      name="SearchPage"
      options={{ headerShown: false, animationEnabled: false }}
    >
      {(props) => (
        <ScreenWrapper>
          <SearchPage {...props} />
        </ScreenWrapper>
      )}
    </Stack.Screen>

    <Stack.Screen
      name="About"
      options={{ headerShown: false, animationEnabled: false }}
    >
      {(props) => (
        <ScreenWrapper>
          <About {...props} />
        </ScreenWrapper>
      )}
    </Stack.Screen>

    <Stack.Screen
      name="Collection"
      options={{ headerShown: false, animationEnabled: false }}
    >
      {(props) => (
        <ScreenWrapper>
          <Collection {...props} />
        </ScreenWrapper>
      )}
    </Stack.Screen>
    <Stack.Screen
      name="Collections"
      options={{ headerShown: false, animationEnabled: false }}
    >
      {(props) => (
        <ScreenWrapper>
          <Collections {...props} />
        </ScreenWrapper>
      )}
    </Stack.Screen>

    <Stack.Screen
      name='WhereToBuy'
      options={{ headerShown: false, animationEnabled: false,}}
    >
      {(props) => (
        <ScreenWrapper>
          <WhereToBuy {...props}/>
        </ScreenWrapper>
      )}

    </Stack.Screen>

    <Stack.Screen
      name='Contacts'
      options={{ headerShown: false, animationEnabled: false,}}
    >
      {(props) => (
        <ScreenWrapper>
          <Contacts {...props}/>
        </ScreenWrapper>
      )}

    </Stack.Screen>
  </Stack.Navigator>
);






// Main Navigator
const Navigator: React.FC<any> = () => {
  const { X_API_TOKEN,} = useAppContext();
  const {getAllData, serverUrl} = useAPI();

  const refRefreshData = React.useRef<null | number> (null)

  const refreshData = async () => {
    if (X_API_TOKEN && (serverUrl.length > 0 || __DEV__)) {
      try {
        await Promise.all([
          getAllData({ mode: 'allData' }),
          getAllData({ mode: 'dealers' }),
        ]);
      } catch (e) {
        console.warn('refreshData error', e);
      }
    }
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
    <NavigationContainer linking={linking}>
      {/* <DrawerNavigator /> */}
      {StackNavigator()}
    </NavigationContainer>
  );
};



export default React.memo(Navigator);

