
export enum ProfileStatus {
  NotStarted = 1,
  Incomplete = 2,
  Submitted = 3,
  Approved = 4,
  Declined = 5
}

export enum Gender {
  Male = 1,
  Female = 2,
  Other = 3,
}

export interface Profile {

  id: number;

  name: string;

  jobTitle: string;

  status: ProfileStatus;

  gender: Gender;

}


export const getStatus = (status: ProfileStatus): string | null => {
  switch (status) {
    case ProfileStatus.Approved:
      return 'Approved';
    case ProfileStatus.Incomplete:
      return 'Incomplete';
    case ProfileStatus.Declined:
      return 'Declined';
    case ProfileStatus.NotStarted:
      return 'Not Started';
    case ProfileStatus.Submitted:
      return 'Submitted';
    default:
      return null;
  }
};

export const getGender = (gender: Gender): string | null => {
  switch (gender) {
    case Gender.Female:
      return 'Female';
    case Gender.Male:
      return 'Male';
    case Gender.Other:
      return 'Other';
    default:
      return null;
  }
};
