import {RspcProvider} from '@/stores/ClientStore.ts'
import {type ReactNode} from "react";

export default ({children}: {children: ReactNode}) => {
    return (
        <RspcProvider>
            {children}
        </RspcProvider>
    );
};
