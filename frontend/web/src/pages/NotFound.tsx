import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-muted">
              <span className="text-6xl font-bold text-muted-foreground">
                404
              </span>
            </div>
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link to="/">Go back home</Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            Lost? Try searching for what you're looking for or check the
            navigation menu.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
