import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo, setLayover } from "../../../features/userSlice";
import { FaCamera } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { avatarList } from "../../../utils/Constants/constants";
import "./EditProfile.css";

const EditProfile = ({ user, setEditProfile, showEditProfile }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.auth.user);
  const [showAvatar, setAvatar] = useState(false);
  const [imgAddress, setImgAddress] = useState(loggedInUser?.avatarUrl);
  const inputRef = useRef(null);

  const initialState = {
    bio: user?.bio,
    website: user?.website,
    avatarUrl: user?.avatarUrl,
  };
  const [editUser, setEditUser] = useState(initialState);

  useEffect(() => {
    setEditUser(initialState);

    // eslint-disable-next-line
  }, [user]);

  setTimeout(() => {
    if (showEditProfile) {
      setAvatar(true);
    }
  }, 1000);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  return (
    <div
      className="edit-profile"
      id={`${showEditProfile ? "edit-profile-id" : ""}`}
    >
      <div id="modal-name-ep">Edit Profile</div>
      <MdClose
        id="close-edit-profile"
        onClick={() => {
          dispatch(setLayover(false));
          setEditProfile(false);
          setAvatar(false);
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(editUserInfo({ userData: editUser }));
          dispatch(setLayover(false));
          setEditProfile(false);
          setAvatar(false);
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
          <div id="avatar-title">Select avatar</div>
          {showAvatar ? (
            avatarList?.map((img) => (
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
            ))
          ) : (
            <AvatarShimmer />
          )}
        </div>

        <div className="input-edit-form">
          <label htmlFor="">Email</label>
          <div id="email-ep">{user?.email}</div>
        </div>
        <div className="input-edit-form">
          <label htmlFor="">Bio</label>
          <input
            type="text"
            value={editUser?.bio || ""}
            onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
          />
        </div>
        <div className="input-edit-form">
          <label htmlFor="">Website</label>
          <input
            type="text"
            value={editUser?.website || ""}
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

const AvatarShimmer = () => {
  return (
    <div className="avatar-shimmer">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default EditProfile;
