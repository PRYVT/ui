import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";
import { EnhancedPost } from "@/types/enhanced_post.type";
import { toReadableDateTime } from "@/utils/date";
export const ContentCard = ({ post }: { post: EnhancedPost }) => {
  return (
    <Card key={post.id} className="rounded-lg shadow p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarFallback
            className={
              "text-white font-semibold " +
              randomTailwindBackgroundColor(post.user.id)
            }
          >
            {chooseTwoCharsFromName(post.user.display_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{post.user.display_name}</h3>
          <p className="text-sm text-gray-500">
            {toReadableDateTime(new Date(post.change_date))}
          </p>
        </div>
      </div>
      <p className="mb-4">{post.text}</p>
      <div className="flex justify-center">
        {post.image_base64 && (
          <img
            src={post.image_base64}
            alt="Post image"
            className="object-cover rounded-md mb-4 "
          />
        )}
      </div>
      <div className="flex space-x-4">
        <Button variant="ghost" size="sm" disabled>
          Like
        </Button>
        <Button variant="ghost" size="sm" disabled>
          Comment
        </Button>
        <Button variant="ghost" size="sm" disabled>
          Share
        </Button>
      </div>
    </Card>
  );
};
