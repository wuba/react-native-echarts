declare type HandlerName = 'click' | 'dblclick' | 'mousewheel' | 'mouseout' | 'mouseup' | 'mousedown' | 'mousemove' | 'contextmenu';
export declare function calcDistance(x0: number, y0: number, x1: number, y1: number): number;
export declare function calcCenter(x0: number, y0: number, x1: number, y1: number): {
    x: number;
    y: number;
};
export declare function dispatchEvent(zrenderId: number, types: HandlerName[], nativeEvent: any, props?: any): void;
export {};
//# sourceMappingURL=events.d.ts.map