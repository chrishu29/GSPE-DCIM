import { reactive, toRefs } from "vue";

enum SnackbarType {
  Success = "success",
  Error = "error",
  Info = "info",
}

const state = reactive({
  message: "",
  visible: false,
  type: SnackbarType.Info,
});
function showSnackbar(
  message: string,
  type: SnackbarType = SnackbarType.Info,
  duration = 3000
) {
  state.message = message;
  state.type = type;
  state.visible = true;

  setTimeout(() => {
    state.visible = false;
    state.message = "";
  }, duration);
}

function useSnackbar() {
  return {
    ...toRefs(state),
    showSnackbar,
  };
}

export { SnackbarType, useSnackbar };
