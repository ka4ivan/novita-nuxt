import auth from "./auth";
import profile from "./profile";
import ai from "./ai";
import favorites from "~/modules/favorites";
import media from "~/modules/media";

export default () => {
  return {
    ai: ai(),
    auth: auth(),
    favorites: favorites(),
    media: media(),
    profile: profile(),
  };
};
