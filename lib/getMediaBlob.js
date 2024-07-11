import TextToSVG from 'text-to-svg';
import getBounds from 'svg-path-bounds';
import sharp from 'sharp';
import getGlyph from './getGlyph.js';

// Create an image with a glyph centered:
// * Image aspect ratio is 16:9.
// * The image dimension is the glyph largest size * golden ratio.
// * The font size and colour are predictable.

const goldenRatio = (1 + Math.sqrt(5)) / 2;
const fonts = ['CuneiformComposite.ttf', 'NotoSansCuneiform.woff'];
const colours = [
  { foreground: '#9f1239', name: 'Rose' },
  { foreground: '#991b1b', name: 'Red' },
  { foreground: '#9a3412', name: 'Orange' },
  { foreground: '#92400e', name: 'Amber' },
  { foreground: '#854d0e', name: 'Yellow' },
  { foreground: '#3f6212', name: 'Lime' },
  { foreground: '#166534', name: 'Green' },
  { foreground: '#065f46', name: 'Emerald' },
  { foreground: '#115e59', name: 'Teal' },
  { foreground: '#155e75', name: 'Cyan' },
  { foreground: '#075985', name: 'Sky' },
  { foreground: '#1e40af', name: 'Blue' },
  { foreground: '#3730a3', name: 'Indigo' },
  { foreground: '#5b21b6', name: 'Violet' },
  { foreground: '#6b21a8', name: 'Purple' },
  { foreground: '#86198f', name: 'Fuchsia' },
  { foreground: '#9d174d', name: 'Pink' },
];
const textToSVGOptions = {
  fontSize: 320,
  anchor: 'center middle',
};

const getMediaBlob = (day = 0) =>
  new Promise((resolve, reject) => {
    const { glyph } = getGlyph(day);
    const font = fonts[day % fonts.length];
    const { foreground, name } = colours[day % colours.length];

    // Debug the data used to build the image.
    console.log(
      "Today's sign is %s. The font is %s and the colour is %s.",
      glyph,
      font.replace(/\.(woff|ttf)$/, ''),
      name,
    );

    TextToSVG.load('./fonts/' + font, async (err, textToSVG) => {
      if (err) {
        reject(err);
      }

      const d = textToSVG.getD(glyph, textToSVGOptions);

      const [left, top, right, bottom] = getBounds(d);
      const glyphWidth = right - left;
      const glyphHeight = bottom - top;

      console.log(
        'Glyph: %f × %f',
        glyphWidth.toFixed(2),
        glyphHeight.toFixed(2),
      );

      let svgHeight;
      let svgWidth;
      if (glyphWidth / glyphHeight <= 16 / 9) {
        svgHeight = glyphHeight * goldenRatio;
        svgWidth = Math.round((svgHeight * 16) / 9);
        svgHeight = Math.round(svgHeight); // Round after the calculations.
      } else {
        svgWidth = glyphWidth * goldenRatio;
        svgHeight = Math.round((svgWidth / 16) * 9);
        svgWidth = Math.round(svgWidth); // Round after the calculations.
      }

      console.log('Image: %i × %i', svgWidth, svgHeight);

      const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
  width="${svgWidth}"
  height="${svgHeight}"
  >
  <rect
    width="${svgWidth}"
    height="${svgHeight}"
    fill="#fff"
  />
  <rect
    width="${svgWidth}"
    height="${svgHeight}"
    fill="${foreground}"
    opacity=".2"
  />
  <path
    transform="translate(${svgWidth / 2},${svgHeight / 2 - (bottom + top) / 2})"
    d="${d}"
    fill="${foreground}"
  />
</svg>
`;

      try {
        const buffer = await sharp(Buffer.from(svg))
          .avif({ quality: 50 })
          .toBuffer();

        resolve(new Blob([buffer], { type: 'image/avif' }));
      } catch (err) {
        reject(err);
      }
    });
  });

export default getMediaBlob;
