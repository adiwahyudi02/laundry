<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaksi extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'outlet_id',
        'kode_invoice',
        'member_id',
        'tgl',
        'batas_waktu',
        'tgl_bayar',
        'biaya_tambahan',
        'diskon',
        'pajak',
        'status',
        'dibayar',
        'user_id',
        'total',
        'subtotal',
        'lng_lat',
        'penjemputan',
        'pengantaran',
        'jarak',
        'ongkir',
        'dijemput',
        'diantar',
        'extra'
    ];

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function detail_transaksi()
    {
        return $this->hasMany(DetailTransaksi::class);
    }

    public function penjemput()
    {
        return $this->belongsTo(User::class, 'dijemput', 'id');
    }

    public function pengantar()
    {
        return $this->belongsTo(User::class, 'diantar', 'id');
    }
}
