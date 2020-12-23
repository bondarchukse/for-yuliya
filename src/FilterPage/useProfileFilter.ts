import { useEffect, useReducer, useRef } from 'react';
import { Gender, Profile, ProfileStatus } from './Profile';

interface ProfileFilter {
  status: ProfileStatus | null;
  gender: Gender | null;
  searchText: string | null;
}

interface ProfileFilterData {
  setStatus: (status: ProfileStatus | null) => void;
  setGender: (gender: Gender | null) => void;
  setSearch: (text: string | null) => void;
  resetFilter: (options: Partial<ProfileFilter>) => void;
  items: Array<Profile>;
  filter: ProfileFilter;
  searchString: string | null;
}

const defaultFilter: ProfileFilter = {
  status: null,
  gender: null,
  searchText: ''
};

interface ReducerState {
  filter: ProfileFilter;
  items: Array<Profile>;
  filteredItems: Array<Profile>;
  searchText: string | null;
}

interface Action<TPayload = void> {
  type: string;
  payload: TPayload;
}

const createProfileFilterFn = ({ status, searchText, gender}: ProfileFilter) => (profile: Profile) => {
  let active = true;
  if (status) {
    active = status === profile.status;
  }

  if (gender) {
    active = gender === profile.gender;
  }

  if (searchText) {
    active = profile.name.toLowerCase().includes(searchText.toLowerCase()) || profile.jobTitle.toLowerCase().includes(searchText.toLowerCase());
  }

  return active;
};


const getFilteredItems = (items: Array<Profile>, filter: ProfileFilter): Array<Profile> => {
  const filterPredicate = createProfileFilterFn(filter);
  return items.filter(filterPredicate);
};

function reducer(state: ReducerState, action: Action<any>) {
  switch (action.type) {
    case 'filter':
      return {
        ...state,
        filter: action.payload,
        filteredItems: getFilteredItems(state.items, action.payload)
      };
    case 'items':
      return {
        ...state,
        items: action.payload,
        filteredItems: getFilteredItems(action.payload, state.filter)
      };
    case 'search':
      return {
        ...state,
        searchText: action.payload
      };
    default:
      return state;
  }
}

const createFilterAction = (payload: ProfileFilter): Action<ProfileFilter> => ({ type: 'filter', payload });
const createItemsAction = (payload: Array<Profile>): Action<Array<Profile>> => ({ type: 'items', payload });
const createSearchAction = (payload: string | null): Action<string | null> => ({ type: 'search', payload });

export function useProfileFilter(items: Array<Profile>, options: Partial<ProfileFilter> = {}): ProfileFilterData {
  const filter = {
    ...defaultFilter,
    ...options,
  };
  const [state, dispatch] = useReducer(reducer, { filter, items, filteredItems: [], searchText: filter.searchText });
  const timer = useRef<null | ReturnType<typeof setTimeout>>();

  const setStatus = (status: ProfileStatus | null) => {
    dispatch(createFilterAction({ ...state.filter, status }));
  };

  const setGender = (gender: Gender | null) => {
    dispatch(createFilterAction({ ...state.filter, gender }));
  };

  const setSearch = (searchText: string | null) => {
    dispatch(createSearchAction(searchText));

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      timer.current = null;
      dispatch(createFilterAction({ ...state.filter, searchText }));
    }, 250);
  };

  const resetFilter = (options: Partial<ProfileFilter> = {}) => {
    dispatch(createFilterAction({ ...defaultFilter, ...options }));
  };

  useEffect(() => {
    dispatch(createItemsAction(items));
  }, [items]);

  return {
    setStatus,
    setGender,
    setSearch,
    resetFilter,
    items: state.filteredItems,
    filter: state.filter,
    searchString: state.searchText,
  }
}
