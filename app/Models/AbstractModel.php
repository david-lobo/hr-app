<?php
 
namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

abstract class AbstractModel
{
    protected $id = null;
    protected $tableName;
    private $data = [];

    public function __construct(int $id = null)
    {
        $this->id = $id;

        if (!is_null($id)) {
            $this->load();
        }
    }

    public static function find(int $id)
    {
        $model = static::class;
        $entity = new $model($id);
        $entity->load();
        return $entity;
    }

    public function load()
    {
        $entity = DB::table($this->tableName)->find($this->id);
        $this->data = (array)$entity;
    }

    public function save()
    {
        $data = $this->data;
        if (!empty($this->data)) {
            if (isset($this->data['id'])) {
                $this->data['updated_at'] = Carbon::now();
                DB::table($this->tableName)
                ->where('id', $this->data['id'])
                ->update(
                    $this->data
                );
            } else {
                $this->data['updated_at'] = Carbon::now();
                $this->data['created_at'] = Carbon::now();
                DB::table($this->tableName)->insert(
                    $this->data
                );
            }
        }
    }

    public function delete()
    {
        if (!empty($this->data)) {
            if (isset($this->data['id'])) {
                DB::table($this->tableName)
                ->where('id', $this->data['id'])->delete();
            }
        }
    }

    public function __set($name, $value)
    {
        $this->data[$name] = $value;
    }
 
    public function __get($name)
    {
        if (isset($this->data[$name])) {
            return $this->data[$name];
        }
    }

    public function toArray(): array
    {
        return $this->data;
    }
}
