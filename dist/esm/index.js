/**
 * HTZ DISPATCH EVENT
 * -----
 * A utility for dispatching synthesized events from elements
 * -----
 * @module htz-dispatch-event
 * -----
 * @license MIT
 */
import * as tslib_1 from "tslib";
/**
 * HTZ DISPATCH EVENT
 * -----
 * A utility for dispatching synthesized events from elements
 * -----
 * @param {HTMLElement|Winodw} target The element, which will be used to dispatch the
 *    event and determines which event listeners will be invoked;
 * @param {String} type The name of the custom dispatched event
 * @param {Object} [detail] An optional value, of any type, which is an
 *    event-dependent value associated with the event.
 * @param {EventInit} [eventInit] An optional value, of any type, which is an
 *    event-dependent value associated with the event.
 * -----
 * @return {Boolean} `false` if at least one of the event handlers that handled the
 *   dispatched event called `Event.preventDefault()`, otherwise, `true`
 */
/**
 * HTZ DISPATCH EVENT
 * -----
 * A utility for dispatching synthesized events from elements
 * -----
 * @module htz-dispatch-event
 * -----
 * @license MIT
 */ export default function dispatchEvent(target, type, detail, eventInit) {
    if (eventInit === void 0) { eventInit = {
        bubbles: true,
        cancelable: true,
    }; }
    var custumeEventInit = tslib_1.__assign({}, eventInit, (detail ? { detail: detail } : {}));
    var event = new CustomEvent(type, custumeEventInit);
    return target.dispatchEvent(event);
}
//# sourceMappingURL=index.js.map