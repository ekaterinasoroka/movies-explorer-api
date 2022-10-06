const Movies = require('../models/movies');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movie = await Movies.find({});
    return res.status(200).send(movie);
  } catch (error) {
    return next(new ServerError('Произошла ошибка на сервере'));
  }
};

module.exports.createMovie = async (req, res, next) => {
  const owner = req.users._id;
  try {
    const movie = await Movies.create({
      owner, ...req.body,
    });
    return res.status(200).send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(new ServerError('Произошла ошибка на сервере'));
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  const userId = req.users._id;
  const { movieId } = req.params;
  try {
    const movie = await Movies.findById(movieId);
    if (!movie) {
      return next(new NotFoundError('Такого видео не существует'));
    }
    if (userId !== movie.owner.toString()) {
      return next(new ForbiddenError('Вы не можете удалить чужое видео'));
    }
    await Movies.findByIdAndDelete(movieId);
    return res.status(200).send({ message: 'Видео успешно удалено' });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new BadRequestError('Некорректные данные для удаления видео'));
    }
    return next(new ServerError('Произошла ошибка на сервере'));
  }
};
