<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{

public function index()
{
    $productos = Producto::with('categoria')->get();
    return response()->json($productos, 200);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:150',
        'precio' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'categoria_id' => 'nullable|exists:categorias,id',
    ]);

    $producto = Producto::create($validated);
    $producto->load('categoria');

    return response()->json($producto, 201);
}


    public function show($id)
    {
        $producto = Producto::findOrFail($id);
        return response()->json($producto, 200);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:150',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria_id' => 'nullable|exists:categorias,id',
        ]);

        $producto = Producto::findOrFail($id);
        $producto->update($validated);
        $producto->load('categoria');

        return response()->json($producto, 200);
    }

    public function destroy($id)
    {
        $producto = Producto::destroy($id);
        return $producto;
    }
}
