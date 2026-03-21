'use strict';

var React = require('react');
var index_native = require('../contexts/Locale/index.cjs');

const useLanguage = () => React.useContext(index_native.LocaleContext);

exports.useLanguage = useLanguage;
//# sourceMappingURL=locale.cjs.map
