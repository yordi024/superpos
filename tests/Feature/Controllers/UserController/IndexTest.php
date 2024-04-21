<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\get;

beforeEach(function () {
    loginAsUser();
});

it('should return the correct component', function () {
    get(route('users.index'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->component('Users/Index')
        );
});

it('should return the correct data', function () {
    User::factory()->count(10)->create();
    $latestUser = User::latest('id')->first();

    get(route('users.index'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->has('users.data', 11)
            ->has('users.data.0', fn (AssertableInertia $inertia) => $inertia
                ->where('id', $latestUser->id)
                ->where('name', $latestUser->name)
                ->where('username', $latestUser->username)
                ->where('email', $latestUser->email)
                ->where('is_active', $latestUser->is_active)
                ->etc()
            )
        );
});

it('should return the correct data based on filters', function () {
    User::factory()->count(10)->create();
    $randomUser = User::inRandomOrder()->first();

    get(route('users.index', [
        'search' => $randomUser->name,
    ]))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->has('users.data', 1)
            ->has('users.data.0', fn (AssertableInertia $inertia) => $inertia
                ->where('id', $randomUser->id)
                ->where('name', $randomUser->name)
                ->where('username', $randomUser->username)
                ->where('email', $randomUser->email)
                ->where('is_active', $randomUser->is_active)
                ->etc()
            )
        );
});

it('should return the correct filters', function () {
    get(route('users.index', [
        'search' => 'test',
        'column' => 'name',
        'sort' => 'asc',
        'perPage' => '10',
    ]))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->has('filters', fn (AssertableInertia $inertia) => $inertia
                ->where('search', 'test')
                ->where('column', 'name')
                ->where('sort', 'asc')
                ->where('perPage', '10')
                ->etc()
            )
        );
});

it('should return the correct pagination', function () {
    User::factory()->count(14)->create();

    get(route('users.index'))
        ->assertInertia(fn (AssertableInertia $inertia) => $inertia
            ->has('users.links', fn (AssertableInertia $inertia) => $inertia
                ->etc()
            )->has('users.meta', fn (AssertableInertia $inertia) => $inertia
            ->where('current_page', 1)
            ->where('from', 1)
            ->where('last_page', 1)
            ->where('total', 15)
            ->etc())
        );
});
