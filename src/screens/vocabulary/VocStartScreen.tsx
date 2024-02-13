import { useState } from 'react';

import { ContainerWithInsets, HeroWithChat, Toggle } from '@/ui/core';

export const VocStartScreen = () => {
  const [on, setOn] = useState(false);

  return (
    <ContainerWithInsets>
      <HeroWithChat tx="onboard.lang" chatPosition="top" />

      <Toggle
        labelTx="common.logOut"
        labelPosition="right"
        labelStyle={{ paddingLeft: 10 }}
        variant="checkbox"
        value={on}
        onPress={() => setOn(o => !o)}
      />
      <Toggle variant="radio" value={on} onPress={() => setOn(o => !o)} />
      <Toggle variant="switch" value={on} onPress={() => setOn(o => !o)} />
    </ContainerWithInsets>
  );
};
