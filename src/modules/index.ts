import auth from "./auth";
import profile from "./profile";
import ai from "./ai";
import favorites from "~/modules/favorites";

export default () => {
  return {
    ai: ai(),
    auth: auth(),
    favorites: favorites(),
    profile: profile(),
  };
};
