import { FC, useMemo } from "react";
import { useAtom } from "jotai";
import { fontDisplaysAtom, updateFontDisplayByIdAtom } from "../../jotaiStore";
import "./FontDisplay.scss";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);
  const [ _, updateFontDisplayById ] = useAtom(updateFontDisplayByIdAtom);

  const style: React.CSSProperties = useMemo(() => {
    const font = fontDisplays[id];

    return {
      fontFamily: font, 
    }
  }, [fontDisplays]);

  const handleFontUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFontDisplayById([id, event.target.value]);
  };

  return (
    <div className="font-display" style={style}>
      <div className="font-display__controls">
        <input type="text" onChange={handleFontUpdate}/>
      </div>
      <div className="font-display__content">
        this is a sample text
      </div>
    </div>
  );
}