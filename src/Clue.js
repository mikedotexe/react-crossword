import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import styled, { ThemeContext } from 'styled-components';

import { CrosswordContext } from './context';

const ClueWrapper = styled.div.attrs((props) => ({
  className: `clue${props.correct ? ' correct' : ''}`,
}))`
  cursor: default;
  background: ${(props) =>
    props.highlight
      ? 'linear-gradient(90deg,rgba(255, 255, 255, 0) 6%,rgba(255, 255, 255, 1) 19%,rgba(255, 255, 255, 0.6) 50%,rgba(174, 214, 213, 0.3)),linear-gradient(45deg,rgba(255, 255, 255, 0) 6%,rgba(255, 255, 255, 1) 19%,rgba(255, 255, 255, 1),rgba(255, 255, 255, 0));'
      : 'transparent'};
`;

const ClueHighlight = styled.div.attrs((props) => ({
  className: 'clue-highlight',
}))`
  background: ${(props) =>
    props.highlight
      ? `linear-gradient(.25turn, rgba(0,0,0,0) 1%, 10%, ${props.highlightBackground} 100%, 10%, rgba(0,0,0,0) 1%)`
      : 'transparent'};
`;

export default function Clue({
  direction,
  number,
  children,
  correct,
  ...props
}) {
  const { clueHighlightBackground } = useContext(ThemeContext);
  const { focused, selectedDirection, selectedNumber, onClueSelected } =
    useContext(CrosswordContext);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      if (onClueSelected) {
        onClueSelected(direction, number);
      }
    },
    [direction, number, onClueSelected]
  );

  return (
    <ClueWrapper
      highlight={
        focused && direction === selectedDirection && number === selectedNumber
      }
      correct={correct}
      {...props}
      onClick={handleClick}
      aria-label={`clue-${number}-${direction}`}
    >
      {number}: {children}
      <ClueHighlight
        highlightBackground={clueHighlightBackground}
        highlight={
          focused &&
          direction === selectedDirection &&
          number === selectedNumber
        }
      />
    </ClueWrapper>
  );
}

Clue.propTypes = {
  /** direction of the clue: "across" or "down"; passed back in onClick */
  direction: PropTypes.string.isRequired,
  /** number of the clue (the label shown); passed back in onClick */
  number: PropTypes.string.isRequired,
  /** clue text */
  children: PropTypes.node,
  /** whether the answer/guess is correct */
  correct: PropTypes.bool,
  isFilled: PropTypes.bool,
};

Clue.defaultProps = {
  children: undefined,
  correct: undefined,
  isFilled: undefined,
};
