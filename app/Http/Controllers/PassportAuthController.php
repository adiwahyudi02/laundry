<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

use App\Models\User;

class PassportAuthController extends Controller
{
    public function register(Request $request)
    {
        $cek = User::where('username', $request->username)->get()->count();

        if($cek > 0){

            $terdaftar = User::where('username', $request->username)->first();

            return response()->json([
                'status'=> false,
                'error' => 'Username Telah Terdaftar'
            ]); 
        }
        else{
            $register = User::create([
                'nama' => $request->nama,
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'outlet_id' => $request->outlet_id,
                'role' => $request->role
            ]);

            $token =  $register->createToken('nApp')->accessToken;

            if($register){
                return response()->json([
                    'status' => true,
                    'token' => $token
                ]);
            }
        }
    }

    public function login(Request $request)
    {
        if(Auth::attempt(['username'=> request('username'),'password'=> request('password')])){

            $user = Auth::user();
            $success = $user -> createToken ('nApp')->accessToken;

            return response() -> json([
                'status' => true,
                'data'=> $user,
                'token'=> $success
            ]);

        }
        else{
            return response()->json([
                'status'=>false,
                'message' => 'Username atau password salah',
                'token' => 'kosong'
            ]); 
        }
    }  

    public function details() 
    { 
        $user = Auth::user(); 
        return response()->json(['success' => $user], $this->successStatus); 
    } 
}
