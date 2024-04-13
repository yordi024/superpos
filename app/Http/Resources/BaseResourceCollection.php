<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class BaseResourceCollection extends ResourceCollection
{
    /**
     * The name of the resource being collected.
     *
     * @var string
     */
    public $collects;

    /**
     * Indicates if the collection keys should be preserved.
     *
     * @var bool
     */
    public $preserveKeys = false;

    /**
     * Create a new anonymous resource collection.
     *
     * @param  mixed  $resource
     * @param  string  $collects
     * @return void
     */
    public function __construct($resource, $collects)
    {
        $this->collects = $collects;

        parent::__construct($resource);
    }

    /**
     * Customize the pagination information for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array $paginated
     * @param  array $default
     * @return array
     */
    public function paginationInformation(Request $request, array $paginated, array $default)
    {
        $query = $request->except('page');

        $first = Arr::first($default['meta']['links']);
        $last = Arr::last($default['meta']['links']);

        $customLinks = [];


        $path = $paginated['path'];
        $current_page = $paginated['current_page'];
        $total_pages = $paginated['last_page'];

        if ($current_page > 3) {
            $customLinks[] = [
                'url' => $this->buildURL($path , 1, $query),
                'label' => 1,
                'active' => false,
            ];
        }

        if ($current_page > 4) {
            $customLinks[] = [
                'url' => null,
                'label' => '...',
                'active' => false,
            ];
        }

        foreach (range(1, $total_pages) as $i) {
            if ($i >= $current_page - 2 && $i <= $current_page + 2) {
                $customLinks[] = [
                    'url' => $this->buildURL($path , $i, $query),
                    'label' => $i,
                    'active' => $i === $current_page,
                ];
            }

        }

        if ($current_page < $total_pages - 3) {
            $customLinks[] = [
                'url' => null,
                'label' => '...',
                'active' => false,
            ];
        }

        if ($current_page < $total_pages - 2) {
            $customLinks[] = [
                'url' => $this->buildURL($path , $total_pages, $query),
                'label' => $total_pages,
                'active' => false,
            ];
        }

        $default['meta']['links'] = [$first, ...$customLinks, $last];

        return $default;
    }

    protected function buildURL(string $path, string $page, array $query = []): string
    {
        $query = ['page' => $page, ...$query];

        return str($path)->append('?')->append(Arr::query($query));
    }
}
