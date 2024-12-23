import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserAvatarProps = {
    src: string;
    alt?: string;
};


export default function UserAvatar({src, alt}: UserAvatarProps) {
  return (
    <Avatar className="h-8 w-8">
        <AvatarImage src={src}/>
        <AvatarFallback>{alt || "P"}</AvatarFallback>
    </Avatar>

  )
}
