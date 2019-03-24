import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import theme from "../theme";
import { ActionButton } from "../styled-constants";
import {
  getRoomData,
  getAllowedActions,
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




class Actions extends Component {
  constructor(props) {
    super(props);
    //this.handleAction = this.handleAction.bind(this);
    //this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {}


   
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
    
          {allowableActions.length > 0 &&
            allowableActions.map((action, index) => {
              return (
                <ActionButton  key={index} onClick={this.handleAction(action)}>
                  {action}
                </ActionButton >
              );
            })}
     
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
