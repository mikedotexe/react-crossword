"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Clue;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _context = require("./context");

var _excluded = ["direction", "number", "children", "correct"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ClueWrapper = _styledComponents["default"].div.attrs(function (props) {
  return {
    className: "clue" + (props.correct ? ' correct' : '')
  };
}).withConfig({
  displayName: "Clue__ClueWrapper",
  componentId: "sc-6vr1y0-0"
})(["cursor:default;background:", ";"], function (props) {
  return props.highlight ? 'linear-gradient(90deg,rgba(255, 255, 255, 0) 6%,rgba(255, 255, 255, 1) 19%,rgba(255, 255, 255, 0.6) 50%,rgba(174, 214, 213, 0.3)),linear-gradient(45deg,rgba(255, 255, 255, 0) 6%,rgba(255, 255, 255, 1) 19%,rgba(255, 255, 255, 1),rgba(255, 255, 255, 0));' : 'transparent';
});

var ClueHighlight = _styledComponents["default"].div.attrs(function () {
  return {
    className: 'clue-highlight'
  };
}).withConfig({
  displayName: "Clue__ClueHighlight",
  componentId: "sc-6vr1y0-1"
})(["background:", ";"], function (props) {
  return props.highlight ? "linear-gradient(.25turn, rgba(0,0,0,0) 1%, 10%, " + props.highlightBackground + " 100%, 10%, rgba(0,0,0,0) 1%)" : 'transparent';
});

function Clue(_ref) {
  var direction = _ref.direction,
      number = _ref.number,
      children = _ref.children,
      correct = _ref.correct,
      props = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);

  var _useContext = (0, _react.useContext)(_styledComponents.ThemeContext),
      clueHighlightBackground = _useContext.clueHighlightBackground;

  var _useContext2 = (0, _react.useContext)(_context.CrosswordContext),
      focused = _useContext2.focused,
      selectedDirection = _useContext2.selectedDirection,
      selectedNumber = _useContext2.selectedNumber,
      onClueSelected = _useContext2.onClueSelected;

  var handleClick = (0, _react.useCallback)(function (event) {
    event.preventDefault();

    if (onClueSelected) {
      onClueSelected(direction, number);
    }
  }, [direction, number, onClueSelected]);
  return /*#__PURE__*/_react["default"].createElement(ClueWrapper, (0, _extends2["default"])({
    highlight: focused && direction === selectedDirection && number === selectedNumber,
    correct: correct
  }, props, {
    onClick: handleClick,
    "aria-label": "clue-" + number + "-" + direction
  }), number, ": ", children, /*#__PURE__*/_react["default"].createElement(ClueHighlight, {
    highlightBackground: clueHighlightBackground,
    highlight: focused && direction === selectedDirection && number === selectedNumber
  }));
}

process.env.NODE_ENV !== "production" ? Clue.propTypes = {
  /** direction of the clue: "across" or "down"; passed back in onClick */
  direction: _propTypes["default"].string.isRequired,

  /** number of the clue (the label shown); passed back in onClick */
  number: _propTypes["default"].string.isRequired,

  /** clue text */
  children: _propTypes["default"].node,

  /** whether the answer/guess is correct */
  correct: _propTypes["default"].bool,
  isFilled: _propTypes["default"].bool
} : void 0;
Clue.defaultProps = {
  children: undefined,
  correct: undefined,
  isFilled: undefined
};