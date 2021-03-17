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
                'nama' => 'Owner1',
                'username' => 'owner1', 
                'password' => bcrypt('password'),
                'outlet_id' => 1,
                'role' => 'owner'
            ],
            [
                'nama' => 'Owner2',
                'username' => 'owner2', 
                'password' => bcrypt('password'),
                'outlet_id' => 2,
                'role' => 'owner'
            ],
            [
               'nama' => 'Admin1',
               'username' => 'admin1',
               'password' => bcrypt('password'),
               'outlet_id' => 1,
               'role' => 'admin'
            ],
            [
                'nama' => 'Admin2',
                'username' => 'admin2',
                'password' => bcrypt('password'),
                'outlet_id' => 2,
                'role' => 'admin'
            ],
            [
                'nama' => 'Kasir1',
                'username' => 'kasir1', 
                'password' => bcrypt('password'),
                'outlet_id' => 1,
                'role' => 'kasir'
            ],
            [
                'nama' => 'Kasir2',
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
