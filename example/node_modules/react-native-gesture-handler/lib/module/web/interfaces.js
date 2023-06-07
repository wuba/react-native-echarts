export let MouseButtons;

(function (MouseButtons) {
  MouseButtons[MouseButtons["NONE"] = 0] = "NONE";
  MouseButtons[MouseButtons["LEFT"] = 1] = "LEFT";
  MouseButtons[MouseButtons["RIGHT"] = 2] = "RIGHT";
  MouseButtons[MouseButtons["LEFT_RIGHT"] = 3] = "LEFT_RIGHT";
  MouseButtons[MouseButtons["SCROLL"] = 4] = "SCROLL";
  MouseButtons[MouseButtons["SCROLL_LEFT"] = 5] = "SCROLL_LEFT";
  MouseButtons[MouseButtons["SCROLL_RIGHT"] = 6] = "SCROLL_RIGHT";
  MouseButtons[MouseButtons["SCROLL_LEFT_RIGHT"] = 7] = "SCROLL_LEFT_RIGHT";
})(MouseButtons || (MouseButtons = {}));

export let EventTypes;

(function (EventTypes) {
  EventTypes[EventTypes["DOWN"] = 0] = "DOWN";
  EventTypes[EventTypes["ADDITIONAL_POINTER_DOWN"] = 1] = "ADDITIONAL_POINTER_DOWN";
  EventTypes[EventTypes["UP"] = 2] = "UP";
  EventTypes[EventTypes["ADDITIONAL_POINTER_UP"] = 3] = "ADDITIONAL_POINTER_UP";
  EventTypes[EventTypes["MOVE"] = 4] = "MOVE";
  EventTypes[EventTypes["ENTER"] = 5] = "ENTER";
  EventTypes[EventTypes["OUT"] = 6] = "OUT";
  EventTypes[EventTypes["CANCEL"] = 7] = "CANCEL";
})(EventTypes || (EventTypes = {}));

export let TouchEventType;

(function (TouchEventType) {
  TouchEventType[TouchEventType["UNDETERMINED"] = 0] = "UNDETERMINED";
  TouchEventType[TouchEventType["DOWN"] = 1] = "DOWN";
  TouchEventType[TouchEventType["MOVE"] = 2] = "MOVE";
  TouchEventType[TouchEventType["UP"] = 3] = "UP";
  TouchEventType[TouchEventType["CANCELLED"] = 4] = "CANCELLED";
})(TouchEventType || (TouchEventType = {}));

export let PointerType;

(function (PointerType) {
  PointerType["NONE"] = "none";
  PointerType["MOUSE"] = "mouse";
  PointerType["TOUCH"] = "touch";
  PointerType["PEN"] = "pen";
})(PointerType || (PointerType = {}));
//# sourceMappingURL=interfaces.js.map