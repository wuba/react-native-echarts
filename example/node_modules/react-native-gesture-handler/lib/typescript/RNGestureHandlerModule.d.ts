import { ActionType } from './ActionType';
export declare type RNGestureHandlerModuleProps = {
    handleSetJSResponder: (tag: number, blockNativeResponder: boolean) => void;
    handleClearJSResponder: () => void;
    createGestureHandler: (handlerName: string, handlerTag: number, config: Readonly<Record<string, unknown>>) => void;
    attachGestureHandler: (handlerTag: number, newView: number, actionType: ActionType) => void;
    updateGestureHandler: (handlerTag: number, newConfig: Readonly<Record<string, unknown>>) => void;
    dropGestureHandler: (handlerTag: number) => void;
    install: () => void;
    flushOperations: () => void;
};
declare const _default: RNGestureHandlerModuleProps;
export default _default;
