import { useAtom } from "jotai";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { fontDisplaysAtom, masterConfigAtom } from "../../jotaiStore";

export const FontHandler: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);
  const [ masterConfig ] = useAtom(masterConfigAtom);

  return (
    <Helmet>
      <link rel="stylesheet" href={`http://fonts.googleapis.com/css?family=${masterConfig.fontFamily}`}/>
      {Object.entries(fontDisplays).map(([id, config]) => (
        <link key={id} rel="stylesheet" href={`http://fonts.googleapis.com/css?family=${config.fontConfig.fontFamily}`}/>
      ))}
    </Helmet>
  );
};