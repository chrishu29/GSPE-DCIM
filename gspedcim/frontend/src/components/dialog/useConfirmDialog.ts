// import { ref } from 'vue';

export function useConfirmDialog() {
  // const isDialogVisible = ref(false);
  // let resolveConfirmation: (value: boolean | PromiseLike<boolean>) => void;
  let resolveConfirmation: ((value: boolean) => void) | null = null;

  function confirmDeletion() {
    // isDialogVisible.value = true;
    return new Promise<boolean>((resolve) => {
      resolveConfirmation = resolve;
    });
  }

  function onCancel() {
    if (resolveConfirmation) {
      resolveConfirmation(false);
    }
    // isDialogVisible.value = false;
  }

  function onConfirm() {
    if (resolveConfirmation) {
      resolveConfirmation(true);
    }
    // isDialogVisible.value = false; // Assume you want to close the dialog on confirm as well
  }

  return {
    // isDialogVisible,
    confirmDeletion,
    onCancel,
    onConfirm,
  };
}
