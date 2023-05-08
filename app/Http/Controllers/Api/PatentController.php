<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatentRequest;
use App\Http\Requests\UpdatePatentRequest;
use App\Http\Resources\PatentResource;
use App\Models\Patent;
use Illuminate\Http\Request;

class PatentController extends Controller
{
    public function index()
    {
        return PatentResource::collection(
            collect(Patent::orderBy('expiration_date', 'asc')->get())
        )->toJson();
    }
    
    public function showByPatentNumber($patent_number)
    {
        $patent = Patent::where('patent_number', $patent_number)->first();

        if (!$patent) {
            return response()->json(['error' => 'Patent not found'], 404);
        }

        return new PatentResource($patent);
    }

    public function store(StorePatentRequest $request)
    {
        $data = $request->validated();
        $patent = Patent::create($data);
        
        return response(new PatentResource($patent), 201);
    }

    public function show(Patent $patent)
    {
        return new PatentResource($patent);
    }

    public function update(Request $request, $patent_number)
    {
        $patent = Patent::where('patent_number', $patent_number)->first();
        
        $rules = [
            'patent_number' => 'required|unique:patents,patent_number,'.$patent->id,
            'title' => 'required',
            'abstract' => 'required',
            'inventor' => 'required',
            'filing_date' => 'required|date',
            'issue_date' => 'nullable|date',
            'expiration_date' => 'required|date',
            'status' => 'required|in:pending,active,inactive,approved,rejected,abandoned,granted,withdrawn,infringed,litigated,in re-examtion,expired,revoked,expunged,lapsed,in examination',
            'jurisdiction' => 'required',
        ];

        $data = $request->validate($rules);
        $patent->update($data);

        return new PatentResource($patent);
    }

    public function destroy(Patent $patent, $patent_number)
    {
        $patent = Patent::where('patent_number', $patent_number)->first();
        $patent->delete();

        return response(null, 204);
    }
}
