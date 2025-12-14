const canViewCapsule = (capsule, user) => {
  // 1) Public: any logged-in user can view
  if (capsule.privacy === "public") return !!user;

  // 2) Private/shared need a user
  if (!user) return false;

  const isOwner = capsule.owner._id.toString() === user._id.toString();
  const isCollaborator = capsule.collaborators.some(
    (id) => id.toString() === user._id.toString()
  );
  const isRecipient = capsule.recipients.includes(user.email);

  if (capsule.privacy === "private") {
    // Only owner
    return isOwner;
  }

  if (capsule.privacy === "shared") {
    // Owner + collaborators + recipients
    return isOwner || isCollaborator || isRecipient;
  }

  return false;
};
export {canViewCapsule}