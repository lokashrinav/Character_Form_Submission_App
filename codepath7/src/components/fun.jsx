import React from 'react';

function CharacterInfoPage({ character }) {
  // Check if the character prop is defined
  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div>
      <h2>{character.name}'s Info</h2>
      <p>Eye Color: {character.eye_color}</p>
      <p>Hair Color: {character.hair_color}</p>
      <p>Height: {character.height}</p>
    </div>
  );
}

export default CharacterInfoPage;