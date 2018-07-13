declare module 'react-feather' {
  import {StatelessComponent} from 'react'
  import * as ReactFeather from 'react-feather'

  export interface FeatherIcon {
    size?: number;
    color?: string;
  }
  
  export interface ReactFeatherModule {
    [key: string]: StatelessComponent<FeatherIcon>;
  }

  export const ArrowLeft: StatelessComponent<FeatherIcon>;
  export const ArrowRight: StatelessComponent<FeatherIcon>;
  export const Box: StatelessComponent<FeatherIcon>;
  export const ChevronLeft: StatelessComponent<FeatherIcon>;
  export const Plus: StatelessComponent<FeatherIcon>;
  export const FileText: StatelessComponent<FeatherIcon>;
}

