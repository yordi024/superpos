<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Bouncer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $admin = Bouncer::role()->firstOrCreate([
        //     'name' => 'admin',
        //     'title' => 'Administrator',
        // ]);

        // $ban = Bouncer::ability()->firstOrCreate([
        //     'name' => 'ban-users',
        //     'title' => 'Ban users',
        // ]);

        // Bouncer::allow($admin)->to($ban);
        // Bouncer::assign('admin')->to($request->user());

        $orderBy = [
            'column' => $request->get('column', 'id'),
            'sort' => $request->get('sort', 'desc'),
        ];

        $users = User::query()
            ->when($request->has('search'), function (Builder $query) use ($request) {
                $query->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('username', 'like', '%'.$request->search.'%')
                    ->orWhere('email', 'like', '%'.$request->search.'%');
            })
            ->orderBy($orderBy['column'], $orderBy['sort'])
            ->paginate($request->get('perPage', 15))
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => fn () => UserResource::collection($users),
            'filters' => $request->only(['search', 'column', 'sort', 'perPage']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        $data = $request->validated();
        $data['is_active'] = $data['status'] === 'active' ? true : false;
        unset($data['status']);

        User::create($data);

        return back()->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        dd($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data['is_active'] = $data['status'] === 'active' ? true : false;
        unset($data['status']);

        $user->update($data);

        return back()->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->id === auth()->user()->id) {
            return back()->with('error', 'You cannot delete your own account');
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully');
    }
}
