<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Paket;

class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [ 'outlet_id' => 1,'jenis' => 'Bed Cover','nama_paket' => 'Single', 'lama_pengerjaan' => 3, 'harga' => 15000],
            ['outlet_id' => 1,'jenis' => 'Bed Cover','nama_paket' => 'Queen', 'lama_pengerjaan' => 3, 'harga' => 18000],
            [ 'outlet_id' => 1,'jenis' => 'Bed Cover','nama_paket' => 'King', 'lama_pengerjaan' => 3, 'harga' => 25000],
            
            ['outlet_id' => 1,'jenis' => 'Boneka','nama_paket' => 'Kecil', 'lama_pengerjaan' => 5, 'harga' => 20000],
            [ 'outlet_id' => 1,'jenis' => 'Boneka','nama_paket' => 'Besar', 'lama_pengerjaan' => 5, 'harga' => 25000],
            
            ['outlet_id' => 1,'jenis' => 'Jas','nama_paket' => 'Jas Lipat', 'lama_pengerjaan' => 3, 'harga' => 18000],
            [ 'outlet_id' => 1,'jenis' => 'Jas','nama_paket' => 'Jas Gantung', 'lama_pengerjaan' => 3, 'harga' => 15000],

            [ 'outlet_id' => 1,'jenis' => 'Kiloan','nama_paket' => 'Reguler', 'lama_pengerjaan' => 1, 'harga' => 15000],
            ['outlet_id' => 1,'jenis' => 'Kiloan','nama_paket' => 'Kilat', 'lama_pengerjaan' => 2, 'harga' => 18000],
            [ 'outlet_id' => 1,'jenis' => 'Kiloan','nama_paket' => 'Express', 'lama_pengerjaan' => 3, 'harga' => 25000],

            ['outlet_id' => 1,'jenis' => 'Sepatu','nama_paket' => 'Fast Clean', 'lama_pengerjaan' => 2, 'harga' => 25000],
            [ 'outlet_id' => 1,'jenis' => 'Sepatu','nama_paket' => 'Deep Clean', 'lama_pengerjaan' => 3, 'harga' => 35000],

            ['outlet_id' => 1,'jenis' => 'Tas','nama_paket' => 'Kecil', 'lama_pengerjaan' => 5, 'harga' => 15000],
            [ 'outlet_id' => 1,'jenis' => 'Tas','nama_paket' => 'Besar', 'lama_pengerjaan' => 5, 'harga' => 20000],

            ['outlet_id' => 1,'jenis' => 'Topi','nama_paket' => 'Fast Clean', 'lama_pengerjaan' => 2, 'harga' => 10000],
            [ 'outlet_id' => 1,'jenis' => 'Topi','nama_paket' => 'Deep Clean', 'lama_pengerjaan' => 3, 'harga' => 15000],

            

            [ 'outlet_id' => 2,'jenis' => 'Bed Cover','nama_paket' => 'Single', 'lama_pengerjaan' => 3, 'harga' => 15000],
            ['outlet_id' => 2,'jenis' => 'Bed Cover','nama_paket' => 'Queen', 'lama_pengerjaan' => 3, 'harga' => 18000],
            [ 'outlet_id' => 2,'jenis' => 'Bed Cover','nama_paket' => 'King', 'lama_pengerjaan' => 3, 'harga' => 25000],
            
            ['outlet_id' => 2,'jenis' => 'Boneka','nama_paket' => 'Kecil', 'lama_pengerjaan' => 5, 'harga' => 20000],
            [ 'outlet_id' => 2,'jenis' => 'Boneka','nama_paket' => 'Besar', 'lama_pengerjaan' => 5, 'harga' => 25000],
            
            ['outlet_id' => 2,'jenis' => 'Jas','nama_paket' => 'Jas Lipat', 'lama_pengerjaan' => 3, 'harga' => 18000],
            [ 'outlet_id' => 2,'jenis' => 'Jas','nama_paket' => 'Jas Gantung', 'lama_pengerjaan' => 3, 'harga' => 15000],

            [ 'outlet_id' => 2,'jenis' => 'Kiloan','nama_paket' => 'Reguler', 'lama_pengerjaan' => 1, 'harga' => 15000],
            ['outlet_id' => 2,'jenis' => 'Kiloan','nama_paket' => 'Kilat', 'lama_pengerjaan' => 2, 'harga' => 18000],
            [ 'outlet_id' => 2,'jenis' => 'Kiloan','nama_paket' => 'Express', 'lama_pengerjaan' => 3, 'harga' => 25000],

            ['outlet_id' => 2,'jenis' => 'Sepatu','nama_paket' => 'Fast Clean', 'lama_pengerjaan' => 2, 'harga' => 25000],
            [ 'outlet_id' => 2,'jenis' => 'Sepatu','nama_paket' => 'Deep Clean', 'lama_pengerjaan' => 3, 'harga' => 35000],

            ['outlet_id' => 2,'jenis' => 'Tas','nama_paket' => 'Kecil', 'lama_pengerjaan' => 5, 'harga' => 15000],
            [ 'outlet_id' => 2,'jenis' => 'Tas','nama_paket' => 'Besar', 'lama_pengerjaan' => 5, 'harga' => 20000],

            ['outlet_id' => 2,'jenis' => 'Topi','nama_paket' => 'Fast Clean', 'lama_pengerjaan' => 2, 'harga' => 10000],
            [ 'outlet_id' => 2,'jenis' => 'Topi','nama_paket' => 'Deep Clean', 'lama_pengerjaan' => 3, 'harga' => 15000],


        ];

        foreach ($data as $d) {
            $create = Paket::create($d);
        }
    }
}
