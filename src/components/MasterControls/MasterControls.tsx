import { useAtom } from "jotai";
import { FC, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FontConfig, masterConfigAtom, upsertFontDisplayByIdAtom } from "../../jotaiStore";
import { getId } from "../../utils";

const inputStyles = "w-52 m-1";

export const MasterControls: FC = () => {
  const [ , upsertFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);
  const [ masterConfig, setMasterConfig ] = useAtom(masterConfigAtom);
  const [ width, setWidth ] = useState<string>('');
  const [ height, setHeight ] = useState<string>('');

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    
    upsertFontDisplayById([ getId(), {
      width,
      height,
      fontConfig: masterConfig
    }]);
  }

  const handleMasterConfigUpdate = (event: React.ChangeEvent<HTMLInputElement>, styleName: keyof FontConfig) => {
    const newConfig: FontConfig = {
      ...masterConfig,
      [styleName]: event.target.value,
    }

    setMasterConfig(newConfig);
  };

  return (
    <div>
      <form onSubmit={handleSumbit} className="flex flex-row flex-wrap items-center">
        <Input type="number" className={inputStyles} label="Width" placeholder="screen width in px" onChange={(event) => setWidth(event.target.value)}/>
        <Input type="number" className={inputStyles} label="Height" placeholder="screen height in px" onChange={(event) => setHeight(event.target.value)}/>
        <Button color="primary" type="submit">
          Button
        </Button>
      </form>
      <div className="flex flex-row flex-wrap items-center">
        <Input type="text" value={masterConfig.content} className={inputStyles} label="Content" placeholder="text which will be displayed" onChange={(event) => handleMasterConfigUpdate(event, "content")}/>
        <Input type="text" value={masterConfig.fontFamily} className={inputStyles} label="Font Family" placeholder="font from Google Fonts" onChange={(event) => handleMasterConfigUpdate(event, "fontFamily")}/>
        <Input type="number" value={masterConfig.fontWeight} className={inputStyles} label="Font Weight" placeholder="" onChange={(event) => handleMasterConfigUpdate(event, "fontWeight")}/>
        <Input type="number" value={masterConfig.fontSize} className={inputStyles} label="Font Size" placeholder="" onChange={(event) => handleMasterConfigUpdate(event, "fontSize")}/>
        <Input type="text" value={masterConfig.fontSizeUnit} className={inputStyles} label="Font Size Unit" placeholder="" onChange={(event) => handleMasterConfigUpdate(event, "fontSizeUnit")}/>
        <Input type="number" value={masterConfig.lineHeight} className={inputStyles} label="Line Height" placeholder="" onChange={(event) => handleMasterConfigUpdate(event, "lineHeight")}/>
        <Input type="number" value={masterConfig.letterSpacing} className={inputStyles} label="Letter Spacing" placeholder="" onChange={(event) => handleMasterConfigUpdate(event, "letterSpacing")}/>
        <Input type="text" value={masterConfig.letterSpacingUnit} className={inputStyles} label="Letter Spacing Unit" placeholder="" onChange={(event) => handleMasterConfigUpdate(event, "letterSpacingUnit")}/>
      </div>
    </div>
  );
}