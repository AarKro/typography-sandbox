import { FC, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Badge, Card, CardBody, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { FontControls } from "../FontControls/FontControls";
import { FontConfig, masterConfigAtom, upsertFontDisplayByIdAtom, useFontDisplayById,  } from "../../jotaiStore";
import { getOverflowStyles, getStyles } from "../../utils";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const fontDisplay = useFontDisplayById(id);
  const [ , upsertFontDisplayById] = useAtom(upsertFontDisplayByIdAtom);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ overwriteMaster, setOverwriteMaster ] = useState<boolean>(false);

  const setFontDisplay = (config: FontConfig) => {
    upsertFontDisplayById([id, {
      ...fontDisplay,
      fontConfig: config
    }]);

    setOverwriteMaster(true);
  }

  const styles: React.CSSProperties = useMemo(() => ({
    width: `${fontDisplay.width}px`,
    height: `${fontDisplay.height}px`,
    ...getStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [fontDisplay.fontConfig, fontDisplay.height, fontDisplay.width, masterConfig, overwriteMaster]);
  
  const overflowStyles: React.CSSProperties = useMemo(() => ({
    ...getOverflowStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [overwriteMaster, masterConfig, fontDisplay.fontConfig]);

  return (
    <Popover placement="top">
      <Badge content="" isInvisible={!overwriteMaster} color="primary">
        <PopoverTrigger>
          <Card className="m-2 cursor-pointer whitespace-pre-line" style={styles}>
            <CardBody style={overflowStyles}>
              {overwriteMaster ? fontDisplay.fontConfig.content : masterConfig.content}
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Badge>
      <PopoverContent>
        <FontControls config={fontDisplay.fontConfig} setConfig={setFontDisplay}/>
      </PopoverContent>
    </Popover>
  );
}