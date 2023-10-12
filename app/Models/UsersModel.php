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
                ->get()
                ->where('id', '<>', $id)
                ->where('login', $user)
                ->where('deleted', 0)
                ->count();
        } else {
            $count = DB::table($this->table)
                ->get()
                ->where('login', $user)
                ->where('deleted', 0)
                ->count();
        }

        return $count;

    }

    final public function getUser(int $id)
    {
        return DB::table($this->table)
                ->get()
                ->where('id', $id)
                ->where('deleted', 0);
    }

    final public function addUpdateUser(object $ob)
    {
        if(!empty($ob->id)) {
            if($ob->deleted) {
                $ob->delete_at = $this->timeToDateTime(time());
            }

            $ob->update_at = $this->timeToDateTime(time());
        } else {
            $ob->created_at = $this->timeToDateTime(time());
        }

        $result = DB::table($this->table)->insert([
            (array) $ob
        ]);

        return $result;
    }
}
