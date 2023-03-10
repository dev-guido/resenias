import React from 'react';
import PropTypes from 'prop-types';

import { NoReviewsIcon } from '../../images';
import { getRateLabel, getReviewYearLabel, mergeStyles } from '../../helpers';
import styles from './styles';

/**
 * Displays a scrollable review list.
 * @param {array} reviews review array to be shown
 */
const ReviewsList = ({ reviews = [] }) => {
  return (
    <>
      {reviews.length > 0 ? (
        <div style={styles.bottom}>
          {reviews.map(({ content, rate, year, id }) => (
            <div style={styles.reviewContainer} key={id}>
              <span style={styles.dataText}>{getReviewYearLabel(year)}</span>
              <span style={styles.contentText}>{content}</span>
              {getRateLabel(rate) && (
                <span style={styles.dataText}>
                  {'Nota a la cátedra: ' + getRateLabel(rate)}
                </span>
              )}
              {id !== reviews[reviews.length - 1]?.id && (
                <div style={styles.divider} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={mergeStyles([styles.bottom, styles.bottomNoReviews])}>
          <NoReviewsIcon width='4em' />
          <span style={styles.noReviewsText}>
            {'Todavía no hay reseñas para esta cátedra :('}
          </span>
        </div>
      )}
    </>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      content: PropTypes.string,
      rate: PropTypes.number,
      id: PropTypes.number,
    }),
  ),
};

export default ReviewsList;
