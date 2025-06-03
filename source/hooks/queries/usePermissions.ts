
"use client";

import { useContext } from "react";
import AuthContext from "@/source/store/providers/Auth/context";
import { ProjectEntity } from "@/common/entities/projects";


export const usePermissions = () => {
  const { userUid } = useContext(AuthContext);

  if (!userUid) {
    return {
      canManageProject: () => false,
      canManageCollaborators: () => false,
      canCreateTask: () => false,
      canManageTask: () => false,
    };
  }

  const canManageProject = (project: ProjectEntity): boolean => {
    return project.creator_id === userUid;
  };

  const canManageCollaborators = (project: ProjectEntity): boolean => {
    return project.creator_id === userUid;
  };

  const canCreateTask = (project: ProjectEntity): boolean => {
    return (
      project.creator_id === userUid ||
      project.collaborators?.includes(userUid)
    );
  };

  
  

  return {
    canManageProject,
    canManageCollaborators,
    canCreateTask,
  };
};
