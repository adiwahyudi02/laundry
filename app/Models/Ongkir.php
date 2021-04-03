<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ongkir extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'outlet_id',
        'dari',
        'ke',
        'harga'
    ];
    
    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }
}
