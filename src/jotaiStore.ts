import { atom, useAtom } from "jotai";

export type FontConfig = {
  content: string,
  fontFamily: string,
  fontWeight: number,
  fontSize: number,
  fontSizeUnit: string,
}

export type DisplayConfig = {
  width: number,
  height: number,
  sizeUnit: string,
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
  fontWeight: 400,
  fontSize: 16,
  fontSizeUnit: 'px',
});