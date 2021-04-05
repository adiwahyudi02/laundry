<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Outlet;

class OutletSeeder extends Seeder
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
               'nama' => 'Bersih selalu',
               'alamat' => 'Jalan Panday Kampung Babakan Nanjung',
               'lng_lat' => '107.53515,-6.88642',
               'tlp' => '0987654321',
               'user_id' => 1

            ],
            [
                'nama' => 'Harum selalu',
                'alamat' => 'Jalan kalidam',
                'lng_lat' => '107.55122,-6.87830',
                'tlp' => '098712345',
                'user_id' => 2
            ]
        ];

        foreach ($data as $d) {
            $create = Outlet::create($d);
        }
    }
}
