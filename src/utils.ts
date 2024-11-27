import { FontConfig } from "./jotaiStore";

function* idGenerator() {
  let i = 0;
  while(true) {
    yield String(i);
    i++;
  }
}

const idGen = idGenerator();

export const getId = (): string => {
  const id = idGen.next().value;

  if (id) {
    return id;
  } else {
    throw new Error('Error during ID generation. Could not generate ID');
  }
}

export const getStyles = (config: FontConfig): React.CSSProperties => {
  const styles: React.CSSProperties = {
    fontFamily: config.fontFamily, 
    fontSize: `${config.fontSize}${config.fontSizeUnit}`,
    fontWeight: config.fontWeight,
    lineHeight: config.lineHeight,
    letterSpacing: `${config.letterSpacing}${config.letterSpacingUnit}`,
    fontStyle: config.italic ? 'italic' : 'normal',
    textDecoration: config.underline ? 'underline' : 'none',
  };

  if (config.fontColor != '') {
    styles.color = `#${config.fontColor}`
    
  }

  if (config.cardColor != '') {
    styles.backgroundColor = `#${config.cardColor}`
  }

  return styles;
};

export const getOverflowStyles = (config: FontConfig): React.CSSProperties => ({
  overflowX: config.overflowX ? 'auto' : 'hidden',
  overflowY: config.overflowY ? 'auto' : 'hidden',
});