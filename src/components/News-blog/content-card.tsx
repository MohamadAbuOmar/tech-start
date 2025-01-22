import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ContentCardProps {
  type: "blog" | "publication" | "announcement";
  title: string;
  description?: string;
  date: string;
  readTime?: string;
  tags?: string[];
  imageUrl: string;
  slug: string;
}

export function ContentCard({
  type,
  title,
  description,
  date,
  readTime,
  tags,
  imageUrl,
  slug,
}: ContentCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/${type}/${slug}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="aspect-[16/9] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={date}>{date}</time>
            </div>
            {readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readTime} read</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {description}
            </p>
          )}
        </CardContent>
        <CardFooter className="px-6 pb-6 mt-auto">
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
