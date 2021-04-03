<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransaksisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')
                    ->constrained()
                    ->onDelete('cascade');
            $table->string('kode_invoice', 100);
            $table->foreignId('member_id')
                    ->constrained()
                    ->onDelete('cascade');
            $table->datetime('tgl');
            $table->datetime('batas_waktu');
            $table->string('lng_lat', 100)->nullable();
            $table->string('penjemputan', 100)->nullable();
            $table->string('pengantaran', 100)->nullable();
            $table->string('jarak', 100)->nullable();
            $table->integer('ongkir')->nullable();
            $table->datetime('tgl_bayar')->nullable();
            $table->integer('biaya_tambahan')->nullable();
            $table->double('diskon')->nullable();
            $table->integer('pajak')->nullable();
            $table->enum('status', ['konfirmasi', 'penjemputan', 'antrian', 'proses', 'siap ambil', 'siap antar', 'selesai']);
            $table->enum('dibayar', ['Lunas', 'Belum Bayar']);
            $table->integer('subtotal');
            $table->integer('total');
            $table->foreignId('user_id')
                    ->constrained()
                    ->onDelete('cascade');
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
        Schema::dropIfExists('transaksis');
    }
}
