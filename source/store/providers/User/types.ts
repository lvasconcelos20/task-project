import { UserEntity } from "@/common/entities/user";

export interface UserContextType {
  allUsers?: UserEntity[] | null;
  loading: Record<string, boolean>;
  fetchAllUsers: () => void;
}
