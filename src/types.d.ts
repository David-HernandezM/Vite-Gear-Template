import { Value } from '@gear-js/react-hooks/dist/esm/context/Account';

export type GearApiHook = IGearApi;
export type GearAccountHook = Value;

export interface IGearApi {
    api: import("@gear-js/api").GearApi;
    isApiReady: boolean;
};

export interface GearHooks {
    gearApi: GearApiHook,
    account: GearAccountHook
}

