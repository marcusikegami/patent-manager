<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatentRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'patent_number' => 'required|unique:patents',
            'title' => 'required',
            'abstract' => 'required',
            'inventor' => 'required',
            'filing_date' => 'required|date_format:Y-m-d',
            'issue_date' => 'nullable|date_format:Y-m-d',
            'expiration_date' => 'required|date_format:Y-m-d',
            'status' => 'required|in:pending,active,inactive,approved,rejected,abandoned,granted,withdrawn,infringed,litigated,in re-examtion,expired,revoked,expunged,lapsed,in examination',
            'jurisdiction' => 'required',
            'related_patents' => 'nullable|array'
        ];
    }
}
