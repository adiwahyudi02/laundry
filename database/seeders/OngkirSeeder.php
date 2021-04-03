<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ongkir;

class OngkirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'dari' => 0,
                'ke' => 2, 
                'harga' => 10000,
                'outlet_id' => 1
            ],
            [
                'dari' => 2,
                'ke' => 3, 
                'harga' => 12000,
                'outlet_id' => 1
            ],
            [
               'dari' => 3,
               'ke' => 5,
               'harga' => 15000,
               'outlet_id' => 1,
            ],
            [
                'dari' => 0,
                'ke' => 2,
                'harga' => 10000,
                'outlet_id' => 2
            ],
            [
                'dari' => 2,
                'ke' => 5, 
                'harga' => 13000,
                'outlet_id' => 2
            ]
        ];

        foreach ($data as $d) {
            $create = Ongkir::create($d);
        }
    }
}
