import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useRef } from "react";
import { PageProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      avatar: null,
      name: user.name,
      username: user.username,
      email: user.email,
      _method: "patch",
    });

  const image = data.avatar
    ? URL.createObjectURL(data.avatar)
    : user.avatar_url;

  const submit: FormEventHandler = e => {
    e.preventDefault();

    post(route("profile.update"));
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>

        <CardDescription>
          Update your account's profile information and email address.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* <pre>{JSON.stringify(data.avatar)}</pre> */}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <ImagePreviewInput image={image} setData={setData} />
            <InputError className="mt-2" message={errors.name} />
          </div>
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
              required
              autoFocus
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

          {mustVerifyEmail && user.email_verified_at === null && (
            <div>
              <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                Your email address is unverified.
                <Link
                  href={route("verification.send")}
                  method="post"
                  as="button"
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Click here to re-send the verification email.
                </Link>
              </p>

              {status === "verification-link-sent" && (
                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                  A new verification link has been sent to your email address.
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button disabled={processing}>Save</Button>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
            </Transition>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function ImagePreviewInput({
  image,
  setData,
}: {
  image: string;
  setData: (key: string, value: any) => void;
}) {
  const hiddenFileInput = useRef(null);

  const handleFileUploadClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <>
      <div
        role="button"
        onClick={handleFileUploadClick}
        className="flex flex-col gap-2 w-[200px]"
      >
        <Avatar className="h-14 w-14">
          <AvatarImage src={image} alt="user avatar" />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">Select profile image</p>
      </div>

      <Input
        id="avatar"
        className="mt-1 hidden"
        type="file"
        ref={hiddenFileInput}
        onChange={e => setData("avatar", e.target.files[0])}
      />
    </>
  );
}
