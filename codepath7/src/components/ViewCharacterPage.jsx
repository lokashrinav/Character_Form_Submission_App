const supabaseUrl = 'https://prkzshxzizchbwgspsrx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBya3pzaHh6aXpjaGJ3Z3Nwc3J4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODYzMTYyOCwiZXhwIjoyMDE0MjA3NjI4fQ.85m0CUSq56xFvXmBMtS3J3V9_spKaI15EvSFjJLYHSM';
const supabase = createClient(supabaseUrl, supabaseKey);
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CharacterInfoPage from './fun.jsx'

function ViewCharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [updatedCharacterData, setUpdatedCharacterData] = useState({
    eye_color: '',
    hair_color: '',
    height: '',
  });

  useEffect(() => {
    // Fetch data from the 'whatup' table
    async function fetchCharacters() {
      const { data, error } = await supabase.from('whatup').select('*');
      if (error) {
        console.error('Error fetching characters:', error);
      } else {
        setCharacters(data);
      }
    }

    fetchCharacters();
  }, []);

  // Function to delete a character by name
  async function deleteCharacter(characterName) {
    try {
      const { error } = await supabase.from('whatup').delete().eq('name', characterName);

      if (error) {
        console.error('Error deleting character:', error);
      } else {
        // Remove the deleted character from the state
        setCharacters((prevCharacters) =>
          prevCharacters.filter((character) => character.name !== characterName)
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Function to update a character
  async function updateCharacter(characterName) {
    try {
      const { data, error } = await supabase
        .from('whatup')
        .update(updatedCharacterData)
        .eq('name', characterName);

      if (error) {
        console.error('Error updating character:', error);
      } else {
        // Find the character in the state and update it with the new data
        setCharacters((prevCharacters) =>
          prevCharacters.map((character) => {
            if (character.name === characterName) {
              return { ...character, ...updatedCharacterData };
            }
            return character;
          })
        );
        // Clear the editing state
        setEditingCharacter(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>View Character Page</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.name}>
            {editingCharacter === character.name ? (
              // Render a dropdown menu to edit character data
              <CharacterEditDropdown
                character={character}
                updatedCharacterData={updatedCharacterData}
                setUpdatedCharacterData={setUpdatedCharacterData}
                updateCharacter={() => updateCharacter(character.name)}
              />
            ) : (
              // Render character details (name is not editable)
              <>
                <Link to={`/character/${character.name}` } >{character.name}'s Info</Link>
                - Eye Color: {character.eye_color}, Hair Color: {character.hair_color}, Height: {character.height}
                <button onClick={() => deleteCharacter(character.name)}>Delete</button>
                <button onClick={() => setEditingCharacter(character.name)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Routes>
  {characters.map((character) => (
    <Route
      path={`/character/${character.name}`} // Check if character.name is a valid URL path
      element={<CharacterInfoPage character={character} />}
      key={character.name}
    />
  ))}
</Routes>


    </div>
  );
}

function CharacterEditDropdown({ character, updatedCharacterData, setUpdatedCharacterData, updateCharacter }) {
  return (
    <div>
      {/* Name is displayed but not editable */}
      <p>Name: {character.name}</p>
      <select
        value={updatedCharacterData.eye_color}
        onChange={(e) => setUpdatedCharacterData({ ...updatedCharacterData, eye_color: e.target.value })}
      >
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="brown">Brown</option>
      </select>
      <select
        value={updatedCharacterData.hair_color}
        onChange={(e) => setUpdatedCharacterData({ ...updatedCharacterData, hair_color: e.target.value })}
      >
        <option value="blonde">Blonde</option>
        <option value="brunette">Brunette</option>
        <option value="black">Black</option>
      </select>
      <select
        value={updatedCharacterData.height}
        onChange={(e) => setUpdatedCharacterData({ ...updatedCharacterData, height: e.target.value })}
      >
        <option value="tall">Tall</option>
        <option value="short">Short</option>
        <option value="average">Average</option>
      </select>
      <button onClick={updateCharacter}>Update</button>
    </div>
  );
}

export default ViewCharacterPage;
