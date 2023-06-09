<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:55'],
            'email' => ['required', 'email', 'unique:users,email,' . $this->id],
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                // ->symbols()
                // ->numbers()
            ],
            'verified' => ['required', 'boolean'],
            'is_admin' => ['required', 'boolean'],
            'notifications' => ['required', 'array'],
            'notifications.year' => ['boolean'],
            'notifications.sixmonth' => ['boolean'],
            'notifications.month' => ['boolean'],
            'notifications.week' => ['boolean'],
            'notifications.day' => ['boolean'],
            'notifications.expired' => ['boolean'],
            'created_at' => ['required', 'date'],
        ];
    }
}
