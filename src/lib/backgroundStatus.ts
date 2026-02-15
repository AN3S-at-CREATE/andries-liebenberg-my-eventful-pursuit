export let backgroundMounted = false;

export const setBackgroundFXMounted = (mounted: boolean) => {
  backgroundMounted = mounted;
};

export const getBackgroundFXStatus = () => ({ isMounted: backgroundMounted });
