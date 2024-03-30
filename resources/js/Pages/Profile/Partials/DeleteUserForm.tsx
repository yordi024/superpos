import { useRef, useState, FormEventHandler } from "react";
import { InputError } from "@/components/ui/input-error";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function DeleteUserForm({
  className = "",
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = e => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
    clearErrors();
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            disabled={processing}
            onClick={confirmUserDeletion}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={confirmingUserDeletion} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-2xl">
          <form onSubmit={deleteUser}>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogDescription className="pt-2">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Please enter your password to confirm
                you would like to permanently delete your account.
              </DialogDescription>
            </DialogHeader>
            <div className="my-6">
              <Label htmlFor="name" className="text-right sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                ref={passwordInput}
                value={data.password}
                placeholder="Password"
                className="mt-1 block md:w-3/4"
                onChange={e => setData("password", e.target.value)}
                autoFocus
              />

              <InputError message={errors.password} className="mt-2" />
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                disabled={processing}
                type="button"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button variant="destructive" disabled={processing} type="submit">
                Delete Account
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
