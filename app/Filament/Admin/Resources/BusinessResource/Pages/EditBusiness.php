<?php

namespace App\Filament\Admin\Resources\BusinessResource\Pages;

use App\Filament\Admin\Resources\BusinessResource;
use App\Models\Business;
use Filament\Actions;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class EditBusiness extends EditRecord
{
    protected static string $resource = BusinessResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }

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
            ]);
    }
}
