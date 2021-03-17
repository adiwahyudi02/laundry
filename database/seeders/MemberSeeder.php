<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Member;

class MemberSeeder extends Seeder
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
               'nama' => 'Momo',
               'alamat' => 'Jalan Babakan Nanjung',
               'jenis_kelamin' => 'L',
               'tlp' => '09876333331'
            ],
            [
                'nama' => 'Mimi',
                'alamat' => 'Jalan Nanjung Panday',
                'jenis_kelamin' => 'P',
                'tlp' => '099999345'
            ]
        ];

        foreach ($data as $d) {
            $create = Member::create($d);
        }
    }
}
