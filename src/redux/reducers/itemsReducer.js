import { SET_ITEMS, SET_ITEMS_LOADING, ADD_ITEM, EDIT_ITEM,DELETE_ITEM, LOGIN_LOGOUT } from '../types'

const initialState = {
  items:[],
  itemsLoaded:false,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, items:action.items };
    case ADD_ITEM:
      return { ...state, items:[...state.items,action.item] };
    case SET_ITEMS_LOADING:
      return { ...state, itemsLoaded:action.itemsLoaded };
    case EDIT_ITEM:{
      //finds location of the current item and replaces it with newer version
      let newItems=[...state.items];
      newItems[newItems.findIndex((item)=>item.id==action.item.id)]=action.item;
      return { ...state, items:newItems };
    }
    case DELETE_ITEM:{
      let newItems=state.items;
      newItems.splice(newItems.findIndex((item)=>item.id===action.id),1);
      return { ...state, items:[...newItems] };
    }
    case LOGIN_LOGOUT:
      return { ...initialState };
    default:
      return state;
    }
}
