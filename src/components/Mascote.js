import React from 'react';
import { Image } from 'react-native';

const mascots = {
  principal: {
    source: require('../../assets/mascote-principal.png'),
    label: 'Mascote Octosaber',
  },
  nivel10: {
    source: require('../../assets/mascote-nivel-10.png'),
    label: 'Mascote Octosaber nível 10',
  },
  nivel20: {
    source: require('../../assets/mascote-nivel-20.png'),
    label: 'Mascote Octosaber nível 20',
  },
};

export default function Mascote({ variant = 'principal', size = 80, style }) {
  const mascot = mascots[variant] || mascots.principal;

  return (
    <Image
      source={mascot.source}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
      accessible
      accessibilityLabel={mascot.label}
    />
  );
}
