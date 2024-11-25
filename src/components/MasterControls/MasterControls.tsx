import { useAtom } from "jotai";
import { FC, useState } from "react";
import { Button, Divider, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import { FontConfig, masterConfigAtom, upsertFontDisplayByIdAtom } from "../../jotaiStore";
import { getId } from "../../utils";
import "./MasterConrols.css";

const fontSizeUnits = [
  { key: "px", label: "px" },
  { key: "pt", label: "pt" },
  { key: "cm", label: "cm" },
  { key: "mm", label: "mm" },
  { key: "em", label: "em" },
  { key: "ex", label: "ex" },
  { key: "lh", label: "lh" },
]

const fontWeightValues = [
  { key: "100", label: "100" },
  { key: "200", label: "200" },
  { key: "300", label: "300" },
  { key: "400", label: "400 (normal)" },
  { key: "500", label: "500" },
  { key: "600", label: "600" },
  { key: "700", label: "700 (bold)" },
  { key: "800", label: "800" },
  { key: "900", label: "900" },
]

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

  const handleMasterConfigUpdate = (value: string | boolean, styleName: keyof FontConfig) => {
    const newConfig: FontConfig = {
      ...masterConfig,
      [styleName]: value,
    }

    setMasterConfig(newConfig);
  };

  return (
    <div className="flex flex-row">
      <form onSubmit={handleSumbit} className="flex flex-col flex-wrap items-center">
        <Input type="number" className="w-52 m-1" label="Width" placeholder="screen width in px" onChange={(event) => setWidth(event.target.value)}/>
        <Input type="number" className="w-52 m-1" label="Height" placeholder="screen height in px" onChange={(event) => setHeight(event.target.value)}/>
        <Button color="primary" type="submit" className="w-52 m-1">
          Add
        </Button>
      </form>
      <Divider orientation="vertical" className="h-auto m-3"/>
      <div className="flex flex-row flex-wrap">
        <Input type="text" value={masterConfig.content} className="w-52 m-1" label="Content" placeholder="text which will be displayed" onChange={(event) => handleMasterConfigUpdate(event.target.value, "content")}/>
        <Input type="text" value={masterConfig.fontFamily} className="w-52 m-1" label="Font Family" placeholder="font from Google Fonts" onChange={(event) => handleMasterConfigUpdate(event.target.value, "fontFamily")}/>
        <Select
          items={fontWeightValues}
          label="Font Weight"
          className="w-36 m-1"
          selectedKeys={[masterConfig.fontWeight]}
          onChange={(event) => handleMasterConfigUpdate(event.target.value, "fontWeight")}
        >
          {(weight) => <SelectItem key={weight.key}>{weight.label}</SelectItem>}
        </Select>
        <Input type="number" value={masterConfig.fontSize} className="w-20 m-1 mr-0 input-rounded-r-none" label="Font Size" placeholder="" onChange={(event) => handleMasterConfigUpdate(event.target.value, "fontSize")}/>
        <Select
          items={fontSizeUnits}
          label="Unit"
          className="w-20 m-1 ml-0 select-rounded-l-none"
          selectedKeys={[masterConfig.fontSizeUnit]}
          onChange={(event) => handleMasterConfigUpdate(event.target.value, "fontSizeUnit")}
        >
          {(unit) => <SelectItem key={unit.key}>{unit.label}</SelectItem>}
        </Select>
        <Input type="number" value={masterConfig.lineHeight} step="0.1" className="w-24 m-1" label="Line Height" placeholder="" onChange={(event) => handleMasterConfigUpdate(event.target.value, "lineHeight")}/>
        <Input type="number" value={masterConfig.letterSpacing} className="m-1 mr-0 w-32 input-rounded-r-none" label="Letter Spacing" placeholder="" onChange={(event) => handleMasterConfigUpdate(event.target.value, "letterSpacing")}/>
        <Select
          items={fontSizeUnits}
          label="Unit"
          className="w-20 m-1 ml-0 select-rounded-l-none"
          selectedKeys={[masterConfig.letterSpacingUnit]}
          onChange={(event) => handleMasterConfigUpdate(event.target.value, "letterSpacingUnit")}
        >
          {(unit) => <SelectItem key={unit.key}>{unit.label}</SelectItem>}
        </Select>
        <div className="flex flex-col m-1">
          <Switch size="sm" defaultSelected={masterConfig.overflowX} onChange={(event) => handleMasterConfigUpdate(event.target.checked, "overflowX")}>
            Overflow X
          </Switch>
          <Switch size="sm" defaultSelected={masterConfig.overflowY} className="mt-2" onChange={(event) => handleMasterConfigUpdate(event.target.checked, "overflowY")}>
            Overflow Y
          </Switch>
        </div>
      </div>
    </div>
  );
}