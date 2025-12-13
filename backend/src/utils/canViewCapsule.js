const canViewCapsule = (capsule, user) => {
  if (capsule.privacy === "public") return true;
  console.log(user)
  if (!user) return false;
  
 
  return (
    capsule.owner._id.toString() === user._id.toString() ||
    capsule.collaborators.some(id => id.toString() === user._id.toString()) ||
    capsule.recipients.includes(user.email)
  );
};

export default canViewCapsule;
