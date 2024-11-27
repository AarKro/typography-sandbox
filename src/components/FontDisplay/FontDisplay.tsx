import { FC, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Card, CardBody } from "@nextui-org/react";
import { masterConfigAtom, useFontDisplayById,  } from "../../jotaiStore";
import { getOverflowStyles, getStyles } from "../../utils";

interface Props {
  id: string;
}

export const FontDisplay: FC<Props> = ({ id }) => {
  const fontDisplay = useFontDisplayById(id);
  const [ masterConfig ] = useAtom(masterConfigAtom);
  const [ overwriteMaster ] = useState<boolean>(false);

  const styles: React.CSSProperties = useMemo(() => ({
    width: `${fontDisplay.width}px`,
    height: `${fontDisplay.height}px`,
    ...getStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [fontDisplay.fontConfig, fontDisplay.height, fontDisplay.width, masterConfig, overwriteMaster]);
  
  const overflowStyles: React.CSSProperties = useMemo(() => ({
    ...getOverflowStyles(overwriteMaster ? fontDisplay.fontConfig : masterConfig)
  }), [overwriteMaster, masterConfig, fontDisplay.fontConfig]);

  return (
    <Card className="m-2 whitespace-pre-line" style={styles}>
      <CardBody style={overflowStyles}>
        {overwriteMaster ? fontDisplay.fontConfig.content : masterConfig.content}
      </CardBody>
    </Card>
  );
}