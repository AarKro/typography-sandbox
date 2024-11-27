import { FC, useCallback, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Badge, Button, Card, CardBody, Divider, Popover, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";
import { FontControls } from "../FontControls/FontControls";
import { deleteFontDisplayByIdAtom, FontConfig, masterConfigAtom, upsertFontDisplayByIdAtom, useFontDisplayById,  } from "../../jotaiStore";
import { getId, getOverflowStyles, getStyles } from "../../utils";
import SyncIcon from '../../assets/sync.svg';
import DesyncIcon from '../../assets/desync.svg';
import DeleteIcon from '../../assets/delete.svg';
import CopyIcon from '../../assets/copy.svg';

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const fontDisplay = useFontDisplayById(id);
  const [ , upsertFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);
  const [ , deleteFontDisplayById ] = useAtom(deleteFontDisplayByIdAtom);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ overwriteMaster, setOverwriteMaster ] = useState<boolean>(fontDisplay.defaultOverwrite);

  const styles: React.CSSProperties = useMemo(() => ({
    width: `${fontDisplay.width}px`,
    height: `${fontDisplay.height}px`,
    ...getStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [fontDisplay.fontConfig, fontDisplay.height, fontDisplay.width, masterConfig, overwriteMaster]);
  
  const overflowStyles: React.CSSProperties = useMemo(() => ({
    ...getOverflowStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [overwriteMaster, masterConfig, fontDisplay.fontConfig]);

  const setFontDisplay = useCallback((config: FontConfig) => {
    upsertFontDisplayById([id, {
      ...fontDisplay,
      fontConfig: config
    }]);

    setOverwriteMaster(true);
  }, [fontDisplay, id, upsertFontDisplayById]);

  const createCopy = useCallback(() => {
    upsertFontDisplayById([getId(), {...fontDisplay, defaultOverwrite: overwriteMaster}]);
  }, [fontDisplay, overwriteMaster, upsertFontDisplayById]);

  const deleteDisplay = useCallback(() => {
    deleteFontDisplayById(id);
  }, [deleteFontDisplayById, id]);

  return (
    <Popover placement="bottom">
      <Badge content="" isInvisible={!overwriteMaster} color="primary">
        <PopoverTrigger>
          <Card className="mt-2 mr-2 cursor-pointer whitespace-pre-line" style={styles}>
            <CardBody style={overflowStyles}>
              {overwriteMaster ? fontDisplay.fontConfig.content : masterConfig.content}
            </CardBody>
          </Card>
        </PopoverTrigger>
      </Badge>
      <PopoverContent>
        <div className="flex flex-row">
          <div className="flex flex-col self-center">
            <Tooltip showArrow content={ overwriteMaster ? "Sync With Master" : "Desync from Master"} placement="left" offset={15}>
              <Button isIconOnly className="m-1" color="default" variant={ overwriteMaster ? "ghost" : "solid" } onClick={() => setOverwriteMaster(!overwriteMaster)}>
              { overwriteMaster ? <DesyncIcon/> : <SyncIcon/> }
              </Button>
            </Tooltip>  
            <Tooltip showArrow content="Copy" placement="left" offset={15}>
              <Button isIconOnly className="m-1" color="default" variant="ghost" onClick={createCopy} title="copy">
                <CopyIcon/>
              </Button>
            </Tooltip>
            <Tooltip showArrow content="Delete" placement="left" offset={15}>
              <Button isIconOnly className="m-1" color="default" variant="ghost" onClick={deleteDisplay}>
                <DeleteIcon/>
              </Button>
            </Tooltip>
          </div>
          <Divider orientation="vertical" className="h-auto m-3"/>
          <FontControls config={fontDisplay.fontConfig} setConfig={setFontDisplay}/>
        </div>
      </PopoverContent>
    </Popover>
  );
}