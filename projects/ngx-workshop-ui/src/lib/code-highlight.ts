import { highlightTree } from '@lezer/highlight';
import { synthwaveHighlighter } from './synthwave-tags';
import type { NgxCodeLanguage } from './code-types';
export interface CodeToken {
  readonly text: string;
  readonly className: string;
}
export async function highlightCode(
  source: string,
  language: NgxCodeLanguage,
): Promise<readonly CodeToken[]> {
  const parser = await loadParser(language);
  if (!parser) return [{ text: source, className: '' }];
  const tokens: CodeToken[] = [];
  let position = 0;
  highlightTree(parser.parse(source), synthwaveHighlighter, (from, to, className) => {
    if (from > position) tokens.push({ text: source.slice(position, from), className: '' });
    tokens.push({ text: source.slice(from, to), className });
    position = to;
  });
  if (position < source.length) tokens.push({ text: source.slice(position), className: '' });
  return tokens.length ? tokens : [{ text: source, className: '' }];
}
async function loadParser(language: NgxCodeLanguage) {
  switch (language) {
    case 'typescript':
      return (await import('@lezer/javascript')).parser.configure({ dialect: 'ts' });
    case 'javascript':
      return (await import('@lezer/javascript')).parser;
    case 'json':
      return (await import('@lezer/json')).parser;
    case 'html':
      return (await import('@lezer/html')).parser;
    case 'css':
      return (await import('@lezer/css')).parser;
    default:
      return null;
  }
}
