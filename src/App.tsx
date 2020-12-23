import React from 'react';
import './App.css';
import { Gender, Profile, ProfileStatus } from './FilterPage/Profile';
import { FilterPage } from './FilterPage/FilterPage';

const data: Array<Profile> = [
  {
  id: 1,
  gender: Gender.Female,
  name: 'Lucya',
  jobTitle: 'Doyarka',
  status: ProfileStatus.Approved
  },
  {
    id: 2,
    gender: Gender.Male,
    name: 'Bruc Вылез',
    jobTitle: 'Крепкий Орешек',
    status: ProfileStatus.Incomplete
  }
];

function App() {
  return (
    <div className="App">
      <FilterPage data={data} />
    </div>
  );
}

export default App;
