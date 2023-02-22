import { useAppSelector } from '../../redux/store';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../theme/ThemeContext';
import ClipLoader from 'react-spinners/ClipLoader';
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
  const { t } = useTranslation();
  const { users, status } = useAppSelector(state => state.admin);
  const { theme } = useContext(ThemeContext);

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
    <>
      {status === 'loading' ? (
        <div className="text-center">
          <ClipLoader color="#428bff" className="loader" />
        </div>
      ) : (
        <Table striped responsive bordered hover variant={theme}>
          <thead>
            <tr>
              <th className="col-1">{t('Action')}</th>
              <th>{t('Username')}</th>
              <th>{t('E-mail')}</th>
              <th>{t('Role')}</th>
              <th>{t('Status')}</th>
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
      )}
    </>
  );
};

export default AdminTable;
