<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outlet_id')
                    ->constrained()
                    ->onDelete('cascade');
            $table->integer('min_subtotal')->nullable()->default(0);
            $table->integer('min_qty')->nullable()->default(0);
            $table->integer('diskon')->nullable();
            $table->enum('status', ['aktif', 'tidak aktif']);
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
        Schema::dropIfExists('promos');
    }
}
