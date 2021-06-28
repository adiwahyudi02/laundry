<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'PassportAuthController@register');
Route::post('login', 'PassportAuthController@login');

Route::group(['middleware' => 'auth:api'], function(){

    //logedIn detail user
    Route::get('details', 'PassportAuthController@details');

    //outlet
    Route::resource('outlet', 'OutletController');
    Route::get('trashed-outlet', 'OutletController@getTrashed');
    Route::get('restore-outlet/{id}', 'OutletController@restore');
    Route::get('force-delete-outlet/{id}', 'OutletController@forceDelete');
    Route::post('multi-softdelete-outlet', 'OutletController@multiDestroy');
    Route::post('multi-info-outlet', 'OutletController@multiInfo');
    Route::post('multi-restore-outlet', 'OutletController@multiRestore');
    Route::post('multi-force-delete-outlet', 'OutletController@multiForceDelete');

    //member
    Route::resource('member', 'MemberController');
    Route::get('trashed-member', 'MemberController@getTrashed');
    Route::get('restore-member/{id}', 'MemberController@restore');
    Route::get('force-delete-member/{id}', 'MemberController@forceDelete');
    Route::post('multi-softdelete-member', 'MemberController@multiDestroy');
    Route::post('multi-info-member', 'MemberController@multiInfo');
    Route::post('multi-restore-member', 'MemberController@multiRestore');
    Route::post('multi-force-delete-member', 'MemberController@multiForceDelete');

    //paket
    Route::resource('paket', 'PaketController');
    Route::get('trashed-paket', 'PaketController@getTrashed');
    Route::get('restore-paket/{id}', 'PaketController@restore');
    Route::get('force-delete-paket/{id}', 'PaketController@forceDelete');
    Route::post('multi-softdelete-paket', 'PaketController@multiDestroy');
    Route::post('multi-info-paket', 'PaketController@multiInfo');
    Route::post('multi-restore-paket', 'PaketController@multiRestore');
    Route::post('multi-force-delete-paket', 'PaketController@multiForceDelete');

    //user
    Route::resource('user', 'UserController');
    Route::get('trashed-user', 'UserController@getTrashed');
    Route::get('restore-user/{id}', 'UserController@restore');
    Route::get('force-delete-user/{id}', 'UserController@forceDelete');
    Route::post('multi-softdelete-user', 'UserController@multiDestroy');
    Route::post('multi-info-user', 'UserController@multiInfo');
    Route::post('multi-restore-user', 'UserController@multiRestore');
    Route::post('multi-force-delete-user', 'UserController@multiForceDelete');

    //transaksi
    Route::resource('transaksi', 'TransaksiController');
    Route::get('trashed-transaksi', 'TransaksiController@getTrashed');
    Route::get('restore-transaksi/{id}', 'TransaksiController@restore');
    Route::get('force-delete-transaksi/{id}', 'TransaksiController@forceDelete');
    Route::post('multi-softdelete-transaksi', 'TransaksiController@multiDestroy');
    Route::post('multi-info-transaksi', 'TransaksiController@multiInfo');
    Route::post('multi-restore-transaksi', 'TransaksiController@multiRestore');
    Route::post('multi-force-delete-transaksi', 'TransaksiController@multiForceDelete');
    Route::post('move-status-transaksi', 'TransaksiController@moveStatus');
    Route::get('update-bayar-transaksi/{id}', 'TransaksiController@updateBayar');
    Route::put('jemput-transaksi/{id}', 'TransaksiController@jemput');
    Route::put('antar-transaksi/{id}', 'TransaksiController@antar');
    Route::put('batal-jemput-transaksi/{id}', 'TransaksiController@batalJemput');
    Route::put('batal-antar-transaksi/{id}', 'TransaksiController@batalAntar');
    Route::put('selesai-jemput-transaksi/{id}', 'TransaksiController@selesaiJemput');
    Route::put('selesai-antar-transaksi/{id}', 'TransaksiController@selesaiAntar');
    Route::put('bayar-transaksi/{id}', 'TransaksiController@bayar');
    Route::get('all-outlet-transaksi', 'TransaksiController@allOutlet');

    //detail-transaksi
    Route::resource('detail-transaksi', 'DetailTransaksiController');
    Route::get('trashed-detail-transaksi', 'DetailTransaksiController@getTrashed');
    Route::get('restore-detail-transaksi/{id}', 'DetailTransaksiController@restore');
    Route::get('force-delete-detail-transaksi/{id}', 'DetailTransaksiController@forceDelete');
    Route::post('multi-softdelete-detail-transaksi', 'DetailTransaksiController@multiDestroy');
    Route::post('multi-info-detail-transaksi', 'DetailTransaksiController@multiInfo');
    Route::post('multi-restore-detail-transaksi', 'DetailTransaksiController@multiRestore');
    Route::post('multi-force-delete-detail-transaksi', 'DetailTransaksiController@multiForceDelete');

    //ongkir
    Route::resource('ongkir', 'OngkirController');
    Route::get('trashed-ongkir', 'OngkirController@getTrashed');
    Route::get('restore-ongkir/{id}', 'OngkirController@restore');
    Route::get('force-delete-ongkir/{id}', 'OngkirController@forceDelete');
    Route::post('multi-softdelete-ongkir', 'OngkirController@multiDestroy');
    Route::post('multi-info-ongkir', 'OngkirController@multiInfo');
    Route::post('multi-restore-ongkir', 'OngkirController@multiRestore');
    Route::post('multi-force-delete-ongkir', 'OngkirController@multiForceDelete');

    //promo
    Route::resource('promo', 'PromoController');
    Route::get('trashed-promo', 'PromoController@getTrashed');
    Route::get('restore-promo/{id}', 'PromoController@restore');
    Route::get('force-delete-promo/{id}', 'PromoController@forceDelete');
    Route::post('multi-softdelete-promo', 'PromoController@multiDestroy');
    Route::post('multi-info-promo', 'PromoController@multiInfo');
    Route::post('multi-restore-promo', 'PromoController@multiRestore');
    Route::post('multi-force-delete-promo', 'PromoController@multiForceDelete');
});
