<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ProductoController::class)->group(function(){
    Route::get('/productos', 'index');
    Route::post('/producto',  'store');
    Route::get('/producto/{id}', 'show');
    Route::put('producto/{id}','update');
    Route::delete('producto/{id}','destroy');
});

//Ruta para ver las categorias
Route::get('categoria', [CategoriaController::class , 'index'] );
