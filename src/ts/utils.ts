import {
  SVGBG,
  SVGICON,
  type SvgBgName,
  type SvgIconName,
} from './svg-data.ts';

function createSvg(d: string, viewBox: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);

  svg.append(path);
  return svg;
}

export function createElement<T extends HTMLElement>(
  tag: string,
  className?: string
): T {
  const el = document.createElement(tag) as T;
  if (className) el.classList.add(...className.split(' '));
  return el;
}

export function getSvgBg(name: SvgBgName, className?: string): SVGSVGElement {
  const { d, viewBox } = SVGBG[name];
  const svgBg = createSvg(d, viewBox);
  svgBg.classList.add('svgBg', `svgBg__${name}`);
  svgBg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
  if (className) svgBg.classList.add(...className.split(' '));
  return svgBg;
}

export function getSvgIcon(
  name: SvgIconName,
  className?: string
): SVGSVGElement {
  const { d, viewBox } = SVGICON[name];
  const svgIcon = createSvg(d, viewBox);
  svgIcon.classList.add('svgIcon');
  svgIcon.setAttribute('preserveAspectRatio', 'xMinYMin slice');
  if (className) svgIcon.classList.add(...className.split(' '));
  return svgIcon;
}
