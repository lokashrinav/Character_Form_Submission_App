import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prkzshxzizchbwgspsrx.supabase.co';
const supabaseKey = 'API_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

function AddCharacterPage() {
  // State variables to hold the selected values
  const [name, setName] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [height, setHeight] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to Supabase
    const data = {
      name, // Add the name field
      eye_color: eyeColor,
      hair_color: hairColor,
      height: height,
    };

    try {
      // Send the data to your Supabase table (replace 'idk' with your actual table name)
      const { data: newCharacter, error } = await supabase
        .from('whatup')
        .insert([data])
        .single(); // Use .single() to get the inserted row

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Character Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
  <label htmlFor="eyeColor">Select Eye Color:</label>
  <select
    id="eyeColor"
    value={eyeColor}
    onChange={(e) => setEyeColor(e.target.value)}
  >
    <option value="">Select an eye color</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="brown">Brown</option>
    {/* Add more options as needed */}
  </select>
</div>
    <div>
    <label htmlFor="hairColor">Select Hair Color:</label>
    <select
        id="hairColor"
        value={hairColor}
        onChange={(e) => setHairColor(e.target.value)}
    >
        <option value="">Select a hair color</option>
        <option value="blonde">Blonde</option>
        <option value="brunette">Brunette</option>
        <option value="black">Black</option>
        {/* Add more options as needed */}
    </select>
    </div>
    <div>
    <label htmlFor="height">Select Height:</label>
    <select
        id="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
    >
        <option value="">Select a height</option>
        <option value="tall">Tall</option>
        <option value="short">Short</option>
        <option value="average">Average</option>
        {/* Add more options as needed */}
    </select>
    </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCharacterPage;
