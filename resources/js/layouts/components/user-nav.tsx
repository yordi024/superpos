"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import type { User as UserType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@inertiajs/react";

type Props = {
    user: UserType;
};

export function UserNav({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        {user.name && <p className="font-medium leading-none">{user.name}</p>}
                        {user.email && (
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        )}
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={ route('profile.edit') }>
                            <User className="mr-2 h-4 w-4" aria-hidden="true" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link className="w-full" method="post" href={ route('logout') } as="button">
                            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                            Log Out
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
