import { SVGBG, type SvgName } from './svg-data.ts';

function createSvg(d: string, viewBox: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', viewBox);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);

  svg.append(path);
  return svg;
}

export function createElement(tag: string, className?: string): HTMLElement {
  const el: HTMLElement = document.createElement(tag);
  if (className) el.classList.add(...className.split(' '));
  return el;
}

export function getSvg(name: SvgName, className?: string): SVGSVGElement {
  const { d, viewBox } = SVGBG[name];
  const svgBg = createSvg(d, viewBox);
  svgBg.classList.add('svgBg', `svgBg__${name}`);
  svgBg.setAttribute('preserveAspectRatio', 'xMinYMin slice');
  if (className) svgBg.classList.add(...className.split(' '));
  return svgBg;
}
