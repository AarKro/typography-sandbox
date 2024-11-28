import { useAtom } from "jotai";
import { FC, useMemo } from "react";
import { Helmet } from "react-helmet";
import { customLinkTagsAtom, fontDisplaysAtom, masterConfigAtom } from "../../jotaiStore";

export const FontHandler: FC = () => {
  const [ fontDisplays ] = useAtom(fontDisplaysAtom);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ customLinkTags ] = useAtom(customLinkTagsAtom);

  const customLinkTagsToRender = useMemo(() => (
    customLinkTags
      .split('"')
      .filter((part) => part.startsWith("https://fonts.googleapis.com/"))
      .map((part, i) => <link key={i} rel="stylesheet" href={part}/>)
  ), [customLinkTags]);

  return (
    <Helmet>
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${masterConfig.fontFamily}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900`}/>
      {Object.entries(fontDisplays).map(([id, config]) => (
        <link key={id} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${config.fontConfig.fontFamily}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900`}/>
      ))}
      {customLinkTagsToRender}
    </Helmet>
  );
};

<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Parkinsans:wght@300..800&family=Phetsarath:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
