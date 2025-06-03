import { Timestamp } from "firebase/firestore";

export interface TaskEntity {
  id: string;
  name: string;
  description: string;
  image_url: string;
  creator_id: string;
  project_id: string;
  created_at: Timestamp;  
}
