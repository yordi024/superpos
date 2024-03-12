<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\SubscriptionPlanResource\Pages;
use App\Filament\Admin\Resources\SubscriptionPlanResource\RelationManagers;
use App\Models\Subscription\SubscriptionPlan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SubscriptionPlanResource extends Resource
{
    protected static ?string $model = SubscriptionPlan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Fieldset::make()->schema([
                    Forms\Components\TextInput::make('name')
                        ->label(trans('Name'))
                        ->required()
                        ->maxLength(255),
                    Forms\Components\Textarea::make('description')
                        ->label(trans('Description'))
                        ->required()
                        ->maxLength(255),
                ])->columns(1),
                Forms\Components\Fieldset::make('Details')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->label(trans('Price'))
                            ->required()
                            ->numeric()
                            ->prefix('$'),
                        Forms\Components\Select::make('currency')
                            ->label(trans('Currency'))
                            ->options([
                                'USD' => 'USD',
                                'DOP' => 'DOP',
                            ])->required(),
                        Forms\Components\TextInput::make('trial_days')
                            ->label(trans('Trial Days'))
                            ->required()
                            ->numeric()
                            ->default(0),
                        Forms\Components\Select::make('interval')
                            ->label(trans('Interval'))
                            ->options([
                                'month' => 'Month',
                                'year' => 'Year',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('interval_count')
                            ->label(trans('Interval Count'))
                            ->required()
                            ->numeric(),
                        Forms\Components\TextInput::make('order')
                            ->required()
                            ->numeric(),
                ])->columns(3),
                Forms\Components\Fieldset::make('Limits')
                    ->schema([
                        Forms\Components\TextInput::make('users_limit')
                            ->label(trans('Users Limit'))
                            ->required()
                            ->numeric(),
                        Forms\Components\TextInput::make('products_limit')
                            ->label(trans('Products Limit'))
                            ->required()
                            ->numeric(),
                        Forms\Components\TextInput::make('invoices_limit')
                            ->label(trans('Invoices Limit'))
                            ->required()
                            ->numeric(),
                        Forms\Components\TextInput::make('locations_limit')
                            ->label(trans('Locations Limit'))
                            ->required()
                            ->numeric(),
                ])->columns(4),
                // Forms\Components\TextInput::make('features')
                //     ->required(),
                Forms\Components\Toggle::make('is_active')
                    ->required(),
                Forms\Components\Toggle::make('is_visible')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->sortable(),
                Tables\Columns\TextColumn::make('currency')
                    ->searchable(),
                Tables\Columns\TextColumn::make('interval')
                    ->searchable(),
                Tables\Columns\TextColumn::make('interval_count')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('trial_days')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_visible')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('users_limit')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('products_limit')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('invoices_limit')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('locations_limit')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageSubscriptionPlans::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
