export interface TaskEntity {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done"; 
  due_date: Date;
  image_url: string; 
  project_id: string; 
  creator_id: string; 
}
