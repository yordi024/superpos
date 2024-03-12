<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'country' => fake()->country,
            'state' => fake()->state,
            'city' => fake()->city,
            'street' => fake()->streetAddress,
            'landmark' => fake()->address,
            'zipcode' => fake()->postcode,
        ];
    }
}
