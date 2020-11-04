import React, { Component } from "react";
import "../../common.scss";
import "./team-management.scss";

import Checkbox from "@material-ui/core/Checkbox";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  actGetTeamsRequest,
  actDeleteTeamRequest,
  actAddTeamRequest,
  actGetTeamByIdRequest,
  actUpdateTeamRequest,
} from "../../actions/team";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Pagination from "@material-ui/lab/Pagination";
import { appConfig } from "../../constants/config-app";
/**
 * team management component
 * ? display all team current user manager
 */
class TeamManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      display_name: "",
      description: "",
      allow_open_invite: false,
      type: "O",
      open: false,
      listCheckedID: [],
      page: 1,
      per_page: 10,
      filterType: localStorage.getItem("filterType")
        ? localStorage.getItem("filterType")
        : "All",
    };
  }

  // Gọi action lấy về danh sách team
  componentDidMount = () => {
    const { isLogin } = this.props;
    const filter = {
      page: 0,
      per_page: 10,
      include_total_count: true,
      filterType: this.state.filterType,
    };
    if (isLogin) {
      this.props.getTeams(filter);
    }
  };

  getPaging = (e, page) => {
    this.setState({
      page: page,
    });
    const filter = {
      page: page - 1,
      per_page: 10,
      include_total_count: true,
      filterType: this.state.filterType,
    };

    this.props.getTeams(filter);
  };

  // Mở popup thêm tin
  handleClickOpen = () => {
    this.setState({
      id: "",
      name: "",
      display_name: "",
      description: "",
      allow_open_invite: true,
      type: "O",
      open: true,
      isHiddenName: false,
    });
  };

  // Đóng popup thêm team
  handleClose = () => {
    this.setState({ open: false });
  };

  onSaveTeam = (e) => {
    const {
      id,
      name,
      display_name,
      description,
      allow_open_invite,
      type,
    } = this.state;

    const newTeam = {
      id: id,
      name: name,
      display_name: display_name,
      description: description,
      allow_open_invite: this.state.type === "O" ? true : false,
      type: type,
    };

    if (id) {
      this.props.upDateTeam(newTeam);
      const selectedTeam = this.props.selectedTeam;
      setTimeout(() => {
        if (selectedTeam !== this.props.selectedTeam) {
          this.handleClose();
        }
      }, 100);
    } else {
      const team = this.props.teams.teams.length;
      this.props.onAddTeam(newTeam);
      setTimeout(() => {
        if (this.props.teams.teams.length !== team) {
          this.handleClose();
        }
      }, 100);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.selectedTeam) {
      const {
        id,
        name,
        display_name,
        description,
        allow_open_invite,
        type,
      } = nextProps.selectedTeam;

      this.setState({
        id: id,
        name: name,
        display_name: display_name,
        description: description,
        allow_open_invite: allow_open_invite,
        type: type,
        open: true,
        isHiddenName: true,
      });
    }
  }

  // Xóa team
  deleteTeamHandler = (id) => {
    this.props.onDeleteTeam(id);
  };

  // Sửa team
  editTeamHandler = (idTeam) => {
    this.props.onGetTeamById(idTeam);
  };

  onChangeHandler = (e) => {
    let target = e.target;
    let name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onSelectTeam = (e) => {
    // var value =  e.target.checked;
  };

  //hiển thị teams
  showTeams = (teams) => {
    let result = null;
    const { listCheckedID } = this.state;
    if (teams.length > 0) {
      result = teams.map((team, index) => {
        const temp = {
          index: index,
          isSelected: false,
        };
        listCheckedID.push(temp);
        const link_team = `${appConfig.ApiUrl}/${team.name}`;
        return (
          <div
            className="one-team"
            key={team.id}
            onClick={() => console.log(team.id)}
          >
            <div className="select-team">
              <Checkbox
                inputProps={{ "aria-label": "primary checkbox" }}
                name="allow_open_invite"
                color="primary"
              />
            </div>
            <div className="team-name">{team.display_name}</div>
            <div className="team-url">
              <a href={link_team}>{link_team}</a>
            </div>
            <div className="team-description">{team.description}</div>
            <div className="team-status">
              {team.allow_open_invite === true ? "Open" : "Invite Only"}{" "}
              {team.delete_at !== 0 ? " - Đã xóa" : ""}
            </div>
            <div className="button-group">
              <Tooltip
                title="Edit"
                className="m-r-8"
                onClick={() => this.editTeamHandler(team.id)}
              >
                <IconButton aria-label="delete">
                  <EditTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Delete"
                onClick={() => this.deleteTeamHandler(team.id)}
              >
                <IconButton aria-label="delete" color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  onChangeSelectType = (e) => {
    let target = e.target;
    var value = target.value;
    localStorage.setItem("filterType", value);
    const filter = {
      page: 0,
      per_page: this.state.per_page,
      include_total_count: true,
      filterType: value,
    };

    this.props.getTeams(filter);
    this.setState({
      filterType: value,
    });
  };

  render() {
    const { isLogin, teams } = this.props;

    const teamsDisplay = teams.teams ? teams.teams : [];
    const {
      name,
      display_name,
      description,
      allow_open_invite,
      type,
      page,
      per_page,
      filterType,
    } = this.state;

    const count = teams.total_count;
    const totalPage = count > per_page ? Math.round(count / 10) + 1 : 1;
    console.log(count);

    console.log(Math.round(count / 10) + 1);
    if (!isLogin) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="wrap-team-management">
        {/* dialog */}
        <div>
          <div className="wrap-button-action">
            <Button
              className="btn btn-add"
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Thêm mới nhóm
            </Button>
            {/* <Select
              className="filter-type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterType}
              name="type"
              onChange={this.onChangeSelectType}
            >
              <MenuItem value={"All"}>Tất cả</MenuItem>
              <MenuItem value={"Me"}>Tôi tạo</MenuItem>
            </Select> */}
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Thêm mới nhóm</DialogTitle>
            <DialogContent>
              {this.state.isHiddenName === true ? (
                <div></div>
              ) : (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Tên nhóm"
                  type="text"
                  name="name"
                  value={name}
                  fullWidth
                  onChange={this.onChangeHandler}
                />
              )}

              <TextField
                margin="dense"
                label="Tên hiển thị"
                type="text"
                fullWidth
                value={display_name}
                name="display_name"
                onChange={this.onChangeHandler}
              />

              <TextField
                margin="dense"
                name="description"
                value={description}
                label="Mô tả"
                type="text"
                fullWidth
                onChange={this.onChangeHandler}
              />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                name="type"
                onChange={this.onChangeHandler}
              >
                <MenuItem value={"O"}>Open</MenuItem>
                <MenuItem value={"I"}>Invite Only</MenuItem>
              </Select>

              {/* {type === "O" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allow_open_invite}
                      onChange={this.onChangeHandler}
                      name="allow_open_invite"
                      color="primary"
                    />
                  }
                  label="Public"
                />
              ) : (
                <div></div>
              )} */}
            </DialogContent>
            <DialogActions className="m-r-8">
              <Button onClick={this.handleClose} color="primary">
                Hủy bỏ
              </Button>
              <Button
                onClick={this.onSaveTeam}
                color="primary"
                variant="contained"
              >
                {this.state.isHiddenName ? "Lưu" : "Thêm mới"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="one-team m-t-8 one-team-header">
          <div className="select-team">
            <div className="check-box-header">#</div>
          </div>
          <div className="team-name">Team name</div>
          <div className="team-url"> Team url</div>
          <div className="team-description">Mô tả</div>
          <div className="team-status">Trạng thái</div>
          <div className="button-group">Action</div>
        </div>
        <div>{this.showTeams(teamsDisplay)}</div>
        <div className="pagination-wrap">
          <div className="m-l-24">Tổng bản ghi: {count}</div>
          <Pagination
            color="primary"
            className="pagination"
            onChange={this.getPaging}
            page={page}
            count={totalPage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authentication,
    teams: state.teamReducer,
    selectedTeam: state.editReducer,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getTeams: (filter) => {
      dispatch(actGetTeamsRequest(filter));
    },
    onDeleteTeam: (id) => {
      dispatch(actDeleteTeamRequest(id));
    },
    onAddTeam: (newTeam) => {
      dispatch(actAddTeamRequest(newTeam));
    },
    onGetTeamById: (id) => {
      dispatch(actGetTeamByIdRequest(id));
    },
    upDateTeam: (selectedTeam) => {
      dispatch(actUpdateTeamRequest(selectedTeam));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);
