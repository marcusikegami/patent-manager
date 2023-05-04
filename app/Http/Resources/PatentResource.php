<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatentResource extends JsonResource
{
    // Inclusion of the statement below will prevent the data of the JsonResource from being wrapped in a data key. 
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'patent_number' => $this->patent_number,
            'title' =>  $this->title,
            'abstract' => $this->abstract,
            'inventor' => $this->inventor,
            'filing_date' => $this->filing_date,
            'issue_date' => $this->issue_date,
            'expiration_date' => $this->expiration_date,
            'status' => $this->status,
            'jurisdiction' => $this->jurisdiction,
        ];
    }
}
