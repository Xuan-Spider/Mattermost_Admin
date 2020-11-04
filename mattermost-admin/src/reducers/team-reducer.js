import * as Types from "../constants/action-type";


const initialState = {
  teams: [],
  total_count: 0
};
var findIndex = (teams, id) => {
  let result = -1;
if(teams && teams.length > 0) {
  teams.forEach((team, index) => {
    if (team.id === id) {
      result = index;
    }
  });
}
  
  return result;
};

export function teamReducer(state = initialState, action) {
  let index = -1;
  let {id, selectedTeam} = action;
  switch (action.type) {
    case Types.GET_TEAM:
      state = action.teams;
      return state;
    case Types.ADD_TEAM:
      state.teams.unshift(action.newTeam);
      state.total_count ++;
      return state;
    case Types.UPDATE_TEAM:
      index = findIndex(state.teams, selectedTeam.id);
      state.teams[index] = selectedTeam;
      return state;
    case Types.DELETE_TEAM:
      index = findIndex(state.teams, id);
      state.teams.splice(index, 1);
      return state;
    default:
      return state;
  }
}

export function editReducer(state = {}, action) {
  switch (action.type) {
    case Types.GET_TEAM_BY_ID:
      return action.selectedTeam;
    default:
      return null;
  }
}
