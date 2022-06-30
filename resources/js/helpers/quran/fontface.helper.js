export const fontfaceStyle = (fontClassName, page) => (
    `@font-face {
      font-family: '${fontClassName}';
      src: url("/font/quran/woff2/p${page}.woff2") format("woff2");
      font-display: block;
     }
  
    .${fontClassName} {
      font-family: ${fontClassName};
      direction: rtl;
     }
    `
);
  
export const getQuranFont = (page, baseURL) => {
  return `${baseURL}/font/quran/woff2/p${page}.woff2`;
}

export const addFontface = ({fonts, family, page, options:{ baseURL }}) => {
  if (!fonts.some(font => font === family)) {
      const font = new FontFace(family, `url(${getQuranFont(page, baseURL)})`, { display: 'block' });
      document.fonts.add(font);
      fonts.push(font.family);
  }
  return fonts;
};

export const getGlobalFont = () => {
  const fonts = [];
  document.fonts.forEach(font => {
      if (font.family.includes('quran')){
          fonts.push(font.family);
      }
  });
  return fonts;
}
  