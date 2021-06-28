<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

use App\Models\Outlet;
use App\Models\Paket;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Outlet::where('user_id', Auth::user()->id)->get();

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
        $outlet = Outlet::create([
            'nama' =>  $request->nama,
            'alamat' =>  $request->alamat,
            'lng_lat' =>  $request->lng_lat,
            'tlp' => $request->tlp,
            'user_id' => Auth::user()->id
        ])->id;

        $pakets = [
            ['outlet_id' => $outlet,'jenis' => 'Bed Cover','nama_paket' => 'Single', 'lama_pengerjaan' => 3, 'harga' => 15000],
            ['outlet_id' => $outlet,'jenis' => 'Bed Cover','nama_paket' => 'Queen', 'lama_pengerjaan' => 3, 'harga' => 18000],
            [ 'outlet_id' => $outlet,'jenis' => 'Bed Cover','nama_paket' => 'King', 'lama_pengerjaan' => 3, 'harga' => 25000],
            
            ['outlet_id' => $outlet,'jenis' => 'Boneka','nama_paket' => 'Kecil', 'lama_pengerjaan' => 5, 'harga' => 20000],
            [ 'outlet_id' => $outlet,'jenis' => 'Boneka','nama_paket' => 'Besar', 'lama_pengerjaan' => 5, 'harga' => 25000],
            
            ['outlet_id' => $outlet,'jenis' => 'Jas','nama_paket' => 'Jas Lipat', 'lama_pengerjaan' => 3, 'harga' => 18000],
            [ 'outlet_id' => $outlet,'jenis' => 'Jas','nama_paket' => 'Jas Gantung', 'lama_pengerjaan' => 3, 'harga' => 15000],

            [ 'outlet_id' => $outlet,'jenis' => 'Kiloan','nama_paket' => 'Reguler', 'lama_pengerjaan' => 1, 'harga' => 15000],
            ['outlet_id' => $outlet,'jenis' => 'Kiloan','nama_paket' => 'Kilat', 'lama_pengerjaan' => 2, 'harga' => 18000],
            [ 'outlet_id' => $outlet,'jenis' => 'Kiloan','nama_paket' => 'Express', 'lama_pengerjaan' => 3, 'harga' => 25000],

            ['outlet_id' => $outlet,'jenis' => 'Sepatu','nama_paket' => 'Fast Clean', 'lama_pengerjaan' => 2, 'harga' => 25000],
            [ 'outlet_id' => $outlet,'jenis' => 'Sepatu','nama_paket' => 'Deep Clean', 'lama_pengerjaan' => 3, 'harga' => 35000],

            ['outlet_id' => $outlet,'jenis' => 'Tas','nama_paket' => 'Kecil', 'lama_pengerjaan' => 5, 'harga' => 15000],
            [ 'outlet_id' => $outlet,'jenis' => 'Tas','nama_paket' => 'Besar', 'lama_pengerjaan' => 5, 'harga' => 20000],

            ['outlet_id' => $outlet,'jenis' => 'Topi','nama_paket' => 'Fast Clean', 'lama_pengerjaan' => 2, 'harga' => 10000],
            [ 'outlet_id' => $outlet,'jenis' => 'Topi','nama_paket' => 'Deep Clean', 'lama_pengerjaan' => 3, 'harga' => 15000]

        ];

        foreach ($pakets as $value) {
            $paket = Paket::create($value);
        }

        if($outlet){
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Outlet::where('id', $id)->first();

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
        $update = Outlet::find($id)->update([
            'nama' =>  $request->nama,
            'alamat' =>  $request->alamat,
            'lng_lat' =>  $request->lng_lat,
            'tlp' => $request->tlp
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = Outlet::find($id)->delete();

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
            $delete = Outlet::find($value['id'])->delete();
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

        $trashed = Outlet::onlyTrashed()->get();
    
        return response()->json([
            'status' => true,
            'trashed' => $trashed
        ]);
    
    }

    public function restore($id){

        $restore = Outlet::onlyTrashed()->find($id)->restore();

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
            $restore = Outlet::onlyTrashed()->find($value['id'])->restore();
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

        $delete = Outlet::onlyTrashed()->find($id)->forceDelete();

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
            $restore = Outlet::onlyTrashed()->find($value['id'])->forceDelete();
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
            $d = Outlet::withTrashed()->where('id', $value['id'])->first();
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