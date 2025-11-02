import auth from "./auth";
import profile from "./profile";

export default () => {
  return {
    auth: auth(),
    profile: profile(),
  };
};
