<?php

namespace App\Filament\Admin\Resources\BusinessResource\Pages;

use Filament\Forms;
use App\Models\User;
use Filament\Actions;
use App\Models\Business;
use Filament\Forms\Form;
use App\Jobs\ConfigNewBusinessJob;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Admin\Resources\BusinessResource;

class CreateBusiness extends CreateRecord
{
    protected static string $resource = BusinessResource::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->description(trans('General bussiness information'))
                    ->heading(trans('Business'))
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label(trans('Name'))
                            ->required()
                            ->maxLength(255)
                            ->placeholder(trans('Business name')),
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->maxLength(255)
                                    ->unique(Business::class, 'email', ignoreRecord: true)
                                    ->placeholder('Business email'),
                                Forms\Components\TextInput::make('phone')
                                    ->label(trans('Phone'))
                                    ->tel()
                                    ->maxLength(255),
                                Forms\Components\DateTimePicker::make('started_at')
                                    ->label('Start Date')
                                    ->required(),
                                Forms\Components\Select::make('currency')
                                    ->label(trans('Currency'))
                                    ->options([
                                        'USD' => 'USD',
                                        'DOP' => 'DOP',
                                    ])->required(),
                                Forms\Components\Select::make('timezone')
                                    ->label(trans('Timezone'))
                                    ->options([
                                        'UTC' => 'UTC',
                                    ])->required(),
                            ]),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Make it active')
                            ->required(),
                    ]),
                Forms\Components\Section::make()
                    ->description(trans('Bussiness main user information'))
                    ->heading(trans('Owner'))
                    ->relationship('owner')
                    ->collapsible(true)
                    ->schema([
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label(trans('Name'))
                                    ->required()
                                    ->maxLength(50),
                                Forms\Components\TextInput::make('username')
                                    ->label(trans('Username'))
                                    ->required()
                                    ->unique(User::class, 'username', ignoreRecord: true)
                                    ->maxLength(50),
                                Forms\Components\TextInput::make('email')
                                    ->label(trans('Email'))
                                    ->required()
                                    ->email()
                                    ->autocomplete(false)
                                    ->unique(User::class, 'email', ignoreRecord: true)
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('password')
                                    ->label(trans('Password'))
                                    ->password()
                                    ->required()
                                    ->autocomplete(false)
                                    ->rule(Password::default())
                                    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                                    ->same('passwordConfirmation'),
                                Forms\Components\TextInput::make('passwordConfirmation')
                                    ->label(trans('Password Confirmation'))
                                    ->password()
                                    ->required()
                                    ->dehydrated(false),
                            ]),
                    ]),
            ]);
    }

    protected function afterCreate(): void
    {
        $business = static::getRecord();

        ConfigNewBusinessJob::dispatch($business);
    }
}
