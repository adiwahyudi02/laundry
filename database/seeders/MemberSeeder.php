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
               'tlp' => '+6285722367921'
            ],
            [
                'nama' => 'Mimi',
                'alamat' => 'Jalan Nanjung Panday',
                'jenis_kelamin' => 'P',
                'tlp' => '+6281546963707'
            ],
            [
                'nama' => 'Mumu',
                'alamat' => 'Jalan bbkn',
                'jenis_kelamin' => 'P',
                'tlp' => '+6289525310735'
            ]
        ];

        foreach ($data as $d) {
            $create = Member::create($d);
        }
    }
}
