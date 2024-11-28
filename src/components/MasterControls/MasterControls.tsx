import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { Button, Card, Divider, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import { customLinkTagsAtom, isDarkModeAtom, masterConfigAtom, upsertFontDisplayByIdAtom } from "../../jotaiStore";
import { FontControls } from "../FontControls/FontControls";
import { getId } from "../../utils";
import LightModeIcon from "../../assets/light_mode.svg";
import DarkModeIcon from "../../assets/dark_mode.svg";
import SettingsIcon from "../../assets/settings.svg";
import "./MasterConrols.css";

export const MasterControls: FC = () => {
  const [ , upsertFontDisplayById ] = useAtom(upsertFontDisplayByIdAtom);
  const [ masterConfig, setMasterConfig ] = useAtom(masterConfigAtom);
  const [ isDarkMode, setIsDarkMode ] = useAtom(isDarkModeAtom);
  const [ customLinkTags, setCustomLinkTags ] = useAtom(customLinkTagsAtom); 
  const [ width, setWidth ] = useState<string>('');
  const [ height, setHeight ] = useState<string>('');

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      body.className = body.className.replace(isDarkMode ? 'light' : 'dark', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    
    upsertFontDisplayById([ getId(), {
      width,
      height,
      defaultOverwrite: false,
      fontConfig: masterConfig
    }]);
  }

  return (
    <Card className="p-1">
      <div className="flex flex-row">
        <form onSubmit={handleSumbit} className="flex flex-col flex-wrap items-center">
          <Input required type="number" className="w-52 m-1" label="Width" placeholder="screen width in px" onChange={(event) => setWidth(event.target.value)}/>
          <Input required type="number" className="w-52 m-1" label="Height" placeholder="screen height in px" onChange={(event) => setHeight(event.target.value)}/>
          <Button color="primary" type="submit" className="w-52 m-1">
            Add
          </Button>
        </form>
        <Divider orientation="vertical" className="h-auto m-3"/>
        <FontControls config={masterConfig} setConfig={setMasterConfig}/>
        <Divider orientation="vertical" className="h-auto m-3"/>
        <div className="flex flex-col flex-wrap">
          <Button className="m-1" isIconOnly color="default" variant={isDarkMode ? 'ghost' : 'solid'} onClick={() => setIsDarkMode(!isDarkMode)}>
            { isDarkMode ? <DarkModeIcon/> : <LightModeIcon/> }
          </Button>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button className="m-1" isIconOnly color="default" variant="ghost">
                <SettingsIcon/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <h2>Custom Google Font Link Tags</h2>
              <Textarea
                placeholder="paste embed code from google fonts here"
                classNames={{
                  base: "w-fit m-1 overflow-auto",
                  input: "resize whitespace-nowrap"
                }}
                value={customLinkTags}
                onChange={(event) => setCustomLinkTags(event.target.value)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}