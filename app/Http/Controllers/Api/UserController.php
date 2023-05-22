<?php

namespace App\Http\Controllers\Api;

use Illuminate\support\Str;
use Illuminate\Http\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::query()->orderBy('id', 'desc')->paginate(10);
            return UserResource::collection($users);
        } catch (QueryException $e) {
            Log::error('Error fetching users: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while fetching users.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreUserRequest $request)
    {
        $temporaryPassword = Str::random(10); // Generate a random password
        $hashedPassword = Hash::make($temporaryPassword);
        // $request->merge(['password' => $hashedPassword]); // Add the password to the request

        try {
            $data = $request->validated();
            $data['password'] = $hashedPassword;
            $user = User::create($data);

            // Send a welcome email to the user
            Mail::to($user->email)->send(new WelcomeEmail($user, $temporaryPassword));

            return new Response(new UserResource($user), 201);
        } catch (\Exception $e) {
            // Log the error
            logger()->error($e->getMessage());

            // Return an error response
            return response()->json([
                'error' => ['Failed to create user.', $e->getMessage()]
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $data = $request->validated();
            if (isset($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            }
            $user->update($data);

            return new Response(new UserResource($user), 201);
        } catch (\Exception $e) {
            // Log the error
            logger()->error('Error updating user: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'Failed to update user.'
            ], 500);
        }
    }

    public function updateAdminStatus(UpdateUserRequest $request, User $user)
    {
        try {
            $data = $request->validated();
            $user->is_admin = $data['is_admin'];
            $user->save();

            return new Response(new UserResource($user), 201);
        } catch (\Exception $e) {
            // Log the error
            logger()->error('Error updating user: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'Failed to update user.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response(null, 204);
    }
}
