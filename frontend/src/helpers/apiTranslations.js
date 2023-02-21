/* eslint-disable require-jsdoc */
// This is a translation layer, to convert all field names coming/going to BE from spanish to english.
// Ideally, this one should be the only file with spanish named variables in the entire project.

export const carreersUrl = () => {
  return '/carreras/';
};

export const carreersResponse = (response) => {
  const data = response?.map(({ nombre, id }) => {
    return { name: nombre, id: id };
  });
  return data;
};

export const subjectsUrl = () => {
  return '/materias/';
};

export const subjectsParams = ({ carreer }) => {
  return { carrera: carreer };
};

export const subjectsResponse = (response) => {
  const data = response?.map(({ nombre, id }) => {
    return { name: nombre, id: id };
  });
  return data;
};

export const coursesUrl = () => {
  return '/catedras/';
};

export const coursesParams = ({ subject }) => {
  return { materia: subject };
};

export const coursesResponse = (response) => {
  const data = response?.map(({ nombre, id }) => {
    return { name: nombre, id: id };
  });
  return data;
};

export const courseInfoUrl = () => {
  return '/resenias/';
};

export const courseInfoBody = ({ session_id }) => {
  return { session_id: session_id };
};

export const courseInfoParams = ({ course }) => {
  return { catedra: course };
};

export const courseInfoResponse = (response) => {
  const data = {
    // TODO replace for the corresponding logic when the response is defined
    // ...(response?.resenia_propia && {
    //   own_review: {
    //     year: response.resenia_propia.anio,
    //     content: response.resenia_propia.contenido,
    //     rate: response.resenia_propia.calificacion,
    //     id: response.resenia_propia.id,
    //   },
    // }),
    reviews: response?.map(({ anio, contenido, calificacion, id }) => {
      return {
        year: anio,
        content: contenido,
        rate: calificacion,
        id: id,
      };
    }),
  };
  return data;
};

export const sendReviewUrl = () => {
  return '/resenias/';
};

export const sendReviewBody = ({ review, session_id }) => {
  return {
    anio: review.year,
    contenido: review.content,
    calificacion: review.rate,
    catedra: review.course,
    session_id: session_id,
  };
};

export const deleteReviewUrl = (id) => {
  return '/resenias/' + id;
};

export const deleteReviewBody = ({ session_id }) => {
  return { session_id: session_id };
};

export const deleteReviewParams = ({ id }) => {
  return {
    id: id,
  };
};

export const loginUrl = () => {
  return '/login';
};

export const loginBody = ({ access_token }) => {
  return {
    token: access_token,
  };
};

export const loginResponse = (response) => {
  return response.session_id;
};
