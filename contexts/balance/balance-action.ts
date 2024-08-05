import { BALANCE_KEY } from "./balance-keys";
import { MMKV_STORAGE } from "@/config/mmkv";
import { IBalance } from "./type";

const handleSaveBalance = async (value: IBalance[]) => {
    MMKV_STORAGE(BALANCE_KEY).set(BALANCE_KEY, JSON.stringify(value));
};


const handleClear = () => {
    MMKV_STORAGE(BALANCE_KEY).delete(BALANCE_KEY);
};

export const BALANCE_ACTIONS = {
    handleSaveBalance,
    handleClear
}