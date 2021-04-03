<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
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
                'nama' => 'Gardapati Prabaswara',
                'username' => 'owner1', 
                'password' => bcrypt('password'),
                'outlet_id' => 1,
                'role' => 'owner'
            ],
            [
                'nama' => 'Ganendra Hestamma',
                'username' => 'owner2', 
                'password' => bcrypt('password'),
                'outlet_id' => 2,
                'role' => 'owner'
            ],
            [
               'nama' => 'Jayantaka Layana',
               'username' => 'admin1',
               'password' => bcrypt('password'),
               'outlet_id' => 1,
               'role' => 'admin'
            ],
            [
                'nama' => 'Mandaka Nataya',
                'username' => 'admin2',
                'password' => bcrypt('password'),
                'outlet_id' => 2,
                'role' => 'admin'
            ],
            [
                'nama' => 'Paramudya Sahadya',
                'username' => 'kasir1', 
                'password' => bcrypt('password'),
                'outlet_id' => 1,
                'role' => 'kasir'
            ],
            [
                'nama' => 'Trengginas Turida',
                'username' => 'kasir2', 
                'password' => bcrypt('password'),
                'outlet_id' => 2,
                'role' => 'kasir'
            ],
            
        ];

        foreach ($data as $d) {
            $create = User::create($d);
        }
    }
}
