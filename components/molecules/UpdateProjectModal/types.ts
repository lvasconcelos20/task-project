
import { ProjectEntity } from "@/common/entities/projects";

export interface UpdateProjectModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void
    userId: string
    projectToEdit: ProjectEntity; 
}

