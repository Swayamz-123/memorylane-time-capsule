const canViewCapsule = (capsule, user) => {
  if (capsule.privacy === "public") return !!user;
  if (!user) return false;

  const isOwner = capsule.owner._id.toString() === user._id.toString();

  const isCollaborator = capsule.collaborators.some((c) => {
    const collaboratorId = c._id ? c._id.toString() : c.toString();
    return collaboratorId === user._id.toString();
  });

  const isRecipient = capsule.recipients
    .map((e) => e.toLowerCase().trim())
    .includes(user.email.toLowerCase().trim());

  if (capsule.privacy === "private") {
    return isOwner;
  }

  if (capsule.privacy === "shared") {
    return isOwner || isCollaborator || isRecipient;
  }

  return false;
};
export {canViewCapsule}