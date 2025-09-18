export const generateSrcSet = (
  src: string,
  width: number,
  height?: number,
  factors: number[] = [0.75, 1, 1.5, 2, 3, 4], // Tamanhos para diferentes tipos de telas
) => {
  return factors
    .map((factor) => {
      const w = Math.round(width * factor);
      const h = height ? Math.round(height * factor) : undefined;
      const url = new URL(src);
      url.searchParams.set("width", `${w}`);
      if (h) url.searchParams.set("height", `${h}`);
      return `${url.href} ${w}w`;
    })
    .join(", ");
};
