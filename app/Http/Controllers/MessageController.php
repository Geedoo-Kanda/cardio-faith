<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\RendezVous;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;
use App\Mail\Message as SendMail;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function indexView()
    {
        $messages = Message::where('disable', 'false')->orderBy('id', 'DESC')->paginate(50);

        return Inertia::render('message/index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'objet' => 'required|string|max:255',
            'message' => 'required|string|max:9000',
        ]);

        $message = Message::create([
            'objet' => $request->objet,
            'message' => $request->message,
            'user_id' => Auth::user()->id,
        ]);

        $info = [
            "objet" => $request->objet,
            "message" => $request->message,
        ];

        $users = RendezVous::pluck('email');
        foreach ($users as $user) {
            Mail::to($user)->queue(new SendMail($info));
        }

        return response($message, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $req = Message::where('id', $message->id)->update(['disable' => 'true']);

        return response($req, 201);
    }
}
