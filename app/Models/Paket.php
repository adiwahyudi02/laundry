<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paket extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'outlet_id',
        'jenis',
        'nama_paket',
        'harga',
        'lama_pengerjaan'
    ];
    
    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }
}