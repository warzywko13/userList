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
        $status = 400;

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
                $ob->street = $user['street'];
                $ob->street_number = $user['streetNumber'];
                $ob->post_code = $user['postCode'];
                $ob->country = $user['country'];

                $result = $this->model->addUpdateUser($ob);

                if($result) {
                    $status = 200;
                }
            }
        }

        return response()->json([], $status);
    }

    final public function get_user(Request $request)
    {
        $status = 200;
        $data = [];

        $id = $request->input('id');
        if($id) {
            $data = $this->model->getUser($id);
        }

        return response()->json($data, $status);        
    }

    final public function delete_user(Request $request)
    {
        $status = 400;

        $id = $request->input('id');
        if($id) {
            $user = (object) $this->model->getUser($id);
            $user->deleted = 1;

            $result = $this->model->addUpdateUser($user);

            if($result) {
                $status = 200;
            }
        }

        return response()->json([], $status);
    }

    final public function list_users(Request $request)
    {
        $status = 200;

        $pagination = $request->input('pagination', false);
        $result = $this->model->getAllUsers($pagination);

        return response()->json($result, $status);
    }
}
