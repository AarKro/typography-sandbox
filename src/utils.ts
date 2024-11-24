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