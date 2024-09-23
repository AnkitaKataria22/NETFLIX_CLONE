import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  favroiteMovieList: [],
  searchHistory: [],
  setFavroiteMovieList: (movies) => set({ favroiteMovieList: movies }),

  addFavoriteMovie: async (movie) => {
    try {
      const res = await axios.post("/api/v1/movie/favorite", movie);
      toast.success("Movie added to My Favorite Movies successfully");
    } catch (error) {
      toast.error(error.message || "Could not able to add favorite movie");
    }
  },
  getFavoriteMovies: async () => {
    try {
      const res = await axios.get("/api/v1/movie/favorite/movie");
      set({ favroiteMovieList: res.data.content });
    } catch (error) {
      console.log(error);
    }
  },
  removeMovieFromFavoriteMovies: async (id) => {
    try {
      const res = await axios.delete(`/api/v1/movie/favorite/movie/` + id);
      toast.success("Movie removed from My Favorite Movies successfully");
    } catch (error) {
      console.log(error);
    }
  },
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");

      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
