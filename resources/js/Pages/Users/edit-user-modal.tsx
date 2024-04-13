import { Button, LoaderButton } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export function EditUserModal({
  open,
  setOpen,
  user,
  setSelectedUser,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedUser: (user?: User) => void;
  user: User;
}) {
  const { data, setData, post, errors, processing, reset, clearErrors } =
    useForm({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      status: user.is_active ? "active" : "inactive",
      _method: "patch",
    });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const submit: FormEventHandler = e => {
    e.preventDefault();

    post(route("users.update", user.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setTimeout(() => {
      setOpen(false);
      setSelectedUser(undefined);
      reset();
      clearErrors();
    }, 100);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        setOpen(value);
        setSelectedUser(undefined);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {user.name}</DialogTitle>
          <DialogDescription>Edit selected user.</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              className="mt-1 block w-full"
              value={data.name}
              onChange={e => setData("name", e.target.value)}
              required
              autoFocus
              autoComplete="name"
            />
            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <Label htmlFor="username">Username</Label>

            <Input
              id="username"
              className="mt-1 block w-full"
              value={data.username}
              onChange={e => setData("username", e.target.value)}
              autoComplete="false"
              required
            />
            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              value={data.email}
              onChange={e => setData("email", e.target.value)}
              required
              autoComplete="email"
            />

            <InputError className="mt-2" message={errors.email} />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <RadioGroup
              onValueChange={value => setData("status", value)}
              defaultValue={data.status}
              className="flex gap-4 mt-1"
            >
              <div>
                <RadioGroupItem
                  id="active"
                  value="active"
                  className="peer sr-only"
                  aria-label="active"
                />
                <Label
                  role="button"
                  htmlFor="active"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Active
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="inactive"
                  id="inactive"
                  className="peer sr-only"
                  aria-label="inactive"
                />
                <Label
                  role="button"
                  htmlFor="inactive"
                  className="flex items-center justify-between rounded-md border-2 border-muted bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Inactive
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="items-center">
            <DialogClose asChild>
              <Button size="sm" variant="secondary" disabled={processing}>
                Cancel
              </Button>
            </DialogClose>
            <LoaderButton type="submit" loading={processing}>
              Save Changes
            </LoaderButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
