const canInteract = (capsule, user) => {
  return (
    capsule.isUnlocked &&
    (
      capsule.owner.toString() === user._id.toString() ||
      capsule.collaborators.some(id => id.toString() === user._id.toString()) ||
      capsule.recipients.includes(user.email)
    )
  );
};

export default canInteract;
