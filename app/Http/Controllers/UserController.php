<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = User::with('outlet')->get();

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
                    'status' => true
                ]);
            }
            else{
                return response()->json([
                    'status' => false
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = User::where('outlet_id', $id)
                // ->where(function($query){
                //     $query->where('role', 'admin');
                //     $query->orWhere('role', 'kasir');
                // })
                ->get();

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $cek = User::where('username', $request->username)->get()->count();

        if($cek > 0){

            return response()->json([
                'status'=> false,
                'error' => 'Username Telah Terdaftar'
            ]);
        }
        else {
            $update = User::find($id)->update([
                'nama' => $request->nama,
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'outlet_id' => $request->outlet_id,
                'role' => $request->role
            ]);

            if($update){
                return response()->json([
                    'status' => true
                ]);
            }
            else{
                return response()->json([
                    'status' => false
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = User::find($id)->delete();

        if($delete){
            return response()->json([
                'status' => true
            ]);
        }
        else{
            return response()->json([
                'status' => false
            ]);
        }
    }

    public function multiDestroy(Request $request)
    {

        foreach ($request->selected as $key => $value) {
            $delete = User::find($value['id'])->delete();
        }
        
        if($delete){
            return response()->json([
                'status' => true
            ]);
        }
        else{
            return response()->json([
                'status' => false
            ]);
        }
    }

    public function getTrashed(){

        $trashed = User::onlyTrashed()->with('outlet')->get();
    
        return response()->json([
            'status' => true,
            'trashed' => $trashed
        ]);
    
    }

    public function restore($id){

        $restore = User::onlyTrashed()->find($id)->restore();

        if($restore){
            
            return response()->json([
                'status' => true
            ]);
        }
        else{
            return response()->json([
                'status' => false
            ]);
        }

    }

    public function multiRestore(Request $request)
    {

        foreach ($request->selected as $key => $value) {
            $restore = User::onlyTrashed()->find($value['id'])->restore();
        }
        
        if($restore){
            return response()->json([
                'status' => true
            ]);
        }
        else{
            return response()->json([
                'status' => false
            ]);
        }
    }

    public function forceDelete($id){

        $delete = User::onlyTrashed()->find($id)->forceDelete();

        if($delete){
            
            return response()->json([
                'status' => true
            ]);
        }
        else{
            return response()->json([
                'status' => false
            ]);
        }

    }

    public function multiForceDelete(Request $request)
    {

        foreach ($request->selected as $key => $value) {
            $restore = User::onlyTrashed()->find($value['id'])->forceDelete();
        }
        
        if($restore){
            return response()->json([
                'status' => true
            ]);
        }
        else{
            return response()->json([
                'status' => false
            ]);
        }
    }

    public function multiInfo(Request $request)
    {

        $data = [];

        foreach ($request->selected as $key => $value) {
            $d = User::withTrashed()->where('id', $value['id'])->with('outlet')->first();
                array_push($data, [
                    'data' => $d,
                ]);
        }

        return response()->json([
            'status' => true,
            'info' => $data
        ]);
        
    }
}
