import { expect } from 'chai';
import * as sinon from 'sinon';
import dispatchEvent from './index';

describe('# dispatchEvent()', () => {
  describe('## target and type', () => {
    function testTarget(target: HTMLElement | Window): void {
      const eventSpy = sinon.spy();
      target.addEventListener('test-event', eventSpy);
      dispatchEvent(target, 'test-event');

      expect(eventSpy.calledOnce).to.be.true;

      target.removeEventListener('test-event', eventSpy);
    }

    it('Dispatches an event of the correct type from "target" when it is an HTML Element', () => {
      const target = document.createElement('div');
      testTarget(target);
    });
    it('Dispatches an event of the correct type from "target" when it is the documentElement', () => {
      const target = document.documentElement;
      testTarget(target);
    });
    it('Dispatches an event of the correct type from "target" when it is the window', () => {
      const target = window;
      testTarget(target);
    });
  });

  describe('## detail object', () => {
    function testDetail(detail?: object): void {
      const target = document.createElement('div');
      const eventSpy = sinon.spy();
      target.addEventListener('test-event', eventSpy);
      dispatchEvent(target, 'test-event', detail);

      const spyDetail = eventSpy.getCall(0).args[0].detail;

      expect(spyDetail).to.eq(detail ? detail : null);

      target.removeEventListener('test-event', eventSpy);
      target.remove();
    }

    it('can be dispatched without a "detail" object', () => {
      testDetail({
        one: 'one',
        two: { nested: true, },
      });
    });
    it('can be dispatched with a "detail" object', () => {
      testDetail();
    });
  });

  describe('## eventInit object', () => {
    function testEventInit(eventInit?: EventInit, detail?: object): [HTMLElement, CustomEvent] {
      const target = document.createElement('div');
      const eventSpy = sinon.spy();
      target.addEventListener('test-event', eventSpy);
      dispatchEvent(target, 'test-event', detail, eventInit);

      return [target, eventSpy.getCall(0).args[0]];
    }
    it('Merges "detail" and "eventInit" correctly', () => {
      const [target, spyEvent] = testEventInit({ bubbles: false, }, { one: 'one' });
      expect(spyEvent.bubbles).to.be.false;
      expect(spyEvent.detail.one).to.eq('one');

      target.remove();
    });
    it('Can be cancleable by default', () => {
      const [target, spyEvent] = testEventInit();
      expect(spyEvent.cancelable).to.be.true;

      target.remove();
    });
    it('Can be non-cancleable', () => {
      const [target, spyEvent] = testEventInit({ cancelable: false, });
      expect(spyEvent.cancelable).to.be.false;

      target.remove();
    });
    it('Can bubbles up the DOM by default', () => {
      const [target, spyEvent] = testEventInit();
      expect(spyEvent.bubbles).to.be.true;

      target.remove();
    });
    it('Can be prevented from bubbling up the DOM', () => {
      const [target, spyEvent] = testEventInit({ bubbles: false, });
      expect(spyEvent.bubbles).to.be.false;

      target.remove();
    });
  });

  describe('## Return value', () => {
    it('Returns "true" if "evt.preventDefault()" is not called in a handler', () => {
      const target = document.createElement('div');
      target.addEventListener('test-event', (evt => evt.target));
      const retValue = dispatchEvent(target, 'test-event');

      expect(retValue).to.be.true;
      target.remove();
    });
    it('Returns "false" if "evt.preventDefault()" is called in a handler', () => {
      const target = document.createElement('div');
      target.addEventListener('test-event', (evt => evt.preventDefault()));
      const retValue = dispatchEvent(target, 'test-event');

      expect(retValue).to.be.false;
      target.remove();
    });
  });
});
