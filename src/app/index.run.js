(function() {
  'use strict';

  angular
    .module('silverGroup')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
