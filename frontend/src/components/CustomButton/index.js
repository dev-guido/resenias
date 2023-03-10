import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { mergeStyles, onPressEvents } from '../../helpers';
import { ArrowIcon, GoogleIcon } from '../../images';
import styles from './styles';

/**
 * Career selection button, with a centered text and a press animation. Optionally, an arrow on the left side can be shown.
 * Alternatively, the content con be replaced by a childer component.
 * @param {any} children if present, replaces the whole content of the button for the children component
 * @param {string} text button text
 * @param {object} customStyles
 *   @param {object} customStyles.top custom styles for the top layer of the button
 *   @param {object} customStyles.bottom custom styles for the bottom layer of the button
 *   @param {object} customStyles.text custom styles for the button text
 *   @param {object} customStyles.highlight custom styles for the button higlight color
 * @param {function} onPress function to be called when the button in pressed
 * @param {bool} arrow if true, displays an arrow icon on the right of the button
 * @param {bool} googleLogo if true, displays a Google icon on the right of the button
 * @param {bool} disabled if true, the button is not interactable
 */
const CustomButton = ({
  children,
  text,
  customStyles = {},
  onPress,
  arrow,
  googleLogo,
  disabled,
}) => {
  const [animate, setAnimate] = useState(false);

  return (
    <button
      disabled={disabled}
      style={mergeStyles([styles.buttonBottom, customStyles.bottom])}
      {...onPressEvents({
        start: () => !disabled && setAnimate(true),
        end: () => {
          setAnimate(false);
          onPress();
        },
        cancel: () => animate && setAnimate(false),
      })}
    >
      <div
        style={mergeStyles([
          styles.buttonTop,
          customStyles.top,
          animate && { ...styles.buttonPressed, ...customStyles.highlight },
        ])}
      >
        {children ? (
          children
        ) : (
          <>
            {arrow && <ArrowIcon width='3em' style={styles.arrow} />}
            {googleLogo && <GoogleIcon width='2em' style={styles.googleLogo} />}
            <span
              style={mergeStyles([
                styles.text,
                customStyles.text,
                disabled && styles.disabledText,
              ])}
            >
              {text}
            </span>
          </>
        )}
      </div>
    </button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.any,
  text: PropTypes.string,
  customStyles: PropTypes.shape({
    bottom: PropTypes.object,
    top: PropTypes.object,
    highlight: PropTypes.object,
    text: PropTypes.object,
  }),
  onPress: PropTypes.func.isRequired,
  arrow: PropTypes.bool,
  googleLogo: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CustomButton;
