import { createContext, useEffect, ReactNode, useReducer } from 'react';
import { BalanceInitialState, BalanceReducer } from './balance-reducer';
import { BalanceActionTypeEnum, IBalance, IBalanceContextProps } from './type';
import { BALANCE_KEY } from './balance-keys';
import { MMKV_STORAGE } from '@/config/mmkv';


export const BalanceContext = createContext<IBalanceContextProps>({
    total: 0,
    transactions: [],
    dispatch: () => { }
});

interface IBalanceProviderProps {
    children: ReactNode;
}

export function BalanceContextProvider({ children }: IBalanceProviderProps) {
    const [state, dispatch] = useReducer(BalanceReducer, BalanceInitialState);

    useEffect(() => {
        // Execute on initial load  - 
        checkStorageForData();
    }, []);


    const checkStorageForData = async () => {
        const storeBalance = MMKV_STORAGE(BALANCE_KEY).getString(BALANCE_KEY)

        if (storeBalance) {
            const parsedBalance = JSON.parse(storeBalance) as IBalance;
            
            dispatch({
                type: BalanceActionTypeEnum.SET_STORE_TRANSACTIONS,
                payload: parsedBalance
            });
        }
    };

    return (
        <BalanceContext.Provider value={{
            ...state,
            dispatch
        }}>{children}</BalanceContext.Provider>
    );
}