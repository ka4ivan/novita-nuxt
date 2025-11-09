import auth from "./auth";
import profile from "./profile";
import ai from "./ai";

export default () => {
  return {
    auth: auth(),
    profile: profile(),
    ai: ai(),
  };
};
