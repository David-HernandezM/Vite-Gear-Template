import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { LOCAL_STORAGE } from '../consts';

const isLoggedIn = ({ address }: InjectedAccountWithMeta) => localStorage[LOCAL_STORAGE.ACCOUNT] === address;

const formatAddress = (address: string | undefined): `0x${string}` => {
    if (!address) {
        return `0x00`;
    }
    return `0x${address.slice(2)}`;
};

export { isLoggedIn, formatAddress };
