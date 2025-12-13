const canViewCapsule = (capsule, user) => {
  if (capsule.privacy === "public") return true;
  if (!user) return false;

  return (
    capsule.owner.toString() === user._id.toString() ||
    capsule.collaborators.some(id => id.toString() === user._id.toString()) ||
    capsule.recipients.includes(user.email)
  );
};

export default canViewCapsule;
