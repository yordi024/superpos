import ApplicationLogo from "@/components/ApplicationLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-100 dark:bg-slate-900">
      <div>
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      </div>

      <Card className="w-full sm:max-w-md mt-6">
        <CardContent className="px-6 py-4">{children}</CardContent>
      </Card>
    </div>
  );
}
