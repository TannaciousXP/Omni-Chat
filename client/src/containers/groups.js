import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../actions';

import InviteLink from './invite_link';
import NewGroup from './new_group';
import JoinGroup from './join_group';
import LeaveGroup from './leave_group';

import { Segment, Icon, Menu } from 'semantic-ui-react';

class Groups extends Component { 
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchGroups(this.props.profile);    
  }
  // handleItemClick = (e, { name }) => this.setState({activeItem: name});
  handleItemClick(e, {name}) {
    this.setState({activeItem: name});
  }

  renderGroups() {
    return _.map(this.props.groups, group => {
      return (
        <Menu.Item key={group.group_id} value={group.group_id} onClick={(e) => { this.props.handleChannel; }}>
          <span>
            {group.groups.name}
            <InviteLink group={group.groups} profile={this.props.profile}/>
            <LeaveGroup group={group} handleDeleteGroup={this.props.handleDeleteGroup}/>          
          </span>
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <Menu.Item>
        <Menu.Header>Groups</Menu.Header>
        <Menu.Menu>
        {this.renderGroups()}
        </Menu.Menu>
        <NewGroup profile={this.props.profile}/>
      </Menu.Item>
    );
  }
}

const mapStateToProps = function(state) {
  return { groups: state.groups, profile: state.profile };
};

export default connect(mapStateToProps, { fetchGroups })(Groups);
//         <button onClick={this.props.handleChannel} value={group.group_id}>  </button>
      // <div>
      //   <h2>Groups</h2>
      //   <Segment.Group>
      //     {this.renderGroups()}
      //     <NewGroup profile={this.props.profile}/>
      //     <JoinGroup profile={this.props.profile}/>
      //     <button onClick={this.props.showEvents}>
      //       <Icon name='calendar' size='big' />          
      //     </button>
      //   </Segment.Group>
      // </div>