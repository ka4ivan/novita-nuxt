import { useModalStore } from "./modal";
import {useProfileStore} from "./profile";

export default () => {
    return {
        modal: useModalStore(),
        profile: useProfileStore()
    };
};
