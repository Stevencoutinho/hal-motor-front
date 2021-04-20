/* myTypes */
import { GlobalState, Actions } from '@/types';

export const reducer = (state: GlobalState, action: Actions): GlobalState => {
  switch(action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name
        }
      };
    case "CAR":
      return {
        ...state,
        cars: action.payload
      }
    case "DAYSET":
      return {
        ...state,
        nextAuctionDay: action.payload
      }
    default:
      return { ...state };
  }
};