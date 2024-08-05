import { Dispatch } from "react"

export interface IBalance {
    id: string;
    title: string;
    amount: number;
    date: Date | null;
};

export interface IBalanceState {
    total: number;
    transactions: IBalance[];
};

export enum BalanceActionTypeEnum {
    SET_TRANSACTIONS = 'SET_TR',
    SET_STORE_TRANSACTIONS = 'SET_STORE_TR',
    CLEAR = 'CLEAR'
}

export interface IBalanceAction {
    payload?:  IBalance | IBalance[]
    type: BalanceActionTypeEnum;
}

export interface IBalanceContextProps extends IBalanceState {
    dispatch: Dispatch<IBalanceAction>
}