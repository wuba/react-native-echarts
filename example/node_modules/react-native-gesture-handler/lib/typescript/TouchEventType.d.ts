export declare const TouchEventType: {
    readonly UNDETERMINED: 0;
    readonly TOUCHES_DOWN: 1;
    readonly TOUCHES_MOVE: 2;
    readonly TOUCHES_UP: 3;
    readonly TOUCHES_CANCELLED: 4;
};
export declare type TouchEventType = typeof TouchEventType[keyof typeof TouchEventType];
