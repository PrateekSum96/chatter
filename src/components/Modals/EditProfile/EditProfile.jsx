import { useState } from "react";
import "./EditProfile.css";
import { useDispatch } from "react-redux";
import { editUserInfo, setLayover } from "../../../features/userSlice";

const EditProfile = ({ user, setEditProfile }) => {
  const dispatch = useDispatch();
  const initialState = {
    bio: user?.bio,
    website: user?.website,
  };
  const [editUser, setEditUser] = useState(initialState);

  return (
    <div className="edit-profile">
      <div id="modal-name-ep">Edit Profile</div>
      <div
        id="close-edit-profile"
        onClick={() => {
          dispatch(setLayover(false));
          setEditProfile(false);
        }}
      >
        &#x2715;
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(editUserInfo(editUser));
          dispatch(setLayover(false));
          setEditProfile(false);
        }}
      >
        <div className="input-edit-form">
          <label htmlFor="">Bio</label>
          <input
            type="text"
            value={editUser?.bio}
            onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
          />
        </div>
        <div className="input-edit-form">
          <label htmlFor="">Website</label>
          <input
            type="text"
            value={editUser?.website}
            onChange={(e) =>
              setEditUser({ ...editUser, website: e.target.value })
            }
          />
        </div>
        <button className="edit-button-ep">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
