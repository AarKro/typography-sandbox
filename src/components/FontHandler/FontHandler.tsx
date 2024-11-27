import { useAtom } from "jotai";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { fontDisplaysAtom, masterConfigAtom } from "../../jotaiStore";

export const FontHandler: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);
  const [ masterConfig ] = useAtom(masterConfigAtom);

  return (
    <Helmet>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${masterConfig.fontFamily}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900`}/>
      {Object.entries(fontDisplays).map(([id, config]) => (
        <link key={id} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${config.fontConfig.fontFamily}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900`}/>
      ))}
    </Helmet>
  );
};