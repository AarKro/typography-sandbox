import { FC, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { masterConfigAtom, useFontDisplayById,  } from "../../jotaiStore";
import { getStyles } from "../../utils";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const fontDisplay = useFontDisplayById(id);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ overwriteMaster ] = useState<boolean>(false);

  const styles: React.CSSProperties = useMemo(() => ({
    width: `${fontDisplay.width}px`,
    height: `${fontDisplay.height}px`,
    ...getStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [fontDisplay, id, masterConfig]);

  return (
    <div className="border border-red-500 overflow-hidden break-words" style={styles}>
      <div>
        {overwriteMaster ? fontDisplay.fontConfig.content : masterConfig.content}
      </div>
    </div>
  );
}