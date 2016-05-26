# Custom Event Dispatcher

A convenience utility for firing a synthesized event.

Uses the `CustomEvent` constructor, which requires polyfill (provided by `polyfill.io`) in IE.

The function takes three arguments:
  - **target:** An HTMLElement, which will be used to dispatch the event and determines which event 
    listeners will be invoked;
  - **type:** A string representing the name of the dispatched event;
  - **detail:** An optional value, of any type, which is an event-dependent value associated with 
    the event.
