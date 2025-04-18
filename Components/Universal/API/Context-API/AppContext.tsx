import {createContext, useContext} from 'react';
import { dealer } from '../../../WhereToBuy/Interfaces/Interface';
import { Brand } from './AppProvider';

export interface DefaultJSON {
    [key: string]: any 
}



export interface ModalWindowProps{
    enabled: boolean
    ModalWindow: React.ReactNode | null
}

const defaultValue = {
    deviceType: 'ios',
    isWeb: false,
    isIOS: false,
    scaleAll: 1,
    currentHeight: 0,
    currentWidth: 0,
    refWidth: 0,
    refHeight: 0,

    ACCESS_TOKEN: '',
    setACCESS_TOKEN: (token: '') => {},
    X_API_TOKEN: '',
    setX_API_TOKEN: (token: '') => {},
    brands: [] as Brand[] | null,
    setBrands: (x: Brand[] | null) => {},

    ModalWindow: {
        enabled: false,
        ModalWindow: null
    } as ModalWindowProps,


    setModalWindow: (ModalWindow: ModalWindowProps) => {},
    isSmallVersion: false, setSmallVersion: (x: boolean) => {},

    isMediumVersion: false, setMediumVersion: (x: boolean) => {},

    isTooBigVersion: false, setTooBigVersion: (x: boolean) => {},

    leftSlideOut: false, setLeftSlideOut: (x: boolean) => {},
    SearcherUnit: null as any | null, setSearcherUnit: (x: any | null) => {},
    setSearchBarTopActive: (x: boolean) => {},
    SearchBarTopActive: false as boolean,

    dealersList: [] as dealer[],
    setDealers: (x: dealer[]) => {},
    SearcherBrands: null as any, 
    setSearcherBrands: (x: any) => {}

}
 

const AppContext = createContext(defaultValue);

export const useAppContext = () => {   
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContext.Provider');
    }
    return context;
}


export default AppContext;