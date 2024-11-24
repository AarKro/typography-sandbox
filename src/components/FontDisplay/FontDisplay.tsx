import { FC, useMemo } from "react";
import { useAtom } from "jotai";
import { FontConfig, fontDisplaysAtom, upsertFontDisplayByIdAtom,  } from "../../jotaiStore";
import "./FontDisplay.scss";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);
  const [ , updateFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);

  const style: React.CSSProperties = useMemo(() => {
    const config = fontDisplays[id];

    return {
      fontFamily: config.fontFamily, 
    }
  }, [fontDisplays, id]);

  const handleFontUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const config = fontDisplays[id];
    const newConfig: FontConfig = {
      ...config,
      fontFamily: event.target.value,
    }

    updateFontDisplayById([id, newConfig]);
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