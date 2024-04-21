<?php

use App\Models\User;

use function Pest\Laravel\delete;

$loggedInUser = null;

beforeEach(function () use (&$loggedInUser) {
    $loggedInUser = loginAsUser();
});

it('should delete user', function () {
    $user = User::factory()->create();

    delete(route('users.destroy', $user->id))
        ->assertRedirect(route('users.index'))
        ->assertSessionHas('success', 'User deleted successfully');
});

test('user cannot delete himself', function () use(&$loggedInUser) {
    delete(route('users.destroy', $loggedInUser?->id))
        ->assertSessionHas('error', 'You cannot delete your own account');
});
