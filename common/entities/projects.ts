import { Timestamp } from "firebase/firestore";

export  interface ProjectEntity{
    id: string;
    name: string;
    description?: string;
    start_date: Timestamp;
    end_date: Timestamp;
    creator_id: string;
    collaborators: string[];    

}