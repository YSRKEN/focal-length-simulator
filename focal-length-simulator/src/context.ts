import React from 'react';
import { Store } from './constant';

const StateContext = React.createContext<Store>({} as Store);

export default StateContext;
