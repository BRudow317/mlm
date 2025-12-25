
export const Gradient = (color1, color2, ) => {
  return {
    background: `linear-gradient(180deg, ${color1}, ${color2})`,
  };
};

export const Glow = (color) => {

  return{
    boxShadow:`
      0 0 6px ${color},
      0 0 18px color-mix(in srgb, ${color} 70%, transparent),
      0 0 40px color-mix(in srgb, ${color} 45%, transparent)
  `}
};

/*-------------------------------------------------------------------------------------------------------*/
