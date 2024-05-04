import { useRef, useState } from "react";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo, setLayover } from "../../../features/userSlice";
import { FaCamera } from "react-icons/fa";
import img1 from "../../../asset/avatar/img1.jpg";
import img2 from "../../../asset/avatar/img2.jpg";
import img3 from "../../../asset/avatar/img3.jpg";
import img4 from "../../../asset/avatar/img4.jpg";
import img5 from "../../../asset/avatar/img5.jpg";

const EditProfile = ({ user, setEditProfile }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.auth.user);
  const [imgAddress, setImgAddress] = useState(loggedInUser?.avatarUrl);
  const inputRef = useRef(null);

  const initialState = {
    bio: user?.bio,
    website: user?.website,
    avatarUrl: user?.avatarUrl,
  };
  const [editUser, setEditUser] = useState(initialState);

  const avatarList = [
    { name: "img1", path: img1 },
    { name: "img2", path: img2 },
    { name: "img3", path: img3 },
    { name: "img4", path: img4 },
    { name: "img5", path: img5 },
  ];

  const handleImageClick = () => {
    inputRef.current.click();
  };

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
        <div id="img-edit-container-ep">
          <label htmlFor="image-edit-user">Avatar</label>
          <div>
            {imgAddress ? (
              <img src={imgAddress} alt="img-user" id="img-show-edit-ep" />
            ) : (
              <div id="no-avatar-ep">
                {loggedInUser?.firstName.substring(0, 1)}
              </div>
            )}
            <FaCamera id="icon-camera-ep" onClick={handleImageClick} />
            <div>Upload Image</div>
          </div>

          <input
            type="file"
            id="image-edit-user"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => {
              setEditUser({
                ...editUser,
                avatarUrl: URL.createObjectURL(e.target.files[0]),
              });
              setImgAddress(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <div className="avatar-container-ep">
          <div>Select avatar</div>
          {avatarList.map((img) => (
            <span className="img-span-ep" key={img.name}>
              <img
                src={img.path}
                alt={img.name}
                id="img-avatar-ep"
                onClick={(e) => {
                  setEditUser({
                    ...editUser,
                    avatarUrl: img.path,
                  });
                  setImgAddress(img.path);
                }}
              />
            </span>
          ))}
        </div>
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
