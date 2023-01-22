import axios from 'axios';

import { MOCK_URL } from '../constants/misc';

const axiosInstance = axios.create({ baseURL: MOCK_URL, timeout: 3000 });

/**
 * Gets the available carreers list
 * @returns a carreers list
 */
export const getCarreers = async () => {
  const { data } = await axiosInstance.get('/get-carreers');
  return data;
};

/**
 * Gets the available carreers list
 * @returns a carreers list
 */
export const getSubjects = async (carreerId) => {
  const { data } = await axiosInstance.get('/get-subjects', {
    params: { carreer: carreerId },
  });
  return data[0].subjects;
};

/**
 * Gets the available carreers list
 * @returns a carreers list
 */
export const getCourses = async (subjectId) => {
  const { data } = await axiosInstance.get('/get-courses', {
    params: { subject: subjectId },
  });
  return data[0].courses;
};