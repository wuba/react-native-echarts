import { AdaptedEvent, EventTypes } from '../interfaces';
import EventManager from './EventManager';
export default class PointerEventManager extends EventManager {
    setListeners(): void;
    protected mapEvent(event: PointerEvent, eventType: EventTypes): AdaptedEvent;
}
