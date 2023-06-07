import GestureHandler from '../handlers/GestureHandler';
import { Config } from '../interfaces';
export default class InteractionManager {
    private static instance;
    private readonly waitForRelations;
    private readonly simultaneousRelations;
    private constructor();
    configureInteractions(handler: GestureHandler, config: Config): void;
    shouldWaitForHandlerFailure(handler: GestureHandler, otherHandler: GestureHandler): boolean;
    shouldRecognizeSimultaneously(handler: GestureHandler, otherHandler: GestureHandler): boolean;
    shouldRequireHandlerToWaitForFailure(_handler: GestureHandler, _otherHandler: GestureHandler): boolean;
    shouldHandlerBeCancelledBy(_handler: GestureHandler, _otherHandler: GestureHandler): boolean;
    dropRelationsForHandlerWithTag(handlerTag: number): void;
    reset(): void;
    static getInstance(): InteractionManager;
}
