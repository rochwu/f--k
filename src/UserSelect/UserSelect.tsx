import {styled} from 'solid-styled-components';
import {Select, SelectOption} from '../Select';
import {selectedUserId, setSelectedUserId} from '../signals/send';
import {UsersById, usersById} from '../signals/store';
import {Label} from './Label';

const Placeholder = styled('div')({
  width: '100%',
  textAlign: 'start',
});

export const UserSelect = () => {
  const userToOption = (user: UsersById[string]) => {
    return {
      label: <Label user={user} />,
      value: user.id,
    };
  };

  // Can't memoize this, something seems to mutate the something in the options, making the references not match or something
  const options = () => {
    const map = usersById[0]()!;

    return Object.values(map).map(userToOption);
  };

  const change = (next: SelectOption | null) => {
    setSelectedUserId(next?.value);
  };

  const value = () => {
    const userId = selectedUserId();

    return options().find((option) => {
      return option.value === userId;
    });
  };

  return (
    <Select
      defaultValue={value()}
      options={options()}
      onChange={change}
      placeholder={<Placeholder>{'🗣️?'}</Placeholder>}
    />
  );
};
