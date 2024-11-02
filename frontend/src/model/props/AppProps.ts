import React from 'react';
import { BrowserRouterProps, MemoryRouterProps } from 'react-router-dom';

export interface AppProps {
  Router?: React.ComponentType<BrowserRouterProps | MemoryRouterProps>;
  initialEntries?: string[];
}
