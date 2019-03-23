import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styled from "styled-components/macro";
import {
  getRoomData,
  getAllowedActions,
  getAllowedExits
} from "../utils/dataHelper";

import {
  resultSuccessRoll,
  resultMessage,
  resultScore,
  resultTake,
  resultDrop,
  resultLocation,
  resultDestroy,
  resultMoney,
  resultRoomDesc,
  resultCreateExit,
  restart
} from "../actions";

const ActionsDiv = styled.div`
  /* ACTIONS COMPONENT */

  display: inline-block;
  /*width:50%;*/
  vertical-align: top;
  > button {
    display: inline-block;
    /*trbl*/
    padding: 3px 4px 2px 4px;
    margin: 3px 5.9px 3px 0px;
    border: none;
    border-radius: 2px;
    background-color: #fff;
    font-weight: bold;
    font-size: inherit;
    letter-spacing: inherit;
    color: black;
    cursor: pointer;

    &:disabled{
      background-color:grey;
    }
  }
`;

class Actions extends Component {
  constructor(props) {
    super(props);
    //this.handleAction = this.handleAction.bind(this);
    //this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {}
  handleMove = exit => e => {
    const { rooms, room } = this.props;

    const currentRoomExits = getRoomData(room, rooms).exits;
    e.preventDefault();
    switch (exit) {
      case "Up":
        this.props.dispatch(resultLocation(currentRoomExits.u));
        this.props.dispatch(resultMessage("You've travelled Up"));
        break;
      case "Down":
        this.props.dispatch(resultLocation(currentRoomExits.d));
        this.props.dispatch(resultMessage("You've travelled Down"));
        break;
      case "North":
        this.props.dispatch(resultLocation(currentRoomExits.n));
        this.props.dispatch(resultMessage("You've travelled North"));
        break;
      case "South":
        this.props.dispatch(resultLocation(currentRoomExits.s));
        this.props.dispatch(resultMessage("You've travelled South"));
        break;
      case "West":
        this.props.dispatch(resultLocation(currentRoomExits.w));
        this.props.dispatch(resultMessage("You've travelled West"));
        break;
      case "East":
        this.props.dispatch(resultLocation(currentRoomExits.e));
        this.props.dispatch(resultMessage("You've travelled East"));
        break;
      default:
        console.warn("WARNING - EXIT = [" + exit + "] is not being processed!");
    }
  };
  handleAction = action => e => {
    e.preventDefault();

    const { objects, actions, room, money } = this.props;

    const allowableActions = getAllowedActions(
      objects,
      actions,
      room,
      money
    ).map(action => {
      return action;
    });
    const results = allowableActions.filter(a => {
      return a.action === action;
    })[0].results;

    for (var key of Object.keys(results)) {
      this.dispatchResults(key, results[key]);
    }
  };
  dispatchResults(key, data) {
    console.log(key, data);
    switch (key) {
      case "createExitOnRollSuccess":
        const roll = Math.ceil(Math.random() * data.sides);

        console.log(roll, data.sides);
        if (roll === data.sides) {
          this.props.dispatch(resultSuccessRoll(roll === data.sides));

          this.props.dispatch(resultCreateExit(data));

          //rollmMssage
          this.props.dispatch(
            resultMessage(
              "You rolled a " +
                roll +
                " from a " +
                data.sides +
                " sided dice. " +
                data.rollMessage
            )
          );
        } else {
          this.props.dispatch(
            resultMessage(
              "You rolled a " + roll + " from a " + data.sides + " sided dice. "
            )
          );
        }

        break;

      case "message":
        this.props.dispatch(resultMessage(data));
        break;
      case "take":
        this.props.dispatch(resultTake(data));
        break;
      case "drop":
        this.props.dispatch(resultDrop(data));
        break;
      case "changeScore":
        this.props.dispatch(resultScore(data));
        break;
      case "changeLocation":
        this.props.dispatch(resultLocation(data));
        break;
      case "destroys":
        this.props.dispatch(resultDestroy(data));
        break;
      case "addMoney":
        this.props.dispatch(resultMoney(data));
        break;
      case "removeMoney":
        this.props.dispatch(resultMoney(-data));
        break;
      case "changeRoomDesc":
        this.props.dispatch(resultRoomDesc(data));
        break;
      case "createExit":
        this.props.dispatch(resultCreateExit(data));
        break;
      case "restart":
        this.props.dispatch(restart());

        break;
      default:
        console.warn("WARNING result = [" + key + "] is not being processed!");
    }
  }
  renderExits = currentRoomData => {
    console.log(currentRoomData);
    const unsortedExits = getAllowedExits(currentRoomData).map(exit => {
      if (exit === "n") return "North";
      if (exit === "e") return "East";
      if (exit === "s") return "South";
      if (exit === "w") return "West";
      
      if (exit === "u") return "Up";
      if (exit === "d") return "Down";
      return null;
    });
    //However the data arrive always show n,s,w,e,u,d
    const potentialExits = ["North",  "East","South", "West", "Up", "Down"];
    const allowableExits = unsortedExits.filter(e => {
      //return e === "North";
      console.log(e)
      return potentialExits.includes(e);
    });

    console.log(allowableExits);
    //if (allowableExits.length > 0) {
    const renderExits = potentialExits.map((exit, index) => {
      console.log(exit);
      if (allowableExits.includes(exit)) {
        return (
          <button key={index} onClick={this.handleMove(exit)}>
            {exit}
          </button>
        );
      }else{
        return (
          <button key={index} disabled={true}>
            {exit}
          </button>
        );

      }
    });
    return renderExits;
    //}
  };

  render() {
    //console.log('Actions rendered');
    const { objects, actions, rooms, room, money } = this.props;
    const currentRoomData = getRoomData(room, rooms);

    const allowableActions = getAllowedActions(
      objects,
      actions,
      room,
      money
    ).map(action => {
      return action.action;
    });

    return (
      <Fragment>
        <ActionsDiv>
          {this.renderExits(currentRoomData)}
          {/*
          {allowableExits.length > 0 &&
            allowableExits.map((exit, index) => {
              return (
                <button key={index} onClick={this.handleMove(exit)}>
                  {exit}
                </button>
              );
            })}
          */}

          {allowableActions.length > 0 &&
            allowableActions.map((action, index) => {
              return (
                <button key={index} onClick={this.handleAction(action)}>
                  {action}
                </button>
              );
            })}
        </ActionsDiv>
      </Fragment>
    );
  }
}
Actions.propTypes = {
  objects: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  rooms: PropTypes.array.isRequired,
  room: PropTypes.string.isRequired,
  money: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  const { objects, actions, rooms, room, money } = state.gameData;

  //console.log(actions);
  return {
    objects,
    actions,
    rooms,
    room,
    money
  };
}
//mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state)
export default connect(mapStateToProps)(Actions);
