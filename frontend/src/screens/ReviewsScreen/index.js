import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { CourseSelector, Footer, FullScreenModal } from '../../components';
import NoCourseSubScreen from '../NoCourseSubScreen';
import CourseSubScreen from '../CourseSubScreen';
import {
  deleteReview,
  getCourseInfo,
  getCourses,
  getSubjects,
  sendReview,
} from '../../helpers';
import styles from './styles';

/**
 * Reviews screen that shows the course selector, the course information and the review write input.
 * @param {object} career current selected career
 *   @param {string} career.name name of the current selected career
 *   @param {number} career.id id of the current selected career
 * @param {function} goBack function to be called when the career indicator is pressed
 * @param {string} sessionId session id of the current user
 */
const ReviewsScreen = ({ career, goBack, sessionId }) => {
  const [subject, setSubject] = useState();
  const [course, setCourse] = useState();
  const [subjects, setSubjects] = useState();
  const [courses, setCourses] = useState();
  const [courseInfo, setCourseInfo] = useState();
  const [showModal, setShowModal] = useState();
  const [modalData, setModalData] = useState({});

  /**
   * Sets the current selected course and removes the previously selected course information
   */
  const _setCourse = (value) => {
    setCourse(value);
    setCourseInfo(undefined);
  };

  /**
   * Sets the current selected subject and removes the previously selected course, the course list, and the course info
   */
  const _setSubject = (value) => {
    setSubject(value);
    setCourse(undefined);
    setCourses(undefined);
    setCourseInfo(undefined);
  };

  useEffect(() => {
    const controller = new AbortController();
    /**
     * Gets the subjects list from BE and saves it to local state
     */
    const getSubjectsList = async () => {
      try {
        const response = await getSubjects(career.id, controller);
        setSubjects(response);
      } catch (error) {
        error && console.log(error);
      }
    };

    getSubjectsList();
    return () => controller.abort();
  }, [career]);

  useEffect(() => {
    const controller = new AbortController();
    /**
     * Gets the courses list for a given subject from BE and saves it to local state
     */
    const getCoursesList = async () => {
      try {
        const response = await getCourses(subject.id, controller);
        setCourses(response);
      } catch (error) {
        error && console.log(error);
      }
    };

    if (subject) {
      getCoursesList();
    }
    return () => controller.abort();
  }, [subject]);

  useEffect(() => {
    const controller = new AbortController();
    /**
     * Gets the reviews list for a given course from BE and saves it to local state
     */
    const getReviewsList = async () => {
      try {
        const response = await getCourseInfo(course.id, sessionId, controller);
        setCourseInfo(response);
      } catch (error) {
        error && console.log(error);
      }
    };

    if (course) {
      getReviewsList();
    }
    return () => controller.abort();
  }, [course]);

  /**
   * Sends a review written by the user to BE and refreshes the course info
   * @param {object} review review object to be sent
   *   @param {number} review.year year when the course was taken
   *   @param {string} review.content review text content
   *   @param {number} review.rate rate value
   *   @param {number} review.course course id
   */
  const sendCurrentReview = async (review) => {
    setModalData({
      onConfirm: async () => {
        await sendReview(review, sessionId);
      },
      onResultConfirm: async () => {
        setCourseInfo(undefined);
        const response = await getCourseInfo(course.id, sessionId);
        setCourseInfo(response);
      },
      questionText:
        '??Mandamos esta rese??a, m??quina? Igual si te mandaste una cagada pod??s borrarla y escribir otra.',
      errorText: 'No pudimos guardar tu rese??a.',
      successText: 'Tu rese??a se guard?? con ??xito.',
    });
    setShowModal(true);
  };

  /**
   * Deletes the review written by the user on BE and refreshes the course info
   * @param {number} reviewId id of the review to be deleted
   */
  const deleteOwnReview = async (reviewId) => {
    setModalData({
      onConfirm: async () => {
        await deleteReview(reviewId, sessionId);
      },
      onResultConfirm: async () => {
        setCourseInfo(undefined);
        const response = await getCourseInfo(course.id, sessionId);
        setCourseInfo(response);
      },
      questionText:
        '??Quer??s borrar la rese??a, m??quina? Igual no pasa nada, vas a poder escribir una rese??a nueva.',
      errorText: 'No pudimos borrar tu rese??a.',
      successText: 'Tu rese??a se borr?? con ??xito.',
    });
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.selectorContainer}>
        <CourseSelector
          subjects={subjects}
          courses={courses}
          subject={subject}
          course={course}
          career={career}
          goBack={goBack}
          setCourse={_setCourse}
          setSubject={_setSubject}
        />
      </div>
      <div style={styles.subScreenContainer}>
        {course && courseInfo ? (
          <CourseSubScreen
            sendCurrentReview={sendCurrentReview}
            reviews={courseInfo.reviews}
            ownReview={courseInfo.own_review}
            deleteOwnReview={deleteOwnReview}
            courseId={course.id}
          />
        ) : (
          <NoCourseSubScreen />
        )}
      </div>
      <Footer />
      {showModal && (
        <FullScreenModal
          onConfirm={modalData.onConfirm}
          onResultConfirm={modalData.onResultConfirm}
          questionText={modalData.questionText}
          errorText={modalData.errorText}
          successText={modalData.successText}
          onClose={() => {
            setShowModal(false);
            setModalData({});
          }}
        />
      )}
    </div>
  );
};

ReviewsScreen.propTypes = {
  career: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
};

export default ReviewsScreen;
