import { FC, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { DisplayConfig, FontConfig, masterConfigAtom, upsertFontDisplayByIdAtom, useFontDisplayById,  } from "../../jotaiStore";
import { getStyles } from "../../utils";
import "./FontDisplay.scss";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const fontDisplay = useFontDisplayById(id);
  const [ , upsertFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ overwriteMaster, setOverwriteMaster] = useState<boolean>(false);

  const styles: React.CSSProperties = useMemo(() => (
    getStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  ), [fontDisplay, id, masterConfig]);

  const handleFontUpdate = (event: React.ChangeEvent<HTMLInputElement>, styleName: keyof FontConfig) => {
    const newConfig: DisplayConfig = {
      ...fontDisplay,
      fontConfig: {
        ...fontDisplay.fontConfig,
        [styleName]: event.target.value,
      }
    }

    upsertFontDisplayById([id, newConfig]);
  };

  return (
    <div className="font-display" style={styles}>
      {/* <div className="font-display__controls">
        <input type="text" onChange={(event) => handleFontUpdate(event, "fontFamily")}/>
      </div> */}
      <div className="font-display__content">
        {overwriteMaster ? fontDisplay.fontConfig.content : masterConfig.content}
      </div>
    </div>
  );
}