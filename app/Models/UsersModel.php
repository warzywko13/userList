<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UsersModel extends Model
{
    public function __construct(
        protected $table = 'users'
    ) {}

    private function timeToDateTime(int $time)
    {
        $timestamp = time(); // Get the current timestamp using the time() function
        $datetime = new DateTime();
        $datetime->setTimestamp($timestamp);
        
        return $datetime->format('Y-m-d H:i:s');
    }

    final public function getUserDuplicate(string $user, int $id = null): int
    {
        $count = 0;

        if($id) {
            $count = DB::table($this->table)
                ->where('id', '<>', $id)
                ->where('login', $user)
                ->where('deleted', 0)
                ->count();
        } else {
            $count = DB::table($this->table)
                ->where('login', $user)
                ->where('deleted', 0)
                ->count();
        }

        return $count;

    }

    final public function getUser(int $id)
    {
        return DB::table($this->table)
        ->where('id', $id)
        ->where('deleted', 0)
        ->first();
    }

    final public function addUpdateUser(object $ob)
    {
        if(!empty($ob->id)) {
            if(isset($ob->deleted)) {
                $ob->delete_at = $this->timeToDateTime(time());
            }

            $ob->update_at = $this->timeToDateTime(time());

            return DB::table($this->table)->where('id', '=', $ob->id)->update(
                (array) $ob
            );
        }

        $ob->created_at = $this->timeToDateTime(time());

        return DB::table($this->table)->insert([
            (array) $ob
        ]);
    }

    final public function getAllUsers(bool $paginate = false, string $like = null)
    {
        $rows = 10;
        $data = [];

        if($paginate && $like) {
            $data = DB::table($this->table)
            ->where('deleted', '=', '0')
            ->where('login', 'like', $like . '%')
            ->orWhere('name', 'like', $like . '%')
            ->orWhere('surname', 'like', $like . '%')
            ->paginate($rows);
        } else if($paginate) {
            $data = DB::table($this->table)
            ->where('deleted', '=', '0')
            ->paginate($rows);
        } else if ($like) {
            $data = DB::table($this->table)
            ->where('deleted', '=', '0')
            ->where('login', 'like', $like . '%')
            ->orWhere('name', 'like', $like . '%')
            ->orWhere('surname', 'like', $like . '%');
        } else {
            $data = DB::table($this->table)
            ->where('deleted', '=', '0')
            ->get();
        }

        return $data;
    }
}
