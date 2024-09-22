import { useState } from 'react'
import apiClient from '../services/apiClient.js';

function CreateGoal() {
    const [goalFormData, setGoalFormData] = useState({
        type: '',
        targetValue: 0
      });

    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setGoalFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior (e.g. page reload)
      try {
        console.log(goalFormData)
        // Sends a POST request to the backend with the form data
        await apiClient.post('/create-goal', goalFormData);
      } catch (error) {
        console.error('Error creating goal:', error);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
    
      <label>Goal Type:</label>
      <select
        name="type"
        value={goalFormData.type}
        onChange={handleChange} 
        required
      >
        <option value="" disabled>Select a goal type</option>
        <option value="sleep">Sleep (Hours)</option>
        <option value="weight">Weight (lbs)</option>
        <option value="steps">Steps (Step Count)</option>
        <option value="water">Water Intake (Glasses)</option>
        <option value="exercise">Exercise (Minutes)</option>
      </select>
      
      <label>Target Value:</label>
      <input
        type="number"
        name="targetValue"
        value={goalFormData.targetValue}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  )

}
export default CreateGoal