import { BALANCE_ACTIONS } from "./balance-action";
import { BalanceActionTypeEnum, IBalance, IBalanceAction, IBalanceState } from "./type";

export const BalanceInitialState: IBalanceState = {
    total: 0,
    transactions: []
};

export const BalanceReducer = (state: IBalanceState, action: IBalanceAction) => {
    const { payload, type } = action;

    switch (type) {
        case BalanceActionTypeEnum.SET_TRANSACTIONS:
            let transactions = [payload, ...state.transactions] as IBalance[];
            BALANCE_ACTIONS.handleSaveBalance(transactions);
            return {
                ...state,
                transactions,
                total: transactions.reduce((acc, tr) => acc + tr.amount, 0)
            };
        case BalanceActionTypeEnum.SET_STORE_TRANSACTIONS:
            let ts = payload as IBalance[];

            return {
                ...state,
                transactions: ts,
                total: ts.reduce((acc, tr) => acc + tr.amount, 0)
            };
        case BalanceActionTypeEnum.CLEAR:
            BALANCE_ACTIONS.handleClear();
            return {
                ...state,
                transactions: [],
                total: 0,
            };
        default:
            return state;
    }
}