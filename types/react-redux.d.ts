import 'react-redux';

import { RootState } from '../Redux/Reducers';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
