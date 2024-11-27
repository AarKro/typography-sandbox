import { FC } from "react";
import { Textarea, Divider, Select, SelectItem, Button, Input } from "@nextui-org/react";
import { FontConfig } from "../../jotaiStore";
import ItalicIcon from "../../assets/italic.svg";
import UnderlineIcon from "../../assets/underline.svg";

type Props = {
  config: FontConfig,
  setConfig: (config: FontConfig) => void,
}

const fontSizeUnits = [
  { key: "px", label: "px" },
  { key: "pt", label: "pt" },
  { key: "cm", label: "cm" },
  { key: "mm", label: "mm" },
  { key: "em", label: "em" },
  { key: "ex", label: "ex" },
  { key: "lh", label: "lh" },
];

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
];

export const FontControls: FC<Props> = ({ config, setConfig }) => {

  const handleConfigUpdate = (value: string | boolean, styleName: keyof FontConfig) => {
    const newConfig: FontConfig = {
      ...config,
      [styleName]: value,
    }

    setConfig(newConfig);
  };

  return (
    <>
      <div className="flex flex-row">
        <Textarea
          label="Content" 
          placeholder="text which will be displayed"
          classNames={{
            base: "w-52 m-1",
          }}
          minRows={6}
          value={config.content}
          onChange={(event) => handleConfigUpdate(event.target.value, "content")}
        />
      </div>
      <Divider orientation="vertical" className="h-auto m-3"/>
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-row items-center flex-wrap">
          <Input type="text" value={config.fontFamily} className="w-52 m-1" label="Font Family" placeholder="font from Google Fonts" onChange={(event) => handleConfigUpdate(event.target.value, "fontFamily")}/>
          <Select
            items={fontWeightValues}
            label="Font Weight"
            className="w-36 m-1"
            selectedKeys={[config.fontWeight]}
            onChange={(event) => handleConfigUpdate(event.target.value, "fontWeight")}
            >
            {(weight) => <SelectItem key={weight.key}>{weight.label}</SelectItem>}
          </Select>
          <Button className="m-1" isIconOnly color="default" variant={config.italic ? 'solid' : 'ghost'} onClick={() => handleConfigUpdate(!config.italic, "italic")}>
            <ItalicIcon />
          </Button>
          <Button className="m-1" isIconOnly color="default" variant={config.underline ? 'solid' : 'ghost'} onClick={() => handleConfigUpdate(!config.underline, "underline")}>
            <UnderlineIcon />
          </Button>
        </div>
        <div className="flex flex-row items-center flex-wrap">
          <div className="flex flex-row">
            <Input type="number" value={config.fontSize} className="w-20 m-1 mr-0 input-rounded-r-none" label="Font Size" onChange={(event) => handleConfigUpdate(event.target.value, "fontSize")}/>
            <Select
              items={fontSizeUnits}
              label="Unit"
              className="w-20 m-1 ml-0 select-rounded-l-none"
              selectedKeys={[config.fontSizeUnit]}
              onChange={(event) => handleConfigUpdate(event.target.value, "fontSizeUnit")}
              >
              {(unit) => <SelectItem key={unit.key}>{unit.label}</SelectItem>}
            </Select>
          </div>
          <Input type="number" value={config.lineHeight} step="0.1" className="w-24 m-1" label="Line Height" onChange={(event) => handleConfigUpdate(event.target.value, "lineHeight")}/>
          <div className="flex flex-row">
            <Input type="number" value={config.letterSpacing} className="m-1 mr-0 w-32 input-rounded-r-none" label="Letter Spacing" onChange={(event) => handleConfigUpdate(event.target.value, "letterSpacing")}/>
            <Select
              items={fontSizeUnits}
              label="Unit"
              className="w-20 m-1 ml-0 select-rounded-l-none"
              selectedKeys={[config.letterSpacingUnit]}
              onChange={(event) => handleConfigUpdate(event.target.value, "letterSpacingUnit")}
              >
              {(unit) => <SelectItem key={unit.key}>{unit.label}</SelectItem>}
            </Select>
          </div>
        </div>
      </div>
      <Divider orientation="vertical" className="h-auto m-3"/>
      <div className="flex flex-col flex-wrap">
        <Input 
          type="text" 
          value={config.fontColor} 
          className="w-24 m-1" 
          label="Font Color" 
          placeholder="FFFFFF"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">#</span>
            </div>
          } 
          onChange={(event) => handleConfigUpdate(event.target.value, "fontColor")}
        />
        <Input 
          type="text" 
          value={config.cardColor} 
          className="w-24 m-1" 
          label="Card Color"
          placeholder="000000"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">#</span>
            </div>
          } 
          onChange={(event) => handleConfigUpdate(event.target.value, "cardColor")}
        />
        {/* 
        <div className="flex flex-col m-1">
          <Switch size="sm" defaultSelected={config.overflowX} onChange={(event) => handleConfigUpdate(event.target.checked, "overflowX")}>
            Overflow X
          </Switch>
          <Switch size="sm" defaultSelected={config.overflowY} className="mt-2" onChange={(event) => handleConfigUpdate(event.target.checked, "overflowY")}>
            Overflow Y
          </Switch>
        </div>
        */}
      </div>
    </>
  );
}