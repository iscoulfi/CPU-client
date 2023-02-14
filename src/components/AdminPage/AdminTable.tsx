import { useAppSelector } from '../../redux/store';
import { Dispatch, SetStateAction } from 'react';
import Table from 'react-bootstrap/Table';

type AdminTableParams = {
  setCheckedUserId: Dispatch<SetStateAction<string>>;
  activeCheckbox: number | null;
  setActiveCheckbox: Dispatch<SetStateAction<number | null>>;
};

const AdminTable = ({
  setCheckedUserId,
  activeCheckbox,
  setActiveCheckbox,
}: AdminTableParams) => {
  const { users } = useAppSelector(state => state.admin);

  const activeUser = (ind: number, id: string) => {
    if (ind === activeCheckbox) {
      setActiveCheckbox(null);
      setCheckedUserId('');
    } else {
      setActiveCheckbox(ind);
      setCheckedUserId(id);
    }
  };
  return (
    <Table striped responsive bordered hover>
      <thead>
        <tr>
          <th className="col-1">Action</th>
          <th>Username</th>
          <th>E-mail</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, ind) => (
          <tr key={user._id}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={ind === activeCheckbox}
                onChange={() => {
                  activeUser(ind, user._id);
                }}
              />
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.roles[0]}</td>
            <td>{user.statusUser}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminTable;
