/* React */
import React from 'react';
/* MyTypes */
import { GlobalState } from '@/types';
/* reducer */
import { reducer } from '@/src/Reducer';
import dateToStr from "./utils/dateToStr";
// const dateToStr = (date: any, format: string) => {
//   if(!format) {
//     format = "YYYY-MM-DD hh:mm:ss";
//   }
//   // フォーマット文字列内のキーワードを日付に置換する
//   format = format.replace(/YYYY/g, date.getFullYear());
//   format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
//   format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
//   format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
//   format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
//   format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  
//   return format;
// }

const today = dateToStr(new Date(), "YYYY-MM-DD hh:mm:ss").split(' ');

const initialState: GlobalState = {
  user: { id: 0},
  today: today[0],
  nowTime: today[1],
  nextAuctionDay: "",
  cars: ""
};

export const Store = React.createContext<GlobalState | any>(initialState);

export const StoreProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};