import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
  addFavoriteMovie,
  getFavoriteMovies,
  removeMovieFromFavoriteMovies,
} from "../controllers/movie.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);
router.post("/favorite", protectRoute, addFavoriteMovie);
router.get("/favorite/movie", protectRoute, getFavoriteMovies);
router.delete(
  "/favorite/movie/:id",
  protectRoute,
  removeMovieFromFavoriteMovies
);

export default router;
