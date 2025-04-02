import React from 'react';
import { createContext, MutableRefObject, useContext } from 'react';
import { AbsolutePositions } from '../Interfaces/Interfaces';

import { useAppContext } from './Context-API/AppContext';
import { Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { isObject } from 'lodash';



interface NavigateDefault {
  navigation: any;
  data?: object;
}

interface NavigateToProps extends NavigateDefault {
  
  goTo: string,
 
}

export const webFont = (font: string) =>
  Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`,
    default: font,
  })
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export const getAbsoultePositionsAPI = (Ref: MutableRefObject<any | null>): Promise<AbsolutePositions | false> => {
  return new Promise((resolve) => {
    if (Ref && Ref.current) {
      Ref.current.measure((x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
      });
    } else {
      resolve(false);
    }
  });
};

export const NavigateTo = ({ navigation, goTo, data }: NavigateToProps) => {
  try {
    if (data) {
      navigation.navigate(goTo, data);
    } else {
      navigation.navigate(goTo);
    }
  } catch (e) {
    console.error('Error message:', e);
  }
};

export const NavigationHomeWithReset = ({ navigation, data }: NavigateDefault) => {
  try {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home', params: data }], // Replace 'Home' with your actual screen name
      })
    );
  } catch (e) {
    console.error('Error resetting navigation:', e);
  }
};

interface getAllDataProps {
  mode?: 'allData' | 'dealers'
}

interface sendUserRequestProps{
  email: string,
  name: string,
  question: string,
  extraData?: {
    [key: string] : string
  }
}


interface APIContextProps {
  getAllData: (x: getAllDataProps) => Promise<void>;
  sendUserRequest: (x: sendUserRequestProps) => Promise<any>;
  serverUrl: string;
  sendPostRequest: (
    json_data: Record<string, any> | null,
    link: string | null,
    errorHandler?: { handle: (error: any) => any } | null,
    contentTypeCall?: string,
    responseTypeCall?: string,
    performOnFalse?: (() => void) | null,
    signal?: AbortSignal | null,
    otherHeaderProps?: Record<string, string>
  ) => Promise<any>;
  sendFormDataPostRequest: (props: {
    formData?: FormData | null;
    link: string;
    errorHandler?: { handle: (error: any) => any } | null;
    contentTypeCall?: string;
    responseTypeCall?: string;
    otherHeaderProps?: Record<string, string>;
  }) => Promise<any>;
}



const defaultAPIContext = {
  getAllData: async (
    x: getAllDataProps) => {},
  sendUserRequest: async (x: sendUserRequestProps) => {},
  serverUrl: 'https://creatile.pro/',
  sendPostRequest: async (
    json_data: Record<string, any> | null,
    link: string | null,
    errorHandler?: { handle: (error: any) => any } | null,
    contentTypeCall?: string,
    responseTypeCall?: string,
    performOnFalse?: (() => void) | null,
    signal?: AbortSignal | null,
    otherHeaderProps?: Record<string, string>
  )  => {},
  sendFormDataPostRequest:(props: {
    formData?: FormData | null;
    link: string;
    errorHandler?: { handle: (error: any) => any } | null;
    contentTypeCall?: string;
    responseTypeCall?: string;
    otherHeaderProps?: Record<string, string>;
  }) => {}
}as APIContextProps


const APIContext = createContext<APIContextProps>(defaultAPIContext);


export const APIProvider = ({ children }: {children: any}) => {
  
  const triggerNotification = (st: string) => {}


  const {X_API_TOKEN, ACCESS_TOKEN, setAllData, setDealers} = useAppContext()

  const serverUrl = process.env.NODE_ENV !== 'production' ? '/api/' : 
  'https://creatile.pro/';

  console.log(serverUrl)
  function trimToValidJson(inputString: string) {
    let leftIndex = 0;
    let rightIndex = inputString.length;

    // Trim from the left until we find '{'
    while (leftIndex < rightIndex && inputString[leftIndex] !== '{') {
        leftIndex++;
    }

    // Check if there is any content to parse
    if (leftIndex >= rightIndex) {
        return null;
    }

    // Start trimming from the right until we find '}'
    while (rightIndex > leftIndex) {
        let trimmedString = inputString.substring(leftIndex, rightIndex);
        try {
            JSON.parse(trimmedString);
            return trimmedString;
        } catch (error) {
            rightIndex--;
        }
    }

    return null;
}


  const sendPostRequest = async (
    json_data: Record<string, any> | null = null,
    link: string | null = null,
    errorHandler: ErrorHandler | null = null,
    contentTypeCall: string | null = 'application/json',
    responseTypeCall: string | null = 'application/json',
    performOnFalse: (() => void )| null,
    signal: AbortSignal | null = null, // Update the type of signal to AbortSignal
    otherHeaderProps: otherHeaderPropsProps = {}
): Promise<any> => {
    if (!link || !json_data) {
        console.log('You forgot to provide a link and data');
        return null;
    }

    try {
        console.log('json_data', json_data)

        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': contentTypeCall || 'application/json',
              'x-api-key': X_API_TOKEN,
              'access-token': ACCESS_TOKEN,
              ...otherHeaderProps
            },
            body: JSON.stringify(json_data),
          };
      
          if (signal) {
            fetchOptions.signal = signal; // Only include signal if it's provided
          }
      
        const response = await fetch(link, fetchOptions);

        const contentType = response.headers.get('Content-Type');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorText}`,
            );
        }
        
        if(response.ok){

            console.warn(response)
        

            if (
                responseTypeCall === 'application/json' ||
                responseTypeCall === 'user_register/json'
            ) {
                
        

                const data = trimToValidJson(await response.text());
             
                console.log('==============')
                if(data)
                console.log('==============')


               
                return JSON.parse(data);
            } else if (responseTypeCall === 'text/html') {
                const data = await response.text();
                console.log(data);
                return data;
            } else {
                console.log(response);
                if(response == null || typeof response == undefined ){
                  triggerNotification('SomethingWrong');
                }

                return response;
            }
        }else {
            if(response == null || typeof response == undefined ){
              triggerNotification('SomethingWrong');
            }
        }
    } catch (error) {
        if (errorHandler) {
            errorHandler.handle(error);
        }else {
            if (error.message.includes('Network request failed')) {
              triggerNotification('NoInternet');
            } else {
              triggerNotification('SomethingWrong');
            }
        }
        console.error('Error in sendPostRequest:', error);

        return null;
        
    }
};

  interface ErrorHandler{
    handle: (error: any) => any 
  }

  interface otherHeaderPropsProps {
    'x-api-key'?: string,
    'access-token'?: string,
  }
  interface sendFormDataPostRequestProps{
    formData?: FormData | null,
    link: string,
    errorHandler?: ErrorHandler | null
    contentTypeCall?: string,
    responseTypeCall?: string
    otherHeaderProps?: otherHeaderPropsProps
  }
  const sendFormDataPostRequest = async (
      {
        formData = null,
        link,
        errorHandler = null,
        contentTypeCall = 'application/json',
        responseTypeCall = 'application/json',
        otherHeaderProps =  {}

      } : sendFormDataPostRequestProps
  ): Promise<any> => {
      if (!link) {
          console.error('Link are required');
          return;
      }
      try {
        const headers = formData ? {} : { 'Content-Type': contentTypeCall || 'application/json' };

        const response = await fetch(
          serverUrl + link, {
          method: 'POST',
          body: formData ?? undefined,
          headers: {
            'x-api-key': X_API_TOKEN,// X_API_TOKEN,
            'access-token': ACCESS_TOKEN,///ACCESS_TOKEN
            ...otherHeaderProps
          },
          ...headers,
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        if (response.status === 204) {
          console.log('No content returned');
        }
        const result = await response.json(); 
        return result;
      } catch (error) {
          console.error(error)
          if (errorHandler) {
              errorHandler.handle(error);
          } else {
              if (error.message.includes('Network request failed')) {
                
              } else {
              }
          }

          console.error('Error in sendFormDataPostRequest:', error);
          throw error;
      }
  };


  const getAllData = async ({mode = 'allData' }:getAllDataProps) => {

    const link =  mode == 'allData' ? 'get-all-data' : 'get-dealers'
    console.warn(serverUrl + link, X_API_TOKEN)
    const formData = new FormData()
    formData.append('getAll', '1');
    const response = await sendFormDataPostRequest({
      link: link,
      formData:formData,
      otherHeaderProps: {
          'x-api-key' : X_API_TOKEN,
      }
    })
    if(response){
        console.warn(response)

        if(response.success){
            if(mode == 'dealers'){
              setDealers(response.data)
            }else 
              setAllData(response.data)
        }else {
          console.log('')
        }
    }
  }

  const sendUserRequest = async ({
    email,
    name,
    question,
    extraData
  }: sendUserRequestProps) => {
    const link = 'user-request'
    console.warn(serverUrl + link, X_API_TOKEN)
    const formData = new FormData()
    formData.append('email', email);
    formData.append('name', name);
    formData.append('question', question);

    if(extraData && isObject(extraData) && Object.keys(extraData).length > 0){
      Object.keys(extraData).forEach(key => {
        formData.append(key, extraData[key])
      })
    }
    const response = await sendFormDataPostRequest({
      link: link,
      formData:formData,
      otherHeaderProps: {
          'x-api-key' : X_API_TOKEN,
      }
    })

    if(response && response.success){
      return response;
    }
    else 
      return response
  }



  return (
    <APIContext.Provider value={{ getAllData,sendUserRequest, serverUrl, sendPostRequest, sendFormDataPostRequest }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
