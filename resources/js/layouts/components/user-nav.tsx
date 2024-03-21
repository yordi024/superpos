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
    const fallbackName = () => {
        const names = user.name.split(' ');
        return [
            names[0][0],
            names[1] ? names[1][0] : ''
        ].join('');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center space-x-2">
                    <div className="text-xs">
                        Hello,<br />
                        <span className="font-semibold">{user.name.split(' ')[0]}</span>
                    </div>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar_url} alt="user avatar" />
                        <AvatarFallback>{fallbackName()}</AvatarFallback>
                    </Avatar>
                </div>
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
