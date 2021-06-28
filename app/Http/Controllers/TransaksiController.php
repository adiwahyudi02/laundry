<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use App\Models\Outlet;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Transaksi::with('outlet', 'member', 'user', 'detail_transaksi.paket')->get();

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

        $awal_hari = date("Y-m-d") . 'T00:00:00.000000Z';
        $cek = Transaksi::where('created_at', '>=', $awal_hari)->count();
        $kode_invoice =  'TRX/' . date("Ymd") . '/' . $cek + 1;
        
        $pengerjaan_terlama = max(array_map(function($value) {
            return $value['lama_pengerjaan'];
        },$request->detail_pemesanan));

        $date = date('Y-m-d H:i:s');
        $batas_waktu = date("Y-m-d H:i:s", strtotime( '+' . $pengerjaan_terlama .' days' . ' +7 hours', strtotime($date)));

        $tgl_bayar = ($request->dibayar == 'Lunas') ? date("Y-m-d H:i:s", strtotime('+7 hours', strtotime($date))) : null ;

        $status = '';

        if ($request->jemput) {
            $status = 'Penjemputan';
        }else{
            $status = 'Antrian';
        }


        $create = Transaksi::create([
            'outlet_id' =>  $request->outlet_id,
            'kode_invoice' =>  $kode_invoice,
            'member_id' => $request->member['id'],
            'tgl' =>  date("Y-m-d H:i:s", strtotime('+7 hours', strtotime($date))),
            'batas_waktu' =>  $batas_waktu,
            'tgl_bayar' => $tgl_bayar,
            'dibayar' =>  $request->dibayar,
            'biaya_tambahan' =>  $request->biaya_tambahan,
            'diskon' =>  $request->diskon,
            'pajak' => $request->pajak,
            'status' =>  $status,
            'user_id' => Auth::user()->id,
            'total' => $request->total,
            'subtotal' => $request->subtotal,
            'penjemputan' => $request->jemput,
            'pengantaran' => $request->antar,
            'lng_lat' => $request->lng_lat != null ? $request->lng_lat[0] . ',' . $request->lng_lat[1] : null,
            'jarak' => $request->jarak,
            'ongkir' => $request->ongkir,
            'dijemput' => 0,
            'diantar' => 0,
            'extra' => $request->extra
        ]);
        
        $transaksi_id = $create->id;

        foreach ($request->detail_pemesanan as $value) {
            $create = DetailTransaksi::create([
                'transaksi_id' => $transaksi_id,
                'paket_id' => $value['id'],
                'qty' => $value['val'],
                'keterangan' => ''
            ]);
        }

        if($create){
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
        $data = Transaksi::where('outlet_id', $id)
                        ->with('outlet', 'member', 'user', 'penjemput', 'pengantar', 'detail_transaksi.paket')
                        ->orderBy('batas_waktu')
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
        $update = Transaksi::find($id)->update([
            'outlet_id' =>  $request->outlet_id,
            'kode_invoice' =>  $request->kode_invoice,
            'member_id' => $request->member_id,
            'tgl' =>  $request->tgl,
            'batas_waktu' =>  $request->batas_waktu,
            'tgl_bayar' => $request->tgl_bayar,
            'biaya_tambahan' =>  $request->biaya_tambahan,
            'diskon' =>  $request->diskon,
            'pajak' => $request->pajak,
            'status' =>  $request->status,
            'dibayar' =>  $request->dibayar,
            'user_id' => $request->user_id,
            'total' => $request->total
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
        $delete = Transaksi::find($id)->delete();

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
            $delete = Transaksi::find($value['id'])->delete();
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

        $trashed = Transaksi::onlyTrashed()->with('outlet', 'member', 'user', 'detail_transaksi.paket')->get();
    
        return response()->json([
            'status' => true,
            'trashed' => $trashed
        ]);
    
    }

    public function restore($id){

        $restore = Transaksi::onlyTrashed()->find($id)->restore();

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
            $restore = Transaksi::onlyTrashed()->find($value['id'])->restore();
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

        $delete = Transaksi::onlyTrashed()->find($id)->forceDelete();

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
            $restore = Transaksi::onlyTrashed()->find($value['id'])->forceDelete();
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
            $d = Transaksi::withTrashed()->where('id', $value['id'])->with('outlet', 'member', 'user', 'detail_transaksi.paket')->first();
                array_push($data, [
                    'data' => $d,
                ]);
        }

        return response()->json([
            'status' => true,
            'info' => $data
        ]);
        
    }

    public function moveStatus(Request $request){

        if ($request->result['payload']['status'] != $request->columnStatus) {

            $update = Transaksi::find($request->result['payload']['id'])->update([
                'outlet_id' =>  $request->result['payload']['outlet_id'],
                'kode_invoice' =>  $request->result['payload']['kode_invoice'],
                'member_id' => $request->result['payload']['member_id'],
                'tgl' =>  $request->result['payload']['tgl'],
                'batas_waktu' =>  $request->result['payload']['batas_waktu'],
                'tgl_bayar' => $request->result['payload']['tgl_bayar'],
                'biaya_tambahan' =>  $request->result['payload']['biaya_tambahan'],
                'diskon' =>  $request->result['payload']['diskon'],
                'pajak' => $request->result['payload']['pajak'],
                'status' =>  $request->columnStatus,
                'dibayar' =>  $request->result['payload']['dibayar'],
                'user_id' => $request->result['payload']['user_id'],
                'total' => $request->result['payload']['total']
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

    public function updateBayar($id)
    { 
        $date = date('Y-m-d H:i:s');
        $update = Transaksi::find($id)->update([
            'tgl_bayar' => date("Y-m-d H:i:s", strtotime('+7 hours', strtotime($date))),
            'dibayar' =>  'Lunas'
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

    public function jemput(Request $request, $id)
    {
        $update = Transaksi::find($id)->update([
            'dijemput' =>  Auth::user()->id
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

    public function antar(Request $request, $id)
    {
        $update = Transaksi::find($id)->update([
            'diantar' =>  Auth::user()->id
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

    public function BatalJemput(Request $request, $id)
    {
        $update = Transaksi::find($id)->update([
            'dijemput' =>  0
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

    public function BatalAntar(Request $request, $id)
    {
        $update = Transaksi::find($id)->update([
            'diantar' =>  0
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

    public function selesaiJemput(Request $request, $id)
    {
        $update = Transaksi::find($id)->update([
            'status' =>  'antrian'
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
    public function selesaiAntar(Request $request, $id)
    {
        $update = Transaksi::find($id)->update([
            'status' =>  'selesai'
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
    public function bayar(Request $request, $id)
    {
        $date = date('Y-m-d H:i:s');
        $update = Transaksi::find($id)->update([
            'dibayar' =>  'Lunas',
            'tgl_bayar' =>  date("Y-m-d H:i:s", strtotime('+7 hours', strtotime($date)))
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
    public function allOutlet()
    {
        $outlet = Outlet::where('user_id', Auth::user()->id)->get();

        $transaksi = [];

        foreach ($outlet as $value) {
            $data = Transaksi::where('outlet_id', $value->id)
                        ->with('outlet', 'member', 'user', 'penjemput', 'pengantar', 'detail_transaksi.paket')
                        ->orderBy('batas_waktu')
                        ->get();
            $transaksi = [...$transaksi, ...$data];
        }

        return response()->json([
            'data' => $transaksi
        ]);
    }
}
