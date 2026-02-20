import React from "react";

const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="avatar online">
        <div className="size-14 rounded-full bg-slate-700"></div>
      </div>

      {/* Text Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-slate-700 rounded"></div>
        <div className="h-3 w-16 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
