'use strict';

function createTreeEvent(value, originalEvent) {
  return {
    value,
    target: {
      value
    },
    originalEvent
  };
}

exports.createTreeEvent = createTreeEvent;
//# sourceMappingURL=TreeEvents.cjs.map
