import { atom, useAtom } from "jotai";

export type FontConfig = {
  content: string,
  fontFamily: string,
  fontWeight: string,
  fontSize: string,
  fontSizeUnit: string,
  lineHeight: string,
  letterSpacing: string,
  letterSpacingUnit: string,
}

export type DisplayConfig = {
  width: string,
  height: string,
  fontConfig: FontConfig,
};

export type FontDisplay = [
   id: string,
   config: DisplayConfig,
];

export const fontDisplaysAtom = atom<Record<string, DisplayConfig>>({});
export const upsertFontDisplayByIdAtom = atom(null, (_, set, [ id, config ]: FontDisplay) => {
  set(fontDisplaysAtom, (prev) => ({
    ...prev,
    [id]: config,
  }))
});

export const useFontDisplayById = (id: string) => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);

  return fontDisplays[id];
}

export const masterConfigAtom = atom<FontConfig>({
  content: '',
  fontFamily: 'Consolas',
  fontWeight: '400',
  fontSize: '16',
  fontSizeUnit: 'px',
  lineHeight: '1.2',
  letterSpacing: '0',
  letterSpacingUnit: 'px',
});