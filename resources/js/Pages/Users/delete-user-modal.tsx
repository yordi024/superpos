import { useRef, useState, FormEventHandler } from "react";
import { InputError } from "@/components/ui/input-error";
import { useForm } from "@inertiajs/react";
import { Button, LoaderButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
export default function DeleteUserModal({
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
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm();

  const deleteUser: FormEventHandler = e => {
    e.preventDefault();

    destroy(route("users.destroy", user.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
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
    <>
      <Dialog
        open={open}
        onOpenChange={value => {
          setOpen(value);
          setSelectedUser(undefined);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this user?
            </DialogTitle>
            <DialogDescription className="py-2">
              User <b>{user.name}</b> will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={deleteUser}>
            <DialogFooter>
              <Button
                size="sm"
                variant="secondary"
                disabled={processing}
                type="button"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <LoaderButton
                variant="destructive"
                loading={processing}
                type="submit"
              >
                Delete Account
              </LoaderButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
