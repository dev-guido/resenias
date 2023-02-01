import axios from 'axios';

import { BASE_URL } from '../constants/misc';
import {
  carreersResponse,
  carreersUrl,
  courseInfoParams,
  courseInfoResponse,
  courseInfoUrl,
  coursesParams,
  coursesResponse,
  coursesUrl,
  deleteReviewParams,
  deleteReviewUrl,
  sendReviewBody,
  sendReviewUrl,
  subjectsParams,
  subjectsResponse,
  subjectsUrl,
} from './apiTranslations';

const axiosInstance = axios.create({ baseURL: BASE_URL, timeout: 15000 });

axiosInstance.interceptors.request.use((req) => {
  console.log('Request ' + req.url);
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    console.log('Response ' + res.config.url);
    return res;
  },
  (err) => {
    if (err.code === 'ERR_CANCELED') {
      console.log('Canceled ' + err.config.url);
      return Promise.reject(undefined);
    }
    return Promise.reject(err);
  },
);

/**
 * Gets the carreers list
 * @param {AbortController} controller controller to abort the request
 * @returns a carreers list
 */
export const getCarreers = async (controller) => {
  const { data } = await axiosInstance.get(carreersUrl('/get-carreers'), {
    signal: controller?.signal,
  });
  return carreersResponse(data);
};

/**
 * Gets the subjects list for a given carreer
 * @param {number} carreerId id of the carreer to get it's subjects
 * @param {AbortController} controller controller to abort the request
 * @returns a subjects list
 */
export const getSubjects = async (carreerId, controller) => {
  const { data } = await axiosInstance.get(subjectsUrl('/get-subjects'), {
    params: subjectsParams({ carreer: carreerId }),
    signal: controller?.signal,
  });
  return subjectsResponse(data);
};

/**
 * Gets the courses list for a given subject
 * @param {number} subjectId id of the subject to get it's courses
 * @param {AbortController} controller controller to abort the request
 * @returns a courses list
 */
export const getCourses = async (subjectId, controller) => {
  const { data } = await axiosInstance.get(coursesUrl('/get-courses'), {
    params: coursesParams({ subject: subjectId }),
    signal: controller?.signal,
  });
  return coursesResponse(data);
};

/**
 * Gets the course info for a given course
 * @param {number} courseId id of the course to get it's information
 * @param {AbortController} controller controller to abort the request
 * @returns a course information object
 */
export const getCourseInfo = async (courseId, controller) => {
  const { data } = await axiosInstance.get(courseInfoUrl('/get-course-info'), {
    params: courseInfoParams({ course: courseId }),
    signal: controller?.signal,
  });
  return courseInfoResponse(data);
};

/**
 * Sends a review written by the user
 * @param {object} review review object to be sent
 *   @param {number} review.year year when the course was taken
 *   @param {string} review.content review text content
 *   @param {number} review.rate rate value
 */
export const sendReview = async (review) => {
  await axiosInstance.post(
    sendReviewUrl('/create-review'),
    sendReviewBody({ review: review }),
  );
};

/**
 * Delete a review previously written by the user
 * @param {number} reviewId id of the review to be deleted
 */
export const deleteReview = async (reviewId) => {
  // TODO change method to DELETE when working with the real BE
  await axiosInstance.get(deleteReviewUrl('/delete-review'), {
    params: deleteReviewParams({ id: reviewId }),
  });
};
