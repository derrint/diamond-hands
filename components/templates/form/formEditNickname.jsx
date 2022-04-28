/* eslint-disable no-shadow */
import React from 'react';
import {toast} from 'react-toastify';

import {useActions, useState} from '@overmind/index';
import {Button} from '@elements';

const FormEditNickname = ({title}) => {
  const {player} = useState();
  const {updatePlayerProfile, getPlayerProfile, hideModal} = useActions();

  const [username, setUsername] = React.useState(player.userName);
  const [error, setError] = React.useState('');

  const doEditNickname = async () => {
    if (username) {
      toast.promise(
        updatePlayerProfile({
          userName: username,
        }),
        {
          pending: {
            render() {
              return 'Checking...';
            },
          },
          success: {
            render() {
              hideModal();
              getPlayerProfile();
              return 'Nickname saved!';
            },
          },
          error: {
            render({data}) {
              setError(data.error);
              return data.error;
            },
            autoClose: false,
          },
        },
      );
    } else {
      toast.warn('Nickname cannot be blank!');
    }
  };

  const formTitle = title ?? 'Edit Nickname';
  const errorClass = error ? 'error' : '';

  return (
    <div className="p-8">
      <h2 className="text-center mb-10 text-3xl font-g8 font-bold text-secondary-blue-75">{formTitle}</h2>
      
      <form className="form__login">
        <div className="form-control mb-5">
          <input
            className={`outline-none ${errorClass}`}
            type="text"
            name="name"
            placeholder="Input a nickname here..."
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
          />
        </div>

        <p className="info__error text-center mb-10">
          {error}
        </p>

        <p className="info__description text-center mb-10">
          You can input 3 to 15 characters.
          <br />
          Nickname can contain number, letters,
          <br />
          or special characters.
        </p>

        <div className="form-control">
          <Button
            className="is-blue is-rounded is-semibold"
            onClick={doEditNickname}
          >
            Confirm
          </Button>
        </div>
        
      </form>
    </div>
  );
};

export default FormEditNickname;
