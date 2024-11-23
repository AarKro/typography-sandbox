import { atom } from "jotai";

export type FontDisplay = [ id: string, font: string ];

export const fontDisplaysAtom = atom<Record<string, string>>({});
export const updateFontDisplayByIdAtom = atom(null, (_, set, [ id, font ]: FontDisplay) => {
  set(fontDisplaysAtom, (prev) => ({
    ...prev,
    [id]: font,
  }))
});