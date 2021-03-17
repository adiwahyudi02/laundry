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
               'tlp' => '0987654321'
            ],
            [
                'nama' => 'Harum selalu',
                'alamat' => 'Jalan kalidam',
                'tlp' => '098712345'
            ]
        ];

        foreach ($data as $d) {
            $create = Outlet::create($d);
        }
    }
}
