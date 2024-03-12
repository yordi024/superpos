<?php


use App\Models\User;
use App\Models\Business;
use Filament\Actions\DeleteAction;
use App\Filament\Admin\Resources\BusinessResource;
use Livewire\Livewire;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertSoftDeleted;
use function Pest\Laravel\get;

it('can render business list page', function () {
    // Act & Assert
    loginAsUser(User::factory()->admin()->create());

    get(BusinessResource::getUrl('index'))->assertSuccessful();
});


it('can render business create page', function () {
     // Act & Assert
    loginAsUser(User::factory()->admin()->create());

    get(BusinessResource::getUrl('create'))->assertSuccessful();
});

it('can render business view page', function () {
    // Act & Assert
    loginAsUser(User::factory()->admin()->create());

    get(BusinessResource::getUrl('view', [
        'record' => Business::factory()->create(),
    ]))->assertSuccessful();
});

it('can render business edit page', function () {
    // Act & Assert
    loginAsUser(User::factory()->admin()->create());

    get(BusinessResource::getUrl('edit', [
        'record' => Business::factory()->create(),
    ]))->assertSuccessful();
});

it('can create business record', function () {
    // Arrange
    $businessData = Business::factory()->make([
        'user_id' => null,
    ]);
    $owner = User::factory()->make();

    // Act & Assert
    loginAsUser(User::factory()->admin()->create());

    Livewire::test(BusinessResource\Pages\CreateBusiness::class)
        ->fillForm([
            'name' => $businessData->name,
            'email' => $businessData->email,
            'phone' => $businessData->phone,
            'currency' => $businessData->currency,
            'timezone' => $businessData->timezone,
            'is_active' => $businessData->is_active,
            'started_at' => $businessData->started_at,
            'owner' => [
                'name' => $owner->name,
                'email' => $owner->email,
                'username' => $owner->username,
                'password' => 'password',
                'passwordConfirmation' => 'password',
            ]
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    assertDatabaseHas('businesses', [
        'name' => $businessData->name,
        'email' => $businessData->email,
        'phone' => $businessData->phone,
        'currency' => $businessData->currency,
        'timezone' => $businessData->timezone,
        'is_active' => $businessData->is_active,
        'started_at' => $businessData->started_at,
    ]);

    assertDatabaseHas('users', [
        'name' => $owner->name,
        'email' => $owner->email,
        'username' => $owner->username,
    ]);

    assertDatabaseHas('business_locations', [
        'name' => 'Default',
        'is_default' => true,
    ]);
});

it('can update business record', function () {
    // Arrange
    $business = Business::factory()->create();
    $newData = Business::factory()->make();

    // Act & Assert
    loginAsUser(User::factory()->admin()->create());
    Livewire::test(BusinessResource\Pages\EditBusiness::class, [
        'record' => $business->getRouteKey(),
    ])->fillForm([
        'name' => $newData->name,
        'email' => $newData->email,
        'phone' => $newData->phone,
        'currency' => $newData->currency,
        'timezone' => $newData->timezone,
        'is_active' => $newData->is_active,
    ])
    ->call('save')
    ->assertHasNoFormErrors();

    expect($business->refresh())
        ->name->toBe($newData->name)
        ->email->toBe($newData->email)
        ->phone->toBe($newData->phone)
        ->currency->toBe($newData->currency)
        ->timezone->toBe($newData->timezone)
        ->is_active->toBe($newData->is_active);
});

it('can delete business record', function () {
    $business = Business::factory()->create();

    Livewire::test(BusinessResource\Pages\EditBusiness::class, [
        'record' => $business->getRouteKey(),
    ])->callAction(DeleteAction::class);

    assertSoftDeleted($business);
});
