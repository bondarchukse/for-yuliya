import React from 'react';
import { Gender, getGender, getStatus, Profile, ProfileStatus } from './Profile';
import { useProfileFilter } from './useProfileFilter';

interface FilterPageProps {
  data: Array<Profile>;
}

export const FilterPage: React.FC<FilterPageProps> = ({ data }) => {

  const { filter, setGender, setSearch, setStatus, items, searchString } = useProfileFilter(data);

  return (
    <>
      {JSON.stringify(filter)}
      <section>
        <input value={searchString || ''} onChange={event => setSearch(event.target.value)} />
        <select value={String(filter.gender)} onChange={(event => setGender(event.target.value ? Number(event.target.value) : null))}>
          <option >All</option>
          <option value={Gender.Male}>{getGender(Gender.Male)}</option>
          <option value={Gender.Female}>{getGender(Gender.Female)}</option>
          <option value={Gender.Other}>{getGender(Gender.Other)}</option>
        </select>
        <select value={String(filter.status)} onChange={(event => setStatus(event.target.value ? Number(event.target.value) : null))}>
          <option >All</option>
          <option value={ProfileStatus.Submitted}>{getStatus(ProfileStatus.Submitted)}</option>
          <option value={ProfileStatus.NotStarted}>{getStatus(ProfileStatus.NotStarted)}</option>
          <option value={ProfileStatus.Declined}>{getStatus(ProfileStatus.Declined)}</option>
          <option value={ProfileStatus.Incomplete}>{getStatus(ProfileStatus.Incomplete)}</option>
          <option value={ProfileStatus.Approved}>{getStatus(ProfileStatus.Approved)}</option>
        </select>
      </section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job title</th>
            <th>Status</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, status, jobTitle, name, gender}) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{jobTitle}</td>
              <td>{getStatus(status)}</td>
              <td>{getGender(gender)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};
