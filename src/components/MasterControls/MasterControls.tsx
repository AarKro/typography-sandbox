import { useAtom } from "jotai";
import { FC, useState } from "react";
import { FontConfig, masterConfigAtom, upsertFontDisplayByIdAtom } from "../../jotaiStore";
import { getId } from "../../utils";

export const MasterControls: FC = () => {
  const [ , upsertFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);
  const [ masterConfig, setMasterConfig ] = useAtom(masterConfigAtom);
  const [ width, setWidth ] = useState<number>(0);
  const [ height, setHeight ] = useState<number>(0);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    
    upsertFontDisplayById([ getId(), {
      width,
      height,
      sizeUnit: 'px',
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
      <form onSubmit={handleSumbit}>
        <input type="number" value={width} onChange={(event) => setWidth(Number(event.target.value))}/>
        <input type="number" value={height} onChange={(event) => setHeight(Number(event.target.value))}/>
        <button type="submit">
          add
        </button>
      </form>

      <input type="text" value={masterConfig.content} onChange={(event) => handleMasterConfigUpdate(event, "content")}/>
      <input type="text" value={masterConfig.fontFamily} onChange={(event) => handleMasterConfigUpdate(event, "fontFamily")}/>
      <input type="number" value={masterConfig.fontWeight} onChange={(event) => handleMasterConfigUpdate(event, "fontWeight")}/>
      <input type="number" value={masterConfig.fontSize} onChange={(event) => handleMasterConfigUpdate(event, "fontSize")}/>
      <input type="text" value={masterConfig.fontSizeUnit} onChange={(event) => handleMasterConfigUpdate(event, "fontSizeUnit")}/>
    </div>
  );
}