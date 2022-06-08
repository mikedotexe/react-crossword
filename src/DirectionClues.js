import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Clue from './Clue';

export default function DirectionClues({ direction, clues }) {
  // fuck JSX
  if (direction === 'across') {
    const acrossStyle = {
      transform: 'translateX(-12px)',
    };
    return (
      <div className="direction across">
        {/* use something other than h3? */}
        <h3 className="header">{direction.toUpperCase()}</h3>
        {clues.map(({ number, clue, correct }) => (
          <Clue
            key={number}
            direction={direction}
            number={number}
            correct={correct}
          >
            {clue}
          </Clue>
        ))}
        <div className="across-animation static">
          <object
            type="image/svg+xml"
            data="/across-static.svg"
            height="91"
            style={acrossStyle}
          >
            <img
              src="/across-static.svg"
              alt="Hand pointing vertically indicating down clues"
            />
          </object>
        </div>
        <div className="across-animation moving">
          <object
            type="image/svg+xml"
            data="/across.svg"
            height="91"
            style={acrossStyle}
          >
            <img
              src="/across.svg"
              alt="Hand pointing horizontally indicating across clues"
            />
          </object>
        </div>
      </div>
    );
  }
  const downDiv = {
    position: 'absolute',
    right: 0,
  };
  return (
    <div className="direction down">
      <div className="down-animation static" style={downDiv}>
        <object type="image/svg+xml" data="/across-static.svg" height="91">
          <img
            src="/across-static.svg"
            alt="Hand pointing vertically indicating down clues"
          />
        </object>
      </div>
      <div className="down-animation moving" style={downDiv}>
        <object type="image/svg+xml" data="/across.svg" height="91">
          <img
            src="/across.svg"
            alt="Hand pointing vertically indicating down clues"
          />
        </object>
      </div>
      <h3 className="header">{direction.toUpperCase()}</h3>
      {clues.map(({ number, clue, correct }) => (
        <Clue
          key={number}
          direction={direction}
          number={number}
          correct={correct}
        >
          {clue}
        </Clue>
      ))}
    </div>
  );
}

DirectionClues.propTypes = {
  /** direction of this list of clues ("across" or "down") */
  direction: PropTypes.string.isRequired,
  /** clues for this List's direction */
  clues: PropTypes.arrayOf(
    PropTypes.shape({
      /** number of the clue (the label shown) */
      number: PropTypes.string.isRequired,
      /** clue text */
      clue: PropTypes.node.isRequired,
      /** whether the answer/guess is correct */
      correct: PropTypes.bool,
      isFilled: PropTypes.bool,
      filledCounter: PropTypes.number,
    })
  ).isRequired,
};

DirectionClues.defaultProps = {};
