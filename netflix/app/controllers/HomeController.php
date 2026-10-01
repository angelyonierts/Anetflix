<?php
declare(strict_types=1);

final class HomeController
{
    public function __construct(private Catalog $catalog)
    {
    }

    public function index(string $query = ''): array
    {
        $allItems = $this->catalog->all();
        $items = $query === '' ? $allItems : $this->catalog->search($query);
        $categories = [];
        foreach ($items as $item) {
            $categories[$item['category']][] = $item;
        }

        $featured = [
            'title' => 'Stranger Things',
            'description' => 'Cuando un niño desaparece, un pueblo descubre secretos sobrenaturales.',
            'image' => 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
            'video_url' => 'https://www.youtube.com/embed/soeHuQVpOOg',
        ];

        $banners = [$featured];
        foreach ($allItems as $item) {
            $banners[] = [
                'title' => $item['title'],
                'description' => $item['description'],
                'image' => $item['image'],
                'video_url' => $item['video_url'],
            ];
        }

        return [
            'query' => $query,
            'categories' => $categories,
            'featured' => $featured,
            'banners' => $banners,
        ];
    }
}
