import { combineReducers } from 'redux';
import { AUTHORIZE } from './types';

interface TypesState {
  authUser: {};
  global: [];
  favorited: [];
  my: [];
  loading: boolean;
  currentPost: {};
  comments: [];
}

const defState: TypesState = {
  loading: false,
  authUser: {},
  global: [],
  favorited: [],
  my: [],
  currentPost: {},
  comments: [],
};

const accountReducer = (state: {} = defState, action: any) => {
  switch (action.type) {
    case 'AUTHORIZE':
      return { ...state, authUser: { ...action.user } };
    default:
      return state;
  }
};

export const postsReducer = (state: {} = defState, action: any) => {
  switch (action.type) {
    case 'GLOBAL':
      return { ...state, global: action.posts };
    case 'FAVORITED':
      return { ...state, favorited: action.posts };
    case 'MY':
      return { ...state, my: action.posts };
    case 'LOADING':
      return { ...state, loading: action.loading };
    case 'GLOBAL_NEXT':
      return {
        ...state,
        global: [...state.global, ...action.posts],
      };
    case 'FAVORITED_NEXT':
      return {
        ...state,
        favorited: [...state.favorited, ...action.posts],
      };
    case 'MY_NEXT':
      return {
        ...state,
        my: [...state.my, ...action.posts],
      };
    case 'CURRENT_POST':
      return {
        ...state,
        currentPost: action.data,
      };
    default:
      return state;
  }
};

const comments = (state = defState, action: any) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return { ...state, comments: [...action.data] };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  accountReducer,
  postsReducer,
  comments,
});

export type RootState = ReturnType<typeof reducers>;
