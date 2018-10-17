import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import PlayersList from '../src/components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update player score', () => {
  const appComponent = shallow(<App />);

  const players = [
    {
      name: 'Kunegunda',
      score: 4
    },
  ];

  appComponent.setState({ players });

  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');

  onScoreUpdate(0, 5);

  const playersAfterUpdate = appComponent.state().players;

  playersAfterUpdate[0].score

  expect(playersAfterUpdate[0].score).toEqual(9);
});

it('should add a new player', () => {
  const appComponent = shallow(<App />);
  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');

  onPlayerAdd('Ania');

  const players = appComponent.state('players');

  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual('Ania');
  expect(players[0].score).toEqual(0);
});

it('should delete player', () => {
  const appComponent = mount(<App />);
  const players = [
    {
      name: 'Kunegunda',
      score: 5
    },
  ];
  appComponent.setState({ players });

  const removeButton = appComponent.find('.Player__remove');

  removeButton.simulate('click');

  const playersAfterUpdate = appComponent.state('players');

  expect(playersAfterUpdate.length).toEqual(players.length -1 );
});
