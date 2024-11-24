import { atom } from "jotai";

export type FontConfig = {
  fontFamily: string,
  width: number,
  height: number,
  sizeUnit: string,
};

export type FontDisplay = [
   id: string,
   config: FontConfig,
];

export const fontDisplaysAtom = atom<Record<string, FontConfig>>({});
export const upsertFontDisplayByIdAtom = atom(null, (_, set, [ id, config ]: FontDisplay) => {
  set(fontDisplaysAtom, (prev) => ({
    ...prev,
    [id]: config,
  }))
});