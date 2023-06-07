export declare const ActionType: {
    readonly REANIMATED_WORKLET: 1;
    readonly NATIVE_ANIMATED_EVENT: 2;
    readonly JS_FUNCTION_OLD_API: 3;
    readonly JS_FUNCTION_NEW_API: 4;
};
export declare type ActionType = typeof ActionType[keyof typeof ActionType];
