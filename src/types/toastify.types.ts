import type { TypeOptions } from 'react-toastify';

export type TToastify = {
    message: string;
    type: TypeOptions;
    defaultPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};
