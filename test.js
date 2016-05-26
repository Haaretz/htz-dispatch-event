/* eslint-disable import/no-unresolved */
import fire from 'htz-dispatch-event';
/* eslint-enable import/no-unresolved */

/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
document.body.addEventListener('fakeEvent', (e) => {
  console.log('fakeEvent was fired');

  if (e.detail) {
    console.log(`detail is of type: ${typeof e.detail}`);
    e.target.textContent = 'fakeEvent with `detail` was fired';
  }
  else {
    e.target.textContent = 'fakeEvent was fired';
  }
});

fire(document.getElementById('one'), 'fakeEvent');
fire(document.getElementById('two'), 'fakeEvent', { key: 'value' });
