<?php

namespace App\Http\Controllers;

use App\Models\UsersModel;
use Illuminate\Http\Request;
use stdClass;

class UsersController
{
    public function __construct(
        private $model = new UsersModel()
    ) { }

    
    final public function add_edit_user(Request $request)
    {
        $message = 'Błąd dodawania użytkownika';
        $status = 'error';

        $user = $request->all();

        if($user['login'] && !empty($user['login']) ) {
            $login = $user['login'];
            $id = $user['id'] ?? null;

            //User exists in db
            $exists = $this->model->getUserDuplicate($login, $id);
            if(!$exists) {
                $ob = new stdClass;
                $ob->id = $id;
                $ob->login = $login;
                $ob->name = $user['name'];
                $ob->surname = $user['surname'];
                $ob->city = $user['city'];
                $ob->street_number = $user['street'];
                $ob->post_code = $user['post'];
                $ob->country = $user['country'];

                $result = $this->model->addUpdateUser($ob);

                if($result) {
                    $status = 'ok';
                    $message = 'Użytkownik dodany pomyślnie!';

                    if($id) {
                        $message = 'Użytkownik zmodyfikowany pomyślnie!';
                    }
                }
            } else {
                $message = 'Użytkownik o takim loginie już istnieje!';
            }

        }

        $data = [
            'message' => $message,
            'status' => $status
        ];

        return response()->json($data);
    }

    final public function delete_user(Request $request)
    {
        $message = 'Błąd usuwania użytkownika';
        $status = 'error';

        $id = $request->input('id');
        if($id) {
            $user = (object) $this->model->getUser($id);
            $user->deleted = 0;

            $result = $this->model->addUpdateUser($user);

            if($result) {
                $status = 'ok';
                $message = 'Użytkownik usunięty pomyślnie!';
            }
        }

        $data = [
            'message' => $message,
            'status' => $status
        ];

        return response()->json($data);
    }

    final public function list_users()
    {
        
    }
}
