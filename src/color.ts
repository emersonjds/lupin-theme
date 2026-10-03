export type Hex = `#${string}`;
export type Vision = 'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia';

// Machado, Oliveira & Fernandes 2009, severity 1.0, applied to linear RGB and clamped to gamut (01 header).
const visionMatrices: Record<Exclude<Vision, 'normal'>, number[][]> = {
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

const channels = (hex: Hex): number[] => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);

const opacity = (hex: Hex): number => (hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1);

const toLinear = (channel: number): number =>
  channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const toHex = (rgb: number[]): Hex =>
  `#${rgb.map((channel) => Math.round(channel * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;

const luminance = (hex: Hex): number => {
  const [red, green, blue] = channels(hex).map(toLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

export const contrast = (first: Hex, second: Hex): number => {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
};

export const composite = (over: Hex, base: Hex): Hex => {
  const alpha = opacity(over);
  const top = channels(over);
  return toHex(channels(base).map((channel, index) => top[index] * alpha + channel * (1 - alpha)));
};

// Björn Ottosson's OKLab, from linear sRGB.
const linearToOklab = ([red, green, blue]: number[]): number[] => {
  const long = Math.cbrt(0.4122214708 * red + 0.5363710372 * green + 0.0514459929 * blue);
  const medium = Math.cbrt(0.2119034982 * red + 0.6806995764 * green + 0.1073969266 * blue);
  const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);
  return [
    0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short,
    1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short,
    0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short,
  ];
};

const simulate = (linear: number[], vision: Vision): number[] =>
  vision === 'normal'
    ? linear
    : visionMatrices[vision].map((row) => Math.min(1, Math.max(0, row.reduce((sum, weight, index) => sum + weight * linear[index], 0))));

export const oklab = (hex: Hex): number[] => linearToOklab(channels(hex).map(toLinear));

export const deltaE = (first: Hex, second: Hex, vision: Vision = 'normal'): number => {
  const [a, b] = [first, second].map((hex) => linearToOklab(simulate(channels(hex).map(toLinear), vision)));
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
};
