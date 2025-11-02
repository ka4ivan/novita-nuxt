export const useModalStore = defineStore("modal", () => {
  const modalSignIn = ref(false),
    auth = ref(false),
    modalSignOut = ref(false),
    loader = ref(false),
    successModalText = ref("");

  const modalForm = ref({
    name: "",
    surname: "",
    email: "",
    code: "",
    phone: "",
  });

  function logOut() {
    auth.value = false;
  }

  function logIn() {
    auth.value = true;
  }

  function toggleSignOutModal() {
    modalSignOut.value = !modalSignOut.value;
    scrollBody(true);
  }
  function toggleSignInModal() {
    modalSignIn.value = !modalSignIn.value;
    scrollBody(true);
  }
  function toggleLoader(val) {
    loader.value = val;
  }
  return {
    auth,
    logOut,
    logIn,
    modalSignIn,
    toggleSignInModal,
    modalSignOut,
    toggleSignOutModal,
    modalForm,
    loader,
    toggleLoader,
    successModalText,
  };
});
