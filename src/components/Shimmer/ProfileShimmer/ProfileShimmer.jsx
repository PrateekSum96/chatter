import PageShimmer from "../PageShimmer/PageShimmer";
import "./ProfileShimmer.css";

const ProfileShimmer = () => {
  return (
    <div>
      <div className="profile-shimmer">
        <div className="image-shimmer-ps"></div>
        <div className="info-shimmer-ps">
          <div id="shimmer-one-ps">
            <div></div>
            <div></div>
          </div>
          <div id="shimmer-two-ps">
            <div></div>
            <div></div>
          </div>
          <div id="shimmer-three-ps">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div id="btn-shimmer-ps"></div>
      </div>
      <PageShimmer />
    </div>
  );
};

export default ProfileShimmer;
