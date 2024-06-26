<?php

use Livewire\Livewire;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;

use Filament\Actions;
use App\Filament\Admin\Resources\SubscriptionPlanResource;
use App\Filament\Admin\Resources\SubscriptionPlanResource\Pages\ManageSubscriptionPlans;
use App\Models\Subscription\SubscriptionPlan;

it('can render subscription plans list page', function() {
    // Act & Assert
    loginAsAdmin();

    get(SubscriptionPlanResource::getUrl('index'))->assertSuccessful();
});

// test('can create subscription plans record', function () {
//     // Arrange
//     $tag = SubscriptionPlan::factory()->create();

//     //Act & Assert
//     Livewire::test(SubscriptionPlanResource::class)
//         ->callTableAction('create', [
//             'name' => 'tag bis',
//         ])->assertHasNoFormErrors();

//     // $this->assertDatabaseHas(Tag::class, [
//     //     'name' => 'tag bis',
//     // ]);
// });
