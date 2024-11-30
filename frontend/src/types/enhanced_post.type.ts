import { User } from "./user.type";

export interface EnhancedPost {
  change_date: string;
  id: string;
  text: string;
  image_base64: string;
  user: User;
}
