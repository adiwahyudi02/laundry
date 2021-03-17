<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pakets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')
                    ->constrained()
                    ->onDelete('cascade');
            $table->enum('jenis', [
                'Bed Cover',
                'Boneka',
                'Jas',
                'Kiloan',
                'Sepatu',
                'Tas',
                'Topi'
            ]);
            $table->string('nama_paket', 100);
            $table->integer('lama_pengerjaan');
            $table->integer('harga');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pakets');
    }
}
