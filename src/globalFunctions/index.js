export const calcHue = (sowingDates, item) => {
  let hue = 30;
  const hueStep = 330 / sowingDates.length;
  for (let date of sowingDates) {
    if (date === item) {
      if (date === '23sep - 30sep') {
        return (hue = 60);
      }
      return hue;
    }
    hue += hueStep;
  }
};
