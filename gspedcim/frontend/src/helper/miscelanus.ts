async function useDelay(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const handleClickOutside = (event: MouseEvent) => {
  if (!event.target) return;
  if ((event.target as Element).closest(".header-container")) return;
};

export { handleClickOutside, useDelay };
