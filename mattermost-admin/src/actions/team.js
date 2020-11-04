import * as Types from "../constants/action-type";
import callApi from "../ultils/apiCaller";
import ToastServive from "react-material-toast";
const toast = ToastServive.new({
  place: "topRight",
  duration: 1,
  maxCount: 8,
});

// Lấy teams
export const actGetTeamsRequest = (filter) => {
  // if (filter.filterType === "Me") {
    return (dispatch) => {
      return callApi(
        `api/v4/users/me/teams?page=${filter.page}&per_page=${filter.per_page}&include_total_count=${filter.include_total_count}`,
        "GET",
        null,
        true
      )
        .then((res) => {
          if (res && res.data) {
            let _index = 0;
            if (filter.page !== 0) {
              _index = filter.page  * filter.per_page;
            }
            const tmpTeams = res.data.filter(
              (item, index) => {
                return index >= _index && index <= (filter.page + 1)* filter.per_page -1
              }
            );
            const result = {
              teams: tmpTeams,
              total_count: res.data.length,
            };
            dispatch(actGetTeams(result));
          } else {
            toast.error("Có lỗi xảy ra, vui lòng liên hệt UET!");
          }
        })
        .catch((err) => toast.error("Có lỗi xảy ra, vui lòng liên hệt UET!"));
    };
  // } 
  
  // else {
  //   return (dispatch) => {
  //     return callApi(
  //       `api/v4/teams?page=${filter.page}&per_page=${filter.per_page}&include_total_count=${filter.include_total_count}`,
  //       "GET",
  //       null,
  //       true
  //     )
  //       .then((res) => {
  //         if (res && res.data) {
  //           //  res.data.teams = res.data.teams.filter((item) => item.delete_at === 0);
  //           dispatch(actGetTeams(res.data));
  //         } else {
  //           toast.error("Có lỗi xảy ra, vui lòng liên hệt UET!");
  //         }
  //       })
  //       .catch((err) => toast.error("Có lỗi xảy ra, vui lòng liên hệt UET!"));
  //   };
  // }
};


// action lấy team 
export const actGetTeams = (teams) => {
  return {
    type: Types.GET_TEAM,
    teams,
  };
};

// Thêm teams
export const actAddTeamRequest = (newTeam) => {
  return (dispatch) => {
    return callApi("api/v4/teams", "POST", newTeam, true).then((res) => {
      if (res && res.data) {
        dispatch(actAddTeam(res.data));
      }
    });
  };
};

export const actAddTeam = (newTeam) => {
  toast.success("Thêm thành công");
  return {
    type: Types.ADD_TEAM,
    newTeam,
    isSucess: true,
  };
};

// Update team
export const actUpdateTeamRequest = (selectedTeam) => {
  return (dispatch) => {
    return callApi(
      `api/v4/teams/${selectedTeam.id}`,
      "PUT",
      selectedTeam,
      true
    ).then((res) => {
      if (res && res.data) {
        dispatch(actUpdateTeam(res.data));
      }
    });
  };
};

export const actUpdateTeam = (selectedTeam) => {
  toast.success("Sửa thành công");
  return {
    type: Types.UPDATE_TEAM,
    selectedTeam,
  };
};

// Lấy team theo id
export const actGetTeamById = (selectedTeam) => {
  return {
    type: Types.GET_TEAM_BY_ID,
    selectedTeam,
  };
};

export const actGetTeamByIdRequest = (id) => {
  return (dispatch) => {
    callApi(`api/v4/teams/${id}`, "GET", null, true).then((res) => {
      if (res && res.status === 200) {
        dispatch(actGetTeamById(res.data));
      }
    });
  };
};

// Xóa team
export const actDeleteTeam = (id) => {
  toast.success("Xóa thành công");
  return {
    type: Types.DELETE_TEAM,
    id,
  };
};

export const actDeleteTeamRequest = (id) => {
  return (dispatch) => {
    callApi(`api/v4/teams/${id}`, "DELETE", null, true).then((res) => {
      if (res && res.status === 200) {
        dispatch(actDeleteTeam(id));
      }
    });
  };
};
