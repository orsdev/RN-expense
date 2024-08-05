import { FC, ReactNode } from 'react';
import { BalanceContextProvider } from './balance/balance-context';


interface IAppProviderProps {
    children: ReactNode;
}

export const AppContextProvider: FC<IAppProviderProps> = ({ children }) => (

    <BalanceContextProvider>
        {children}
    </BalanceContextProvider>
);