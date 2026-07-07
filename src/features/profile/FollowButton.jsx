function FollowButton({ isFollowing, onClick }) {
  return (
    <button onClick={onClick}>
      {isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
}

export default FollowButton;